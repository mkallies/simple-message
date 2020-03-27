import { Machine, assign } from "xstate"
import axios from "axios"

const messageStates = {
  idle: "idle",
  pending: "pending",
  error: "error",
  init: "init",
  done: "done",
  details: "details",
  success: "success"
}

const events = {
  POST: "post",
  REFETCH: "refetch",
  DELETE: "delete",
  MORE_INFO: "more-info",
  CLOSE: "close"
}

// SERVICES

const getMessages = async (ctx: any, evt: any) => {
  return axios.get("http://localhost:4000/api/messages")
}

const postMsg = async (ctx: any, evt: any) => {
  return axios.post("http://localhost:4000/api/messages", {
    ...evt.payload
  })
}

const getDetails = async (ctx: any, evt: any) => {
  const messageId = evt.payload

  return axios.get(`http://localhost:4000/api/messages/${messageId}`)
}

const deleteMessage = async (ctx: any, evt: any) => {
  const messageId = evt.payload
  return axios.delete(`http://localhost:4000/api/messages/${messageId}`)
}

// OPTIONS

const messageOpts = {
  services: {
    getMessages,
    postMsg,
    getDetails,
    deleteMessage
  },
  actions: {
    saveMessage: assign((ctx: any, evt: any) => {
      return {
        messages: [evt.data.data.message, ...ctx.messages]
      }
    }),
    removeMessage: assign((ctx: any, evt: any) => {
      const { messageId } = evt.data.data

      return {
        messages: ctx.messages.filter(
          (msg: any) => msg.id !== Number(messageId)
        )
      }
    }),
    cacheMessages: assign((ctx: any, evt: any) => {
      const { messages = [] } = evt.data.data
      return {
        messages: [...ctx.messages, ...messages]
      }
    }),
    cacheSelectedMessage: assign((ctx: any, evt: any) => {
      const { data } = evt.data
      return {
        selectedMessage: { ...data.message, isPalindrome: data.isPalindrome }
      }
    }),
    removeCacheSelected: assign((ctx: any, evt: any) => {
      return {
        selectedMessage: null
      }
    })
  }
}

const messageMachine = Machine<any>(
  {
    id: "message",
    type: "parallel",
    context: {
      messages: [],
      selectedMessage: null
    },
    states: {
      createMsg: {
        initial: "idle",
        states: {
          idle: {
            on: {
              [events.POST]: "pending"
            }
          },
          pending: {
            invoke: {
              id: "pending",
              src: "postMsg",
              onDone: {
                target: "idle",
                actions: ["saveMessage"]
              },
              onError: {
                target: "error"
              }
            }
          },
          error: {
            on: {
              [events.POST]: "pending"
            }
          }
        }
      },
      messageList: {
        initial: "init",
        states: {
          init: {
            invoke: {
              id: "get-messages",
              src: "getMessages",
              onDone: {
                target: "done",
                actions: ["cacheMessages"]
              },
              onError: {
                target: "error"
              }
            }
          },
          error: {
            on: {
              [events.REFETCH]: "init"
            }
          },
          done: {
            type: "final"
          }
        }
      },
      messageCard: {
        initial: "idle",
        states: {
          idle: {
            on: {
              [events.MORE_INFO]: "fetchDetails"
            }
          },
          fetchDetails: {
            invoke: {
              id: "get-details",
              src: "getDetails",
              onDone: {
                target: "details",
                actions: ["cacheSelectedMessage"]
              },
              onError: {
                target: "error"
              }
            }
          },
          error: {
            on: {
              [events.REFETCH]: "details"
            }
          },
          details: {
            on: {
              [events.CLOSE]: "idle",
              [events.DELETE]: "deleteMessage"
            },
            exit: "removeCacheSelected"
          },
          deleteMessage: {
            invoke: {
              id: "delete-message",
              src: "deleteMessage",
              onDone: {
                target: "idle",
                actions: ["removeMessage"]
              },
              onError: {
                target: "error"
              }
            }
          }
        }
      }
    }
  },
  messageOpts
)

export { messageStates, events }

export default messageMachine
