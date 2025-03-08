// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewMedications = () => {
//   const [medications, setMedications] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMedications = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/medication');
//         setMedications(response.data);
//       } catch (err) {
//         setError('Failed to fetch medications.');
//       }
//     };

//     fetchMedications();
//   }, []);

//   return (
//     <div className="medications">
//       <h1>Medications</h1>
//       {error && <p className="error-message">{error}</p>}
//       {medications.length === 0 ? (
//         <p>No medications found.</p>
//       ) : (
//         <ul>
//           {medications.map((medication) => (
//             <li key={medication._id}>
//               <h3>{medication.name}</h3>
//               <p>Description: {medication.description}</p>
//               <p>Dosage: {medication.dosage}</p>
//               <p>Manufacturer: {medication.manufacturer}</p>
//               <p>Side Effects: {medication.side_effects}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewMedications;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, List, ListItem, Alert, AlertIcon, Spinner } from '@chakra-ui/react';

const ViewMedications = () => {
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medication');
        setMedications(response.data);
      } catch (err) {
        setError('Failed to fetch medications.');
      }
    };

    fetchMedications();
  }, []);

  return (
    <Box p={6} maxW="800px" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Medications
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {medications.length === 0 && !error ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
          <Text mt={4} fontSize="lg">
            Fetching medications...
          </Text>
        </Box>
      ) : (
        <List spacing={4}>
          {medications.map((medication) => (
            <ListItem key={medication._id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Text fontWeight="bold" fontSize="xl" mb={2}>
                {medication.name}
              </Text>
              <Text>Description: {medication.description}</Text>
              <Text>Dosage: {medication.dosage}</Text>
              <Text>Manufacturer: {medication.manufacturer}</Text>
              <Text>Side Effects: {medication.side_effects}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ViewMedications;
