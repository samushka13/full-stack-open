import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const fetchPatientList = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };

  const fetchDiagnosisList = async () => {
    const diagnoses = await diagnosisService.getAll();
    setDiagnoses(diagnoses);
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void fetchPatientList();
    void fetchDiagnosisList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>

        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>

        <Divider hidden />

        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientPage diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
