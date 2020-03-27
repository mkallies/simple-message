import { Machine, assign } from "xstate"
import axios from "axios"

interface AuthContext {
  user?: string | null
  error?: any
}

const authStates = {
  init: "init",
  login: "login",
  loggedIn: "loggedIn",
  loggingOut: "loggingOut"
}

const events = {
  SUBMIT: "submit",
  LOG_OUT: "logout"
}

// SERVICES

const login = async (ctx: any, evt: any) => {
  return axios.post("http://localhost:4000/api/user", { email: evt.payload })
}

// OPTIONS

const authOpts = {
  services: {
    login
  },
  actions: {
    removeUser: assign(() => {
      localStorage.removeItem("simple_message:user")
      return {
        user: undefined
      }
    }),
    removeError: assign({
      error: null
    }),
    saveUser: assign((ctx, evt: any) => {
      localStorage.setItem("simple_message:user", JSON.stringify(evt.data.data))

      return {
        user: evt.payload
      }
    }),
    cacheError: assign((ctx, evt: any) => {
      return {
        error: evt.data.response.status
      }
    })
  },
  guards: {
    isLoggedIn: (ctx: AuthContext) => {
      return Boolean(ctx.user)
    }
  }
}

const authMachine = Machine<any>(
  {
    id: "login",
    initial: "init",
    context: {
      user: null,
      error: null
    },
    states: {
      init: {
        on: {
          "": [
            {
              cond: "isLoggedIn",
              target: "loggedIn"
            },
            {
              target: "login"
            }
          ]
        }
      },
      login: {
        id: "login",
        initial: "idle",
        states: {
          idle: {
            on: {
              [events.SUBMIT]: "fetching"
            }
          },
          fetching: {
            invoke: {
              id: "auth",
              src: "login",
              onDone: {
                target: "#loggedIn",
                actions: ["saveUser"]
              },
              onError: {
                target: "error",
                actions: ["cacheError"]
              }
            }
          },
          error: {
            on: {
              [events.SUBMIT]: "fetching"
            },
            exit: "removeError"
          }
        }
      },
      loggedIn: {
        id: "loggedIn",
        on: {
          [events.LOG_OUT]: "loggingOut"
        }
      },
      loggingOut: {
        on: {
          "": {
            target: "#login",
            actions: ["removeUser"]
          }
        }
      }
    }
  },
  authOpts
)

export { authStates, events }

export default authMachine
