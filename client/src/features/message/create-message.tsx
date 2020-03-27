import React, { useState } from "react"
import {
  Stack,
  Textarea,
  FormControl,
  FormLabel,
  Button
} from "@chakra-ui/core"
import { User } from "../../App"

type SubmitPayload = {
  userId: number
  content: string
}

type CreateMessageProps = {
  currentUser: User
  onSubmit: (payload: SubmitPayload) => void
}

const CreateMessage = ({ currentUser, onSubmit }: CreateMessageProps) => {
  const [msg, setMsg] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ userId: currentUser.id, content: msg })
    e.currentTarget.reset()
    setMsg("")
  }

  return (
    <Stack>
      <FormControl mt={4} as='form' onSubmit={handleSubmit}>
        <FormLabel htmlFor='post'>Create a message</FormLabel>
        <Textarea
          variant='outline'
          type='text'
          id='post'
          placeholder='racecar'
          onChange={(e: any) => setMsg(e.target.value)}
          value={msg}
          isRequired
        />
        <Button mt={5} variantColor='teal' type='submit'>
          Post
        </Button>
      </FormControl>
    </Stack>
  )
}

export default CreateMessage
