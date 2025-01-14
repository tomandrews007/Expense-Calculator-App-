import React from 'react'
    import {
      VStack,
      Box,
      Text,
      List,
      ListItem,
      Icon,
      HStack,
      useColorModeValue,
      Badge
    } from '@chakra-ui/react'
    import { FaArrowRight } from 'react-icons/fa'
    import { motion } from 'framer-motion'

    const MotionListItem = motion(ListItem)

    function SettlementPlan({ settlements, currencySymbol }) {
      const total = settlements.reduce((sum, s) => sum + s.amount, 0)
      const bgColor = useColorModeValue('white', 'whiteAlpha.100')
      const textColor = useColorModeValue('blue.700', 'blue.200')
      const amountColor = useColorModeValue('green.600', 'green.300')

      return (
        <VStack align="stretch" spacing={4}>
          <List spacing={2}>
            {settlements.map((settlement, index) => (
              <MotionListItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                p={3}
                bg={bgColor}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack spacing={4} flex={1}>
                  <Badge colorScheme="blue" px={2}>
                    {settlement.from}
                  </Badge>
                  <Icon as={FaArrowRight} color={textColor} />
                  <Badge colorScheme="green" px={2}>
                    {settlement.to}
                  </Badge>
                  <Text fontWeight="bold" color={amountColor} ml="auto">
                    {currencySymbol}{settlement.amount.toFixed(2)}
                  </Text>
                </HStack>
              </MotionListItem>
            ))}
          </List>
        </VStack>
      )
    }

    export default SettlementPlan
