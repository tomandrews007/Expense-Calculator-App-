import React from 'react'
    import {
      VStack,
      Box,
      Text,
      Divider,
      List,
      ListItem,
      Icon,
      HStack,
      useColorModeValue
    } from '@chakra-ui/react'
    import { FaArrowRight } from 'react-icons/fa'
    import { motion } from 'framer-motion'

    const MotionListItem = motion(ListItem)

    function SettlementPlan({ settlements, currencySymbol }) {
      const total = settlements.reduce((sum, s) => sum + s.amount, 0)
      const bgColor = useColorModeValue('white', 'gray.700')
      const headingColor = useColorModeValue('blue.700', 'blue.200')
      const itemBg = useColorModeValue('blue.50', 'blue.900')
      const itemHoverBg = useColorModeValue('blue.100', 'blue.800')
      const textColor = useColorModeValue('blue.700', 'blue.200')
      const amountColor = useColorModeValue('green.600', 'green.300')

      return (
        <Box w="100%" p={6} borderWidth={1} borderRadius="lg" bg={bgColor} shadow="lg">
          <VStack align="stretch" spacing={4}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" color={headingColor}>
              Settlement Plan
            </Text>
            <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
              Total Amount: {currencySymbol}{total.toFixed(2)}
            </Text>
            <Divider />
            <List spacing={3}>
              {settlements.map((settlement, index) => (
                <MotionListItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  p={4}
                  bg={itemBg}
                  borderRadius="md"
                  _hover={{ bg: itemHoverBg }}
                  transition="background 0.2s"
                >
                  <HStack justify="space-between" align="center">
                    <Text fontWeight="medium" color={textColor}>
                      {settlement.from}
                    </Text>
                    <HStack spacing={2}>
                      <Icon as={FaArrowRight} color={textColor} />
                      <Text fontWeight="bold" color={amountColor}>
                        {currencySymbol}{settlement.amount.toFixed(2)}
                      </Text>
                    </HStack>
                    <Text fontWeight="medium" color={textColor}>
                      {settlement.to}
                    </Text>
                  </HStack>
                </MotionListItem>
              ))}
            </List>
          </VStack>
        </Box>
      )
    }

    export default SettlementPlan
