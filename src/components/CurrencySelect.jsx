import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
  Box,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'
import { currencies } from '../utils/currencies'

function CurrencySelect({ selectedCurrency, onCurrencyChange }) {
  const menuBg = useColorModeValue('white', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.600')
  const selectedBg = useColorModeValue('blue.50', 'blue.900')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency)

  return (
    <Menu placement="bottom-start">
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        variant="outline"
        size="md"
        borderRadius="lg"
        borderColor={borderColor}
        _hover={{ bg: hoverBg }}
        _active={{ bg: hoverBg }}
      >
        <HStack spacing={2}>
          <Text>{selectedCurrencyData.symbol}</Text>
          <Text>{selectedCurrencyData.code}</Text>
        </HStack>
      </MenuButton>
      <MenuList
        bg={menuBg}
        borderColor={borderColor}
        shadow="lg"
        borderRadius="lg"
        py={2}
      >
        {currencies.map((currency) => (
          <MenuItem
            key={currency.code}
            onClick={() => onCurrencyChange(currency.code)}
            bg={currency.code === selectedCurrency ? selectedBg : 'transparent'}
            _hover={{ bg: hoverBg }}
            px={4}
            py={3}
          >
            <HStack justify="space-between" width="100%">
              <HStack spacing={3}>
                <Box w="24px" textAlign="center">
                  <Text>{currency.symbol}</Text>
                </Box>
                <Text fontWeight="medium">{currency.code}</Text>
                <Text color="gray.500">- {currency.name}</Text>
              </HStack>
              {currency.code === selectedCurrency && (
                <Icon as={FaCheck} color="green.500" />
              )}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CurrencySelect
