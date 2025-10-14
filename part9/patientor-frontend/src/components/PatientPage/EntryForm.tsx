import { SyntheticEvent, useState } from "react";
import {
  Alert,
  Button,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { isAxiosError } from "axios";

import patientService from "../../services/patients";
import {
  Diagnosis,
  Entry,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from "../../types";

const ENTRY_TYPES: EntryType[] = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare",
];

const ENTRY_TYPE_OPTIONS: { value: EntryType; label: string }[] =
  ENTRY_TYPES.map((e) => ({ value: e, label: e.toString() }));

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const HEALTH_CHECK_RATINGS = Object.values(HealthCheckRating);

const HEALTH_CHECK_RATING_OPTIONS: HealthCheckRatingOption[] =
  HEALTH_CHECK_RATINGS.filter((v) => isNaN(Number(v))).map((v, i) => ({
    value: i,
    label: v.toString(),
  }));

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onAddEntry: (value: Entry) => void;
}

const EntryForm = ({ patientId, diagnoses, onAddEntry }: Props) => {
  const [error, setError] = useState<string>("");
  const [type, setType] = useState<EntryType>("HealthCheck");

  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  const onFormTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;

    if (typeof value === "string") {
      const formType = ENTRY_TYPES.find((e) => e.toString() === value);
      formType && setType(formType);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    const formType = HEALTH_CHECK_RATING_OPTIONS.find(
      (r) => r.value.toString() === event.target.value
    )?.value;

    formType !== undefined && setHealthCheckRating(formType);
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? [value] : value);
  };

  const handleError = (e: string) => {
    setError(e);
    setTimeout(() => setError(""), 3000);
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const getNewEntry = (): NewEntry => {
      switch (type) {
        case "HealthCheck":
          return {
            type,
            date,
            description,
            specialist,
            diagnosisCodes,
            healthCheckRating,
          };
      }
      switch (type) {
        case "Hospital":
          return {
            type,
            date,
            description,
            specialist,
            diagnosisCodes,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
      }
      switch (type) {
        case "OccupationalHealthcare":
          return {
            type,
            date,
            description,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            },
          };
      }
    };

    try {
      const entry = await patientService.addEntry(patientId, getNewEntry());
      onAddEntry(entry);
    } catch (e) {
      if (isAxiosError(e)) {
        const errorMessage = e?.response?.data.error[0]?.message;

        if (typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          handleError(message);
        } else if (errorMessage) {
          console.error(errorMessage);
          handleError(errorMessage);
        } else {
          handleError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        handleError("Unknown error");
      }
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "lightcyan", padding: 10 }}>
      {error && (
        <Alert style={{ padding: 10, marginBottom: 10 }} severity="error">
          {error}
        </Alert>
      )}

      <h3>Add entry</h3>

      <InputLabel>Type</InputLabel>

      <RadioGroup value={type} row name="formType">
        {ENTRY_TYPE_OPTIONS.map((e) => (
          <FormControlLabel
            key={e.value}
            value={e.value}
            control={<Radio onChange={onFormTypeChange} />}
            label={e.label}
          />
        ))}
      </RadioGroup>

      <div style={{ height: 10 }} />

      <form onSubmit={onSubmit}>
        <InputLabel>Date</InputLabel>

        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <div style={{ height: 10 }} />

        <TextField
          size="small"
          multiline
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <div style={{ height: 10 }} />

        <TextField
          size="small"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <div style={{ height: 10 }} />

        <InputLabel>Diagnosis Codes</InputLabel>

        <Select
          label="Diagnosis Codes"
          fullWidth
          size="small"
          renderValue={(v) => v.map((c) => c.split(" ")[0]).join(", ")}
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          multiple
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code + " " + d.name}
            </MenuItem>
          ))}
        </Select>

        <div style={{ height: 10 }} />

        {type === "HealthCheck" ? (
          <>
            <InputLabel>Health Check Rating</InputLabel>

            <RadioGroup value={healthCheckRating} row name="healthCheckRating">
              {HEALTH_CHECK_RATING_OPTIONS.map((e) => (
                <FormControlLabel
                  key={e.value}
                  value={e.value}
                  control={<Radio onChange={onHealthCheckRatingChange} />}
                  label={e.label}
                />
              ))}
            </RadioGroup>
          </>
        ) : type === "Hospital" ? (
          <>
            <div style={{ height: 10 }} />

            <InputLabel>Discharge on</InputLabel>

            <Input
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />

            <div style={{ height: 10 }} />

            <TextField
              size="small"
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        ) : (
          <>
            <TextField
              size="small"
              label="Employer"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <div style={{ height: 10 }} />

            <InputLabel>Sick leave starts on</InputLabel>

            <Input
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />

            <div style={{ height: 10 }} />

            <InputLabel>Sick leave ends on</InputLabel>

            <Input
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}

        <div style={{ height: 10 }} />

        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
