import React from 'react'
import { Box, Container, Heading, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import ExpenseSplitter from './components/ExpenseSplitter'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const bgColor = useColorModeValue('white', 'gray.700')
  const headingColor = useColorModeValue('blue.600', 'blue.200')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const gradientStart = useColorModeValue('blue.50', 'gray.800')
  const gradientEnd = useColorModeValue('white', 'gray.700')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} py={8}>
      <ThemeToggle />
      <Container maxW="container.md">
        <Box 
          w="100%" 
          bg={bgColor} 
          borderRadius="2xl" 
          shadow="xl" 
          overflow="hidden"
        >
          <Box
            bg={useColorModeValue('blue.500', 'blue.900')}
            py={8}
            px={8}
            backgroundImage={`linear-gradient(45deg, ${useColorModeValue('blue.600', 'blue.800')}, ${useColorModeValue('purple.600', 'purple.800')})`}
            position="relative"
            overflow="hidden"
          >
            {/* Decorative elements */}
            <Box
              position="absolute"
              top="-20%"
              left="-10%"
              width="120%"
              height="200%"
              transform="rotate(-3deg)"
              backgroundImage={`radial-gradient(circle at 50% 50%, ${useColorModeValue('whiteAlpha.300', 'whiteAlpha.100')}, transparent 60%)`}
            />
            
            <VStack spacing={2} position="relative">
              <Heading 
                color="white" 
                size="2xl"
                textAlign="center"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Expense Splitter
              </Heading>
              <Text 
                color="whiteAlpha.900" 
                fontSize="lg"
                textAlign="center"
                maxW="md"
                fontWeight="medium"
              >
                Split expenses fairly among friends with ease
              </Text>
            </VStack>
          </Box>

          <Box p={8}>
            <ExpenseSplitter />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default App
