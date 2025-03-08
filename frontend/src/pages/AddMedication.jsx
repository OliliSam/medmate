import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Alert,
  AlertIcon,
  Stack,
  VStack,
} from "@chakra-ui/react";

const AddMedication = () => {
  const [formData, setFormData] = useState({
    name: "",
    dosageForm: "",
    strength: "",
    route: "",
    frequency: "",
    instructions: "",
    sideEffects: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        "http://localhost:5000//api/medication",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Medication added successfully!");
        setError("");
        setFormData({
          name: "",
          dosageForm: "",
          strength: "",
          route: "",
          frequency: "",
          instructions: "",
          sideEffects: "",
        });
      } else {
        setError("Failed to add medication.");
      }
    } catch (err) {
      setError("Error occurred while adding medication.");
      console.error(err);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="5" p="6" boxShadow="lg" borderRadius="md">
      <Heading mb="4" size="lg" textAlign="center">
        Add Medication
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
            <FormLabel>Medication Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Dosage Form (e.g., tablet, capsule)</FormLabel>
            <Input
              type="text"
              name="dosageForm"
              value={formData.dosageForm}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Strength (e.g., 500mg)</FormLabel>
            <Input
              type="text"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Route (e.g., oral, injection)</FormLabel>
            <Input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Frequency (e.g., twice daily)</FormLabel>
            <Input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Instructions</FormLabel>
            <Textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Side Effects</FormLabel>
            <Textarea
              name="sideEffects"
              value={formData.sideEffects}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            width="full"
          >
            Add Medication
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddMedication;
