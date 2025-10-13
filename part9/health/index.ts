import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: "parameters missing" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  const response = { height, weight, bmi };

  res.status(200).send(response);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hours: number[] = daily_exercises.map((e: unknown) => Number(e));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const numerizedTarget = Number(req.body.target);

  if (!Array.isArray(hours) || !hours.length || isNaN(numerizedTarget)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const response = calculateExercises(hours, numerizedTarget);

  res.status(200).send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
