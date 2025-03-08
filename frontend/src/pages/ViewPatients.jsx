import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, SimpleGrid, Heading, Alert, AlertIcon, Spinner, Card, CardBody } from '@chakra-ui/react';

const ViewPatients = () => {
  const [patients, setPatients] = useState([]); // Initialize as an array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          setError('Invalid data format received.');
        }
      } catch (err) {
        setError('Failed to fetch patients.');
      }
    };

    fetchPatients();
  }, []);

  return (
    <Box p={6} maxW="1200px" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Patient List
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {patients.length === 0 && !error ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
          <Text mt={4} fontSize="lg">
            Fetching patient list...
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={[1, null, 3]} spacing={6}>
          {patients.map((patient) => (
            <Card key={patient._id} borderWidth="1px" borderRadius="md" boxShadow="md">
              <CardBody>
                <Text fontWeight="bold" fontSize="xl">
                  {patient.first_name} {patient.last_name}
                </Text>
                <Text>Age: {patient.age}</Text>
                <Text>Condition: {patient.condition}</Text>
                <Text>Medication: {patient.medication}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ViewPatients;
