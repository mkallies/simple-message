import React from "react"
import { Stack } from "@chakra-ui/core"
import Navbar from "./features/navbar/navbar"
import Login from "./features/auth/login"
import Message from "./features/message/mesage"
import { useMachine } from "@xstate/react"
import authMachine, { events } from "./features/auth/auth.machine"

export type User = {
  id: number
  email: string
  updatedAt: string
  createdAt: string
}

function App() {
  let userStr = localStorage.getItem("simple_message:user")
  let user

  if (userStr) {
    user = JSON.parse(userStr) as User
  }

  const [state, send] = useMachine(authMachine, {
    context: {
      user
    }
  })

  const isLoggedIn = state.matches("loggedIn")

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          send(events.LOG_OUT)
        }}
      />
      <Stack
        as='main'
        maxWidth='2xl'
        alignItems='center'
        mx='auto'
        position='relative'
        top='5rem'
        height='100%'
      >
        {isLoggedIn && user ? (
          <Message currentUser={user} />
        ) : (
          <Login
            onSubmit={email => send({ type: events.SUBMIT, payload: email })}
          />
        )}
      </Stack>
    </>
  )
}

export default App
