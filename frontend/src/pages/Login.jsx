import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: newUser.email,
        password: newUser.password,
      });

      if (response.status === 200) {
        console.log("Login success:", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard"); // Redirect on success
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
          textColor={useColorModeValue("blue.700", "blue.300")}
        >
          Enter Login Details
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("gray.200", "blue.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            {/* Error message */}
            {error && <Box color="red.500">{error}</Box>}

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
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* Submit Button */}
            <Button
              size="lg"
              colorScheme="blue"
              w="full"
              mt={4}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;
