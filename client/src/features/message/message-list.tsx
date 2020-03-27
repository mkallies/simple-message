import React from "react"
import { Stack, Text, Box, Icon, Flex } from "@chakra-ui/core"

type Message = {
  id: number
  content: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

type MessageCardProps = {
  message: Message
  handleClick: () => void
}

const MessageCard = ({ message, handleClick, ...rest }: MessageCardProps) => {
  return (
    <Box
      p={6}
      rounded='lg'
      shadow='md'
      borderWidth='1px'
      onClick={handleClick}
      {...rest}
    >
      <Text>Message: {message.content}</Text>
    </Box>
  )
}

type MessageListProps = {
  messages: Message[]
  showDetail: (id: number) => void
}

const MessageList = ({ messages, showDetail }: MessageListProps) => {
  const showEmptyView = messages.length === 0

  if (showEmptyView) {
    return (
      <Flex
        bg='gray.50'
        p={6}
        rounded='lg'
        borderWidth='2px'
        alignItems='center'
      >
        <Icon name='chat' size='32px' color='teal.500' mr={4} />
        <Text fontWeight='semibold' fontSize='xl'>
          Hey! Enter some text above. Then click on a card to see more
          information, such as{" "}
          <Text as='span' fontWeight='bold'>
            is it a palindrome?
          </Text>
        </Text>
      </Flex>
    )
  }
  return (
    <Stack spacing={5}>
      {messages.map(message => {
        return (
          <MessageCard
            key={message.id}
            message={message}
            handleClick={() => showDetail(message.id)}
          />
        )
      })}
    </Stack>
  )
}

export default MessageList
