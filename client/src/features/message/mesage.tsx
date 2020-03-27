import React from "react"
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  useDisclosure
} from "@chakra-ui/core"
import { FaUser } from "react-icons/fa"
import { useMachine } from "@xstate/react"
import CreateMessage from "./create-message"
import MessageList from "./message-list"
import messageMachine, { events } from "./message.machine"
import { User } from "../../App"

type MessageProps = {
  currentUser: User
}

const Message = ({ currentUser }: MessageProps) => {
  const [state, send] = useMachine(messageMachine)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { selectedMessage } = state.context
  const messageListLoading = state.matches("messageList.init")
  const loadingMessageDetails = state.matches("messageCard.fetchDetails")
  const canDeleteMessage = currentUser.id === selectedMessage?.userId

  const handleOnClose = () => {
    send(events.CLOSE)
    onClose()
  }

  return (
    <Flex flexDirection='column' width='100%'>
      <CreateMessage
        currentUser={currentUser}
        onSubmit={({ userId, content }) => {
          send({ type: events.POST, payload: { userId, content } })
        }}
      />

      <Divider borderWidth='1px' my='10' />

      {messageListLoading ? (
        <Stack spacing={5}>
          <Box p={6} rounded='lg' shadow='md' borderWidth='1px'>
            <Skeleton height='20px' width='150px' />
            <Skeleton height='20px' mt={4} />
            <Skeleton height='20px' mt={4} />
          </Box>
          <Box p={6} rounded='lg' shadow='md' borderWidth='1px'>
            <Skeleton height='20px' width='150px' />
            <Skeleton height='20px' mt={4} />
          </Box>
          <Box p={6} rounded='lg' shadow='md' borderWidth='1px'>
            <Skeleton height='20px' width='150px' />
            <Skeleton height='20px' mt={4} />
            <Skeleton height='20px' mt={4} />
            <Skeleton height='20px' mt={4} />
          </Box>
        </Stack>
      ) : (
        <MessageList
          messages={state.context.messages}
          showDetail={messageId => {
            onOpen()
            send({ type: events.MORE_INFO, payload: messageId })
          }}
        />
      )}

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {loadingMessageDetails ? (
              <Box>
                <Skeleton height='20px' />
              </Box>
            ) : (
              <Flex>
                <Box as={FaUser} mr={4} size='24px' />
                {selectedMessage?.user?.email}
              </Flex>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingMessageDetails ? (
              <Box>
                <Skeleton height='10px' />
                <Skeleton height='10px' />
              </Box>
            ) : (
              <Stack>
                <Flex>
                  <Text color='gray.600' mr={2}>
                    Is it a palindrome?
                  </Text>
                  <Text color='gray.700' fontWeight='bold'>
                    {selectedMessage?.isPalindrome
                      ? "Yes it is"
                      : "No it isn't"}
                  </Text>
                </Flex>
                <Text p={3} borderWidth='1px' rounded='md'>
                  {selectedMessage?.content}
                </Text>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter justifyContent='space-between'>
            {canDeleteMessage && (
              <Button
                variantColor='red'
                onClick={() => {
                  send({ type: events.DELETE, payload: selectedMessage?.id })
                  handleOnClose()
                }}
              >
                Delete
              </Button>
            )}
            <Button variantColor='teal' ml='auto' onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Message
