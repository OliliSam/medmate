import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const AddReminder = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
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
      const response = await axios.post('http://localhost:5000/api/reminder', formData);

      if (response.status === 200) {
        setSuccessMessage('Reminder added successfully!');
        setError('');
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
        });
      } else {
        setError('Failed to add reminder.');
      }
    } catch (err) {
      setError('Error occurred while adding reminder.');
      console.error(err);
    }
  };

  return (
    <Box p={6} maxW="500px" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Add Reminder
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Reminder title"
          />
        </FormControl>

        <FormControl id="description" mb={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Reminder description"
          />
        </FormControl>

        <FormControl id="date" mb={4} isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="time" mb={6} isRequired>
          <FormLabel>Time</FormLabel>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
        >
          Add Reminder
        </Button>
      </form>
    </Box>
  );
};

export default AddReminder;
