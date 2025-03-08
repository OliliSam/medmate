import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
  Stack,
  VStack,
} from '@chakra-ui/react';

const AddMedicationSchedule = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    medicationId: '',
    dosage: '',
    time: '',
    frequency: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/medicationSchedule',
        formData
      );

      if (response.status === 200) {
        setSuccessMessage('Medication schedule added successfully!');
        setError('');
        setFormData({
          patientId: '',
          medicationId: '',
          dosage: '',
          time: '',
          frequency: '',
          startDate: '',
          endDate: '',
        });
      } else {
        setError('Failed to add medication schedule.');
      }
    } catch (err) {
      setError('Error occurred while adding medication schedule.');
      console.error(err);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="5" p="6" boxShadow="lg" borderRadius="md">
      <Heading mb="4" size="lg" textAlign="center">
        Add Medication Schedule
      </Heading>

      {error && (
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert status="success" mb="4">
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Patient ID</FormLabel>
            <Input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Medication ID</FormLabel>
            <Input
              type="text"
              name="medicationId"
              value={formData.medicationId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Dosage</FormLabel>
            <Input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Frequency</FormLabel>
            <Input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="teal" size="md" type="submit" width="full">
            Add Medication Schedule
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddMedicationSchedule;
