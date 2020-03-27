import React from "react"
import { Box, Flex, Text, Link, Button } from "@chakra-ui/core"
import { FaRegPaperPlane, FaGithub } from "react-icons/fa"

type NavbarProps = {
  isLoggedIn: boolean
  onLogout: () => void
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  return (
    <Box
      as='header'
      position='fixed'
      top='0'
      bg='red'
      left='0'
      right='0'
      borderBottom='1px solid'
      borderBottomColor='gray.100'
    >
      <Flex alignItems='center' px={5} my={3}>
        <Text
          as={Flex}
          alignItems='center'
          fontSize='2xl'
          fontWeight='bolder'
          color='teal.700'
        >
          <Box as={FaRegPaperPlane} size='32px' mr={3} />
          simple message
        </Text>
        <Flex justifyContent='flex-end' flex='1' alignItems='center'>
          <Link
            aria-label='Go to github repo'
            href='https://github.com/mkallies/simple-expense'
            isExternal
          >
            <Box as={FaGithub} size='24px' color='gray.400' />
          </Link>
          {isLoggedIn && (
            <Button ml={4} onClick={onLogout} data-testid='logout'>
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
