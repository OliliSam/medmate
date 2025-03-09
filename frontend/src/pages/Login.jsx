import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/users/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
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

  const handleSubmit = () => {
    if (!newUser.email || !newUser.password) {
      alert("Please provide all required fields");
      return;
    }

    dispatch(loginUser(newUser));
  };

  useEffect(() => {
    if (!user) return;
    navigate("/dashboard");
  }, [user, navigate]);

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
          <form onSubmit={(event) => event.preventDefault()}>
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

              {/* Submit Button */}
              <Button
                size="lg"
                colorScheme="blue"
                w="full"
                mt={4}
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;
