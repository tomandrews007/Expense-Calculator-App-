import React from 'react'
    import { IconButton, useColorMode } from '@chakra-ui/react'
    import { FaSun, FaMoon } from 'react-icons/fa'

    function ThemeToggle() {
      const { colorMode, toggleColorMode } = useColorMode()
      
      return (
        <IconButton
          position="fixed"
          bottom="4"
          right="4"
          zIndex="100"
          icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
          size="lg"
          isRound
          aria-label="Toggle theme"
          _hover={{ transform: 'scale(1.1)' }}
          transition="all 0.2s"
        />
      )
    }

    export default ThemeToggle
