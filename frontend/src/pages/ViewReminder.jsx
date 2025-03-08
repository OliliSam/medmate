import React, { useState, useEffect } from 'react';
import { Box, Card, CardBody, Heading, Text, Stack, StackDivider, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const ViewReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reminder');
        setReminders(response.data);
      } catch (err) {
        setError('Failed to fetch reminders.');
      }
    };

    fetchReminders();
  }, []);

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading as="h1" mb={6} textAlign="center">
        Reminders
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {reminders.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No reminders found.
        </Text>
      ) : (
        <Stack divider={<StackDivider />} spacing={4}>
          {reminders.map((reminder) => (
            <Card key={reminder._id} bg="gray.50" borderRadius="lg" shadow="md" _hover={{ bg: 'gray.100' }}>
              <CardBody>
                <Heading as="h3" size="md" mb={3} color="teal.700">
                  {reminder.title}
                </Heading>
                <Text fontSize="md" color="gray.700" mb={2}>
                  <strong>Description:</strong> {reminder.description}
                </Text>
                <Text fontSize="md" color="gray.700" mb={2}>
                  <strong>Date:</strong> {new Date(reminder.date).toLocaleDateString()}
                </Text>
                <Text fontSize="md" color="gray.700">
                  <strong>Time:</strong> {new Date(reminder.date).toLocaleTimeString()}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ViewReminder;
