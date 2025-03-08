import React from "react";
import { useSelector } from "react-redux";

export const Users = () => {
    const { users } = useSelector((state) => state.users)

  return (
        <Box p={6} maxW="1200px" mx="auto">
        <Heading as="h1" mb={6} textAlign="center">
            {users.map((users) => {
                <div>{users.Users}</div>
            })}
            List of Users
        </Heading>

        {/* Input for filtering users */}
        <Box mb={4} textAlign="center">
            <input
            type="text"
            placeholder="Search users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
                padding: "8px",
                borderRadius: "4px",
                width: "100%",
                maxWidth: "400px",
            }}
            />
        </Box>

        {state.loading ? (
            <Box textAlign="center">
            <Spinner size="xl" />
            </Box>
        ) : state.error ? (
            <Alert status="error" mb={4}>
            <AlertIcon />
            {state.error}
            </Alert>
        ) : filteredUsers.length === 0 ? (
            <Text textAlign="center" fontSize="lg" color="gray.500">
            No users found.
            </Text>
        ) : (
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {filteredUsers.map((user) => (
                <Box
                key={user._id}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
                shadow="md"
                bg="white"
                _hover={{ bg: "gray.50" }}
                transition="background-color 0.2s ease"
                >
                <Heading as="h3" size="md" mb={3} color="teal.700">
                    {user.first_name} {user.last_name}
                </Heading>
                <Divider mb={3} />
                <Text fontSize="md" color="gray.700">
                    <strong>Email:</strong> {user.email}
                </Text>
                <Text fontSize="md" color="gray.700">
                    <strong>Role:</strong> {user.role}
                </Text>
                </Box>
            ))}
            </SimpleGrid>
            )}
        </Box>
    );
};

export default Users;
