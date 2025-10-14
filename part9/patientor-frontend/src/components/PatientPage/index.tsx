import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";

import { Diagnosis, Gender, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();

  const getDiagnosis = (code: Diagnosis["code"]) => {
    return diagnoses.find((d) => code === d.code)?.name ?? "";
  };

  const match = useMatch("/patients/:id");

  const fetchPatient = async (id?: string) => {
    const patient = id ? await patientService.getById(id) : undefined;
    setPatient(patient);
  };

  useEffect(() => {
    void fetchPatient(match?.params.id);
  }, [match?.params.id]);

  if (!patient) {
    return <p>Patient not found</p>;
  }

  return (
    <div className="App">
      <h2>
        {patient.name}{" "}
        {patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      {patient.entries.length ? (
        <>
          <h3>entries</h3>

          {patient.entries.map((e, i) => (
            <EntryDetails entry={e} getDiagnosis={getDiagnosis} key={i} />
          ))}
        </>
      ) : (
        <p>no entries</p>
      )}
    </div>
  );
};

export default PatientPage;
