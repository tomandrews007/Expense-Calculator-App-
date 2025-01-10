import React, { useState, useEffect } from 'react'
import {
  VStack,
  Button,
  useToast,
  Text,
  Box,
  useColorModeValue,
  Flex,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaUsers, FaCalculator, FaChartLine } from 'react-icons/fa'
import ParticipantList from './ParticipantList'
import SettlementPlan from './SettlementPlan'
import { calculateSettlements } from '../utils/calculations'

const MotionBox = motion(Box)

const StatBox = ({ label, value, icon, accentColor }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  const labelColor = useColorModeValue('gray.600', 'gray.400')
  const borderColor = useColorModeValue(`${accentColor}.200`, `${accentColor}.800`)
  
  return (
    <Box 
      bg={bgColor} 
      p={6} 
      borderRadius="xl" 
      shadow="md" 
      flex="1"
      borderLeft="4px solid"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
        transition: 'all 0.2s'
      }}
    >
      <Box
        position="absolute"
        top={2}
        right={2}
        opacity={0.1}
        fontSize="2xl"
      >
        {icon}
      </Box>
      <VStack align="start" spacing={1}>
        <Text fontSize="sm" color={labelColor} fontWeight="medium">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {value}
        </Text>
      </VStack>
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
  const toast = useToast()
  const statsBg = useColorModeValue('gray.50', 'gray.800')

  useEffect(() => {
    const total = participants.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
    const average = participants.length ? total / participants.length : 0
    setStats({ total, average })
  }, [participants])

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
  }

  const validateInputs = () => {
    return participants.every(p => 
      p.name.trim() && 
      !isNaN(p.amount) && 
      Number(p.amount) > 0
    )
  }

  return (
    <VStack spacing={8} w="100%">
      <Box 
        w="100%" 
        bg={statsBg} 
        p={6} 
        borderRadius="2xl" 
        shadow="lg"
      >
        <Flex 
          gap={4} 
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <StatBox
            label="Total Expenses"
            value={
              <MotionBox
                display="inline-block"
                animate={{ scale: stats.total ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                ${stats.total.toFixed(2)}
              </MotionBox>
            }
            icon={<FaChartLine />}
            accentColor="green"
          />
          <StatBox
            label="Average Per Person"
            value={`$${stats.average.toFixed(2)}`}
            icon={<FaCalculator />}
            accentColor="blue"
          />
          <StatBox
            label="Participants"
            value={
              <Badge 
                colorScheme="purple" 
                fontSize="xl" 
                p={2} 
                borderRadius="lg"
              >
                {participants.length}
              </Badge>
            }
            icon={<FaUsers />}
            accentColor="purple"
          />
        </Flex>
      </Box>

      <ParticipantList 
        participants={participants} 
        setParticipants={setParticipants} 
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

      {settlements.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="100%"
        >
          <SettlementPlan settlements={settlements} />
        </MotionBox>
      )}
    </VStack>
  )
}

export default ExpenseSplitter
