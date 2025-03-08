import { Box} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AddMedication from "./pages/AddMedication";
import ViewMedication from "./pages/ViewMedications";
import AddPatients from "./pages/AddPatients";
import ViewPatients from "./pages/ViewPatients";
import ViewReminder from "./pages/ViewReminder";
import SpeechToTextRecords from "./pages/SpeechToTextRecords";
import AddMedicationSchedule from "./pages/AddMedicationSchedule";
import ViewMedicationSchedule from "./pages/ViewMedicationSchedule";
import Dashboard from "./pages/Dashboard";
import AddReminder from "./pages/AddReminder";
import Users from "./pages/ViewUsers";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("grey.300", "blue.800")}>
      <Navbar />
      <Routes>
      <Route path="/register" element={<Register/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/" element={<HomePage/>} /> 
      <Route path="/view-Users" element={<Users/>} /> 
      <Route path="/add-Patients" element={<AddPatients/>} /> 
      <Route path="/view-Patients" element={<ViewPatients/>} /> 
      <Route path="/add-Medication" element={<AddMedication/>} /> 
      <Route path="/view-Medication" element={<ViewMedication/>} /> 
      <Route path="/add-Medication-Schedule" element={<AddMedicationSchedule/>} /> 
      <Route path="/add-Reminder" element={<AddReminder/>} /> 
      <Route path="/view-Medication-Schedule" element={<ViewMedicationSchedule/>} /> 
      <Route path="/speech-To-Text-Records" element={<SpeechToTextRecords/>} /> 
      <Route path="/view-Reminder" element={<ViewReminder/>} /> 
      <Route path="/dashboard" element={<Dashboard/>} /> 
      </Routes>
    </Box>
  );
}



export default App;
