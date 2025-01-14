import React from 'react'
    import {
      VStack,
      HStack,
      Input,
      IconButton,
      Text,
      Box,
      InputGroup,
      InputLeftElement,
      useColorModeValue
    } from '@chakra-ui/react'
    import { FaPlus, FaTrash, FaUser } from 'react-icons/fa'
    import { motion } from 'framer-motion'

    const MotionBox = motion(Box)

    function ParticipantList({ participants, setParticipants, currencySymbol }) {
      const bgColor = useColorModeValue('white', 'gray.700')
      const iconColor = useColorModeValue('gray.400', 'gray.500')
      const headingColor = useColorModeValue('blue.700', 'blue.200')

      const addParticipant = () => {
        setParticipants([
          ...participants,
          { id: Date.now(), name: '', amount: '' }
        ])
      }

      const removeParticipant = (id) => {
        setParticipants(participants.filter(p => p.id !== id))
      }

      const updateParticipant = (id, field, value) => {
        setParticipants(participants.map(p => 
          p.id === id ? { ...p, [field]: value } : p
        ))
      }

      return (
        <VStack w="100%" spacing={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold" color={headingColor}>
            Add Participants
          </Text>
          {participants.map((participant, index) => (
            <MotionBox
              key={participant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <HStack w="100%" spacing={4} p={2} bg={bgColor} borderRadius="md" shadow="sm">
                <InputGroup>
                  <InputLeftElement>
                    <FaUser color={iconColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Name"
                    value={participant.name}
                    onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement>
                    <Text color={iconColor}>{currencySymbol}</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={participant.amount}
                    onChange={(e) => updateParticipant(participant.id, 'amount', e.target.value)}
                  />
                </InputGroup>
                {participants.length > 1 && (
                  <IconButton
                    aria-label="Remove participant"
                    icon={<FaTrash />}
                    onClick={() => removeParticipant(participant.id)}
                    colorScheme="red"
                    variant="ghost"
                    _hover={{ bg: useColorModeValue('red.50', 'red.900') }}
                  />
                )}
              </HStack>
            </MotionBox>
          ))}
          <Box textAlign="center" py={2}>
            <IconButton
              aria-label="Add participant"
              icon={<FaPlus />}
              onClick={addParticipant}
              colorScheme="green"
              size="lg"
              isRound
              _hover={{ transform: 'scale(1.1)' }}
              transition="all 0.2s"
            />
          </Box>
        </VStack>
      )
    }

    export default ParticipantList
