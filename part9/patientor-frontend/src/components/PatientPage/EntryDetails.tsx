import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  getDiagnosis: (code: Diagnosis["code"]) => string;
}

const EntryDetails = ({ entry, getDiagnosis }: Props) => {
  const style = { backgroundColor: "lightgrey" };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={style}>
          <p>
            {entry.date}: <i>{entry.description}</i>
          </p>

          <p>health check by {entry.specialist}</p>
          <p>health check rating: {entry.healthCheckRating}</p>

          <ul>
            {entry.diagnosisCodes?.map((d, i) => (
              <li key={i}>
                {d}: {getDiagnosis(d)}
              </li>
            ))}
          </ul>
        </div>
      );
    case "Hospital":
      return (
        <div style={style}>
          <p>
            {entry.date}: <i>{entry.description}</i>
          </p>

          <p>hospital visit | treated by {entry.specialist}</p>
          <p>discharge on {entry.discharge.date}</p>
          <p>discharge criteria: {entry.discharge.criteria}</p>

          <ul>
            {entry.diagnosisCodes?.map((d, i) => (
              <li key={i}>
                {d}: {getDiagnosis(d)}
              </li>
            ))}
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <p>
            {entry.date}: <i>{entry.description}</i>
          </p>

          <p>occupational healthcare by {entry.specialist}</p>
          <p>paid by {entry.employerName}</p>

          {entry.sickLeave && (
            <p>
              sick leave: {entry.sickLeave?.startDate} -{" "}
              {entry.sickLeave?.endDate}
            </p>
          )}

          <ul>
            {entry.diagnosisCodes?.map((d, i) => (
              <li key={i}>
                {d}: {getDiagnosis(d)}
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

export default EntryDetails;
