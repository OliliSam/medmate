
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';


const HomePage = () => {
  return (
    <Container
      maxW="container.md"
      centerContent
      py={8}
      bg={useColorModeValue('gray.100', 'gray.800')}
      borderRadius="lg"
      boxShadow="xl"
    >
      {/* Logo Image
      <Image
        src="/images/logo.png"  // Replace with your logo image path
        alt="Medmate Logo"
        boxSize="150px"
        mb={4}
      /> */}

      <VStack spacing={6} align="center" textAlign="center">
        <Heading as="h1" size="2xl" color="teal.400">
          Medmate
        </Heading>
        <Text fontFamily={"Poppins"}  fontSize="lg" color={useColorModeValue('gray.700', 'gray.200')}>
          ...manage your medications better with Medmate
        </Text>

        {/* Hero Image
        <Image
          src="./components/Images/hero.jpeg"  // Replace with your hero image path
          alt="Nursing Care"
          boxSize="300px"
          borderRadius="lg"
          objectFit="cover"
        /> */}

        {/* Register Button */}
        <Link to="/register">
          <Button colorScheme="teal" size="lg" mt={4}>
            Register
          </Button>
        </Link>

        {/* Footer with "Already have an account?" and Login Button */}
        <HStack pt={6} spacing={2}>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            Already have an account?
          </Text>
          <Link to="/login">
            <Button variant="outline" colorScheme="teal" size="sm">
              Login
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};

export default HomePage;
