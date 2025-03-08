import { useState } from "react";
import { Box, Button, Container, Heading, Input, VStack, HStack, Textarea, useColorModeValue, FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";

const AddPatient = () => {
  const [patient, setPatient] = useState({
    fullname: "",
    DOB: "",
    contact: "",
    age: "",
    diagnosis: "",
    allergies: "",
    admission_date: "",
    care_level: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  // Ensure DOB is not today or a future date
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const today = new Date();
    
    // Check if DOB is available in the state before using it
    if (!patient.DOB) {
      alert("Date of birth is required.");
      return;
    }
  
    const dobDate = new Date(patient.DOB); // Convert the DOB string to a Date object
  
    // Ensure the date of birth is not a future date
    if (dobDate >= today) {
      alert("Date of birth cannot be a future date.");
      return;
    }
  
    // Prepare the patient data for submission
    const patientData = {
      ...patient,
      age: Number(patient.age),  // Ensure age is sent as a number
      DOB: dobDate,  // Use the converted Date object for DOB
      admission_date: new Date(patient.admission_date),  // Convert admission_date to Date object
    };
  
    try {
      await axios.post("http://localhost:5000/api/patients", patientData);
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };
  

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Enter Patient Details
        </Heading>
        <Box w="" bg={useColorModeValue("gray.200", "blue.800")} p={8} rounded="lg" shadow="md">
          <VStack spacing={6} align="stretch">
            {/* Full Name */}
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                name="fullname"
                value={patient.fullname}
                onChange={handleInputChange}
                size="lg"
                variant="filled"
              />
            </FormControl>

            {/* Date of Birth and Contact */}
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  name="DOB"
                  value={patient.DOB}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                  max={format(new Date(), "yyyy-MM-dd")} // Restrict to today and past dates
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  placeholder="Contact Number"
                  name="contact"
                  value={patient.contact}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                />
              </FormControl>
            </HStack>

            {/* Age and Diagnosis */}
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  placeholder="Age"
                  name="age"
                  value={patient.age}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Diagnosis</FormLabel>
                <Input
                  placeholder="Diagnosis"
                  name="diagnosis"
                  value={patient.diagnosis}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                />
              </FormControl>
            </HStack>

            {/* Allergies */}
            <FormControl>
              <FormLabel>Allergies (if any)</FormLabel>
              <Textarea
                placeholder="Allergies"
                name="allergies"
                value={patient.allergies}
                onChange={handleInputChange}
                size="lg"
                variant="filled"
                rows={3}
              />
            </FormControl>

            {/* Admission Date and Care Level */}
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Admission Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Admission Date"
                  name="admission_date"
                  value={patient.admission_date}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Care Level</FormLabel>
                <Input
                  placeholder="Care Level"
                  name="care_level"
                  value={patient.care_level}
                  onChange={handleInputChange}
                  size="lg"
                  variant="filled"
                />
              </FormControl>
            </HStack>

            {/* Submit button */}
            <Button size="lg" colorScheme="blue" w="full" onClick={handleSubmit}>
              Add Patient
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AddPatient;
