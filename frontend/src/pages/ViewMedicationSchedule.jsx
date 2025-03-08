import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Heading,
  Alert,
  AlertIcon,
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const ViewMedicationSchedule = () => {
  const [medicationSchedules, setMedicationSchedules] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicationSchedules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/medication-schedule"
        );
        setMedicationSchedules(response.data);
      } catch (err) {
        setError("Failed to fetch medication schedules.");
      }
    };

    fetchMedicationSchedules();
  }, []);

  // Group medication schedules by date
  const groupedSchedules = medicationSchedules.reduce((acc, schedule) => {
    const date = new Date(schedule.time).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {});

  return (
    <Box
      p={6}
      maxW="1200px"
      mx="auto"
      mt={10}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Medication Schedules
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {medicationSchedules.length === 0 && !error ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
          <Text mt={4} fontSize="lg">
            Fetching medication schedules...
          </Text>
        </Box>
      ) : (
        <Grid templateColumns="repeat(7, 1fr)" gap={6}>
          {/* Calendar Headers for Days */}
          {Object.keys(groupedSchedules).map((date) => (
            <GridItem
              key={date}
              bg="teal.500"
              color="white"
              p={4}
              borderRadius="md"
              textAlign="center"
              fontWeight="bold"
            >
              {date}
            </GridItem>
          ))}

          {/* Medication Schedules grouped by day */}
          {Object.keys(groupedSchedules).map((date) => (
            <GridItem key={date}>
              {groupedSchedules[date].map((schedule) => (
                <Box
                  key={schedule._id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  bg="gray.50"
                  mb={4}
                  textAlign="center"
                >
                  <Text color="teal.600" fontWeight="bold" fontSize="lg">
                    {new Date(schedule.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Text>
                  <Text>Patient: {schedule.patient_name}</Text>
                  <Text>Medication: {schedule.medication_name}</Text>
                  <Text>Dosage: {schedule.dosage}</Text>
                  <Text>Frequency: {schedule.frequency}</Text>
                </Box>
              ))}
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewMedicationSchedule;
