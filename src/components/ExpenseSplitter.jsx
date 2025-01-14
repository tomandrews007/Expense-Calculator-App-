import React, { useState, useEffect, useRef } from 'react'
    import {
      VStack,
      Button,
      useToast,
      Text,
      Box,
      useColorModeValue,
      Flex,
      Badge,
      HStack,
      Tooltip,
      IconButton,
      Collapse,
      Divider
    } from '@chakra-ui/react'
    import { motion } from 'framer-motion'
    import { FaUsers, FaCalculator, FaChartLine, FaUndo, FaAngleDown, FaAngleUp } from 'react-icons/fa'
    import ParticipantList from './ParticipantList'
    import SettlementPlan from './SettlementPlan'
    import CurrencySelect from './CurrencySelect'
    import { calculateSettlements } from '../utils/calculations'
    import { currencies } from '../utils/currencies'

    const MotionBox = motion(Box)

    const StatBox = ({ label, value, icon, accentColor }) => {
      const bgColor = useColorModeValue('white', 'gray.700')
      const labelColor = useColorModeValue('gray.600', 'gray.400')
      const borderColor = useColorModeValue(`${accentColor}.200`, `${accentColor}.800`)
      
      return (
        <Box 
          bg={bgColor} 
          px={4}
          py={2}
          borderRadius="xl" 
          shadow="md" 
          flex="1"
          borderLeft="4px solid"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
          minW="140px"
          _hover={{
            transform: 'translateY(-2px)',
            shadow: 'lg',
            transition: 'all 0.2s'
          }}
        >
          <HStack spacing={3} align="center">
            <Box opacity={0.5}>
              {icon}
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color={labelColor} fontWeight="medium">
                {label}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {value}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )
    }

    function ExpenseSplitter() {
      const [participants, setParticipants] = useState([
        { id: 1, name: '', amount: '' }
      ])
      const [settlements, setSettlements] = useState([])
      const [stats, setStats] = useState({
        total: 0,
        average: 0
      })
      const [currency, setCurrency] = useState('INR')
      const [showResults, setShowResults] = useState(true)
      const resultsRef = useRef(null)
      const toast = useToast()

      const bgColor = useColorModeValue('white', 'gray.700')
      const statsBg = useColorModeValue('gray.50', 'gray.800')
      const clearButtonBg = useColorModeValue('white', 'gray.700')
      const clearButtonHoverBg = useColorModeValue('red.50', 'red.900')
      const borderColor = useColorModeValue('gray.200', 'gray.600')
      const resultsBg = useColorModeValue('blue.50', 'blue.900')

      const getCurrencySymbol = (code) => {
        const curr = currencies.find(c => c.code === code)
        return curr ? curr.symbol : '₹'
      }

      useEffect(() => {
        const total = participants.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
        const average = participants.length ? total / participants.length : 0
        setStats({ total, average })
      }, [participants])

      const validateInputs = () => {
        return participants.every(p => 
          p.name.trim() && 
          !isNaN(p.amount) && 
          Number(p.amount) > 0
        )
      }

      const calculateSplit = () => {
        if (!validateInputs()) {
          toast({
            title: 'Invalid Input',
            description: 'Please fill in all fields with valid amounts',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          return
        }

        const result = calculateSettlements(participants)
        setSettlements(result)
        setShowResults(true)
        
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }

      const clearAll = () => {
        setParticipants([{ id: Date.now(), name: '', amount: '' }])
        setSettlements([])
        setShowResults(true)
        toast({
          title: 'Cleared All',
          description: 'All participants have been cleared',
          status: 'info',
          duration: 2000,
          isClosable: true,
        })
      }

      const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency)
        toast({
          title: 'Currency Updated',
          description: `Currency changed to ${newCurrency}`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }

      return (
        <VStack spacing={6} w="100%">
          <Box ref={resultsRef} w="100%" scroll-margin-top="2rem">
            <Collapse in={settlements.length > 0} animateOpacity>
              <Box 
                w="100%" 
                bg={resultsBg} 
                borderRadius="xl" 
                p={4} 
                mb={4}
                position="relative"
                shadow="lg"
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Settlement Plan
                  </Text>
                  <IconButton
                    icon={showResults ? <FaAngleUp /> : <FaAngleDown />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResults(!showResults)}
                    aria-label={showResults ? "Hide results" : "Show results"}
                  />
                </Flex>
                <Collapse in={showResults}>
                  <SettlementPlan 
                    settlements={settlements} 
                    currencySymbol={getCurrencySymbol(currency)}
                  />
                </Collapse>
              </Box>
            </Collapse>
          </Box>

          <Flex 
            w="100%" 
            justify="space-between" 
            align="center"
            direction={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <HStack spacing={4}>
              <CurrencySelect 
                selectedCurrency={currency}
                onCurrencyChange={handleCurrencyChange}
              />
              <Tooltip 
                label="Clear all participants and start over" 
                placement="top"
              >
                <IconButton
                  icon={<FaUndo />}
                  variant="outline"
                  size="md"
                  onClick={clearAll}
                  borderColor={borderColor}
                  bg={clearButtonBg}
                  _hover={{ 
                    bg: clearButtonHoverBg,
                    borderColor: 'red.300',
                    color: 'red.500'
                  }}
                  transition="all 0.2s"
                />
              </Tooltip>
            </HStack>
            <Flex 
              gap={3} 
              flexDirection={{ base: 'column', sm: 'row' }}
              align="center"
              w={{ base: '100%', md: 'auto' }}
            >
              <StatBox
                label="Total Expenses"
                value={
                  <MotionBox
                    display="inline-block"
                    animate={{ scale: stats.total ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getCurrencySymbol(currency)}{stats.total.toFixed(2)}
                  </MotionBox>
                }
                icon={<FaChartLine size="1.2em" />}
                accentColor="green"
              />
              <StatBox
                label="Average Per Person"
                value={`${getCurrencySymbol(currency)}${stats.average.toFixed(2)}`}
                icon={<FaCalculator size="1.2em" />}
                accentColor="blue"
              />
              <StatBox
                label="Participants"
                value={
                  <Badge 
                    colorScheme="purple" 
                    fontSize="md" 
                    px={2}
                    py={1}
                    borderRadius="lg"
                  >
                    {participants.length}
                  </Badge>
                }
                icon={<FaUsers size="1.2em" />}
                accentColor="purple"
              />
            </Flex>
          </Flex>

          <Divider />

          <ParticipantList 
            participants={participants} 
            setParticipants={setParticipants} 
            currencySymbol={getCurrencySymbol(currency)}
          />

          <Button 
            colorScheme="blue"
            size="lg"
            onClick={calculateSplit}
            isDisabled={participants.length < 2}
            w="200px"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            Calculate Split
          </Button>
        </VStack>
      )
    }

    export default ExpenseSplitter
