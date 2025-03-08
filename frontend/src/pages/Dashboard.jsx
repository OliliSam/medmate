import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Retrieve the role of the logged-in user from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Define sections based on role
  const adminSections = [
    { title: "View Users", route: "/view-Users" },
    { title: "Add Patients", route: "/add-Patients" },
    { title: "View Patients", route: "/view-Patients" },
    { title: "Add Medication Schedule", route: "/add-Medication-Schedule" },
    { title: "View Medication Schedule", route: "/view-Medication-Schedule" },
    { title: "Add Reminder", route: "/add-Reminder" },
    { title: "View Reminder", route: "/view-Reminder" },
    { title: "Speech to Text Records", route: "/speech-To-Text-Records" },
  ];

  const caregiverSections = [
    { title: "Add Patients", route: "/add-Patients" },
    { title: "Add Medication Schedule", route: "/add-Medication-Schedule" },
    { title: "View Medication Schedule", route: "/view-Medication-Schedule" },
    { title: "Add Reminder", route: "/add-Reminder" },
    { title: "View Reminder", route: "/view-Reminder" },
  ];

  const doctorSections = [
    { title: "View Patients", route: "/view-Patients" },
    { title: "Add Medication", route: "/add-Medication" },
    { title: "View Medication", route: "/view-Medication" },
    { title: "Add Medication Schedule", route: "/add-Medication-Schedule" },
    { title: "View Medication Schedule", route: "/view-Medication-Schedule" },
  ];

  // Map sections based on the user role
  const sections =
    userRole === "admin"
      ? adminSections
      : userRole === "caregiver"
      ? caregiverSections
      : doctorSections;

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("userRole"); // Clear the stored role on logout
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        {/* Logout Button */}
        <HStack justify="space-between" w="full">
          <Heading as="h1" size="xl" textAlign="center">
            Dashboard
          </Heading>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>

        {/* Dashboard Sections based on role */}
        <SimpleGrid columns={[1, 2]} spacing={6} w="full">
          {sections.map((section) => (
            <Box
              key={section.title}
              bg="blue.500"
              color="white"
              p={4}
              rounded="lg"
              shadow="md"
              textAlign="center"
              _hover={{ bg: "blue.600", cursor: "pointer" }}
              onClick={() => navigate(section.route)}
            >
              <Heading as="h3" size="md">
                {section.title}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Dashboard;
