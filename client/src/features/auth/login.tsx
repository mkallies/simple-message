import React, { useState } from "react"
import {
  Stack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel
  // FormErrorMessage
} from "@chakra-ui/core"

type LoginProps = {
  onSubmit: (email: string) => void
}

const Login = ({ onSubmit }: LoginProps) => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
    e.currentTarget.reset()
    setEmail("")
  }

  return (
    <Stack width='100%' maxWidth='md'>
      <Heading textAlign='center'>Login</Heading>
      <Stack mt={5} borderWidth='1px' rounded='md' py={3} px={5}>
        <FormControl my={6} as='form' onSubmit={handleSubmit}>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            variant='flushed'
            type='email'
            id='email'
            placeholder='email@domain.com'
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            isRequired
          />
          <Button variantColor='teal' mt={5} type='submit'>
            Submit
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default Login
