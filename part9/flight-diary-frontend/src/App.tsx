import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { isAxiosError } from "axios";

import diaryService from "./services/diaries";
import { Weather, Visibility, type NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [data, setData] = useState<NonSensitiveDiaryEntry[]>([]);

  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.great);
  const [weather, setWeather] = useState<Weather>(Weather.sunny);
  const [comment, setComment] = useState<string>("");

  const [error, setError] = useState<string>("");

  const visibilityValues = Object.keys(Visibility) as Array<Visibility>;
  const weatherValues = Object.keys(Weather) as Array<Weather>;

  const onChangeVisibility = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as Visibility;
    setVisibility(value);
  };

  const onChangeWeather = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as Weather;
    setWeather(value);
  };

  const handleSuccess = () => {
    setDate("");
    setVisibility(Visibility.great);
    setWeather(Weather.sunny);
    setComment("");
  };

  const handleMessage = (e: string) => {
    setError(e);
    setTimeout(() => setError(""), 5000);
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await diaryService.create({
        date,
        visibility,
        weather,
        comment,
      });

      setData((prev) => prev.concat(newEntry));
      handleSuccess();
    } catch (e) {
      handleMessage(isAxiosError(e) ? e.response?.data : "unknown error");
    }
  };

  const getAndSetData = async () => {
    const data = await diaryService.getAll();
    setData(data);
  };

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>

      <h2>Add entry</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          visibility:{" "}
          {visibilityValues.map((v) => (
            <label key={v}>
              {v}
              <input
                type="radio"
                id={v}
                name="visibility"
                value={v}
                checked={v === visibility}
                onChange={onChangeVisibility}
              />
            </label>
          ))}
        </div>

        <div>
          weather:{" "}
          {weatherValues.map((w) => (
            <label key={w}>
              {w}
              <input
                type="radio"
                id={w}
                name="weather"
                value={w}
                checked={w === weather}
                onChange={onChangeWeather}
              />
            </label>
          ))}
        </div>

        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">create book</button>
      </form>

      <h2>Entries</h2>

      {data.map((d, i) => (
        <div key={i}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
