import React from "react"
import { render, wait, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import { theme, ThemeProvider } from "@chakra-ui/core"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios)

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

describe("Simple Message", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should allow a user to login and create a post", async () => {
    const { getByText, getByLabelText } = setup()

    mock.onPost("http://localhost:4000/api/user").reply(200, {
      id: 1,
      email: "jeff@jeff.com",
      updatedAt: "2020-03-27T10:00:38.640Z",
      createdAt: "2020-03-27T10:00:38.640Z"
    })

    mock.onGet("http://localhost:4000/api/messages").reply(200, {
      messages: [
        {
          id: 1,
          content: "racecar",
          createdAt: "2020-03-27T10:10:02.280Z",
          updatedAt: "2020-03-27T10:10:02.280Z",
          userId: 1
        }
      ]
    })

    fireEvent.change(getByLabelText(/email address/i), {
      target: { value: "" }
    })

    await userEvent.type(getByLabelText(/email address/i), "jeff@jeff.com")

    userEvent.click(getByText(/submit/i))

    await wait(() => {
      expect(getByText(/create a message/i)).toBeInTheDocument()
    })

    mock.onPost("http://localhost:4000/api/messages").reply(200, {
      message: {
        id: 2,
        content: "unique message",
        userId: 1,
        updatedAt: "2020-03-27T10:42:01.068Z",
        createdAt: "2020-03-27T10:42:01.068Z"
      }
    })

    await userEvent.type(getByLabelText(/create a message/i), "unique message")

    userEvent.click(getByText(/post/i))

    await wait(() => {
      expect(getByText(/unique message/i)).toBeInTheDocument()
    })
  })
})
