// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SpeechToTextRecords = () => {
//   const [records, setRecords] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/speechtotextRecords');
//         setRecords(response.data);
//       } catch (err) {
//         setError('Failed to fetch speech-to-text records.');
//       }
//     };

//     fetchRecords();
//   }, []);

//   return (
//     <div className="records">
//       <h1>Speech to Text Records</h1>
//       {error && <p className="error-message">{error}</p>}
//       {records.length === 0 ? (
//         <p>No records found.</p>
//       ) : (
//         <ul>
//           {records.map((record) => (
//             <li key={record._id}>
//               <p>Record ID: {record._id}</p>
//               <p>Transcription: {record.transcription}</p>
//               <p>Created At: {new Date(record.created_at).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SpeechToTextRecords;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, List, ListItem, Alert, AlertIcon, Spinner } from '@chakra-ui/react';

const SpeechToTextRecords = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/speechtotextRecords');
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch speech-to-text records.');
      }
    };

    fetchRecords();
  }, []);

  return (
    <Box p={6} maxW="800px" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Speech to Text Records
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {records.length === 0 && !error ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
          <Text mt={4} fontSize="lg">
            Fetching records...
          </Text>
        </Box>
      ) : (
        <List spacing={4}>
          {records.map((record) => (
            <ListItem key={record._id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Text fontWeight="bold">Record ID: {record._id}</Text>
              <Text mt={2}>Transcription: {record.transcription}</Text>
              <Text mt={2} color="gray.500">
                Created At: {new Date(record.created_at).toLocaleString()}
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SpeechToTextRecords;
