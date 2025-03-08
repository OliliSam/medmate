import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  Select,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customFetch from "../utils/axios";

const Register = () => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "caregiver", // Default role
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Toggle visibility for password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Register the new user via API
      const response = await customFetch.post("/register", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });

      if (response.status === 201) {
        setMessage("User registered successfully!");
        // Store role in localStorage
        localStorage.setItem("userRole", newUser.role);

        // Redirect to the login page after a brief delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2-second delay before redirecting to the login page
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
          textColor={useColorModeValue("blue.700", "blue.300")}
        >
          Register New User
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("gray.200", "blue.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            {/* Error and Success Messages */}
            {error && <Box color="red.500">{error}</Box>}
            {message && <Box color="green.500">{message}</Box>}

            {/* First Name Field */}
            <Input
              placeholder="First Name"
              name="first_name"
              value={newUser.first_name}
              onChange={handleInputChange}
              type="text"
              size="lg"
              variant="filled"
              focusBorderColor="blue.400"
              required
            />

            {/* Last Name Field */}
            <Input
              placeholder="Last Name"
              name="last_name"
              value={newUser.last_name}
              onChange={handleInputChange}
              type="text"
              size="lg"
              variant="filled"
              focusBorderColor="blue.400"
              required
            />

            {/* Email Field */}
            <Input
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              type="email"
              size="lg"
              variant="filled"
              focusBorderColor="blue.400"
              required
            />

            {/* Password Field with Show/Hide Option */}
            <InputGroup size="lg">
              <Input
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                variant="filled"
                focusBorderColor="blue.400"
                required
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* Role Field */}
            <Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              size="lg"
              variant="filled"
              focusBorderColor="blue.400"
              required
            >
              <option value="caregiver">Caregiver</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
            </Select>

            {/* Submit Button */}
            <Button
              size="lg"
              colorScheme="blue"
              w="full"
              mt={4}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Register;
