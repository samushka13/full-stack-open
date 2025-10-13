interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: number[],
  dailyTarget: number
): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const target = dailyTarget;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average <= target + 1 ? 2 : 3;
  const ratingDescription =
    rating === 1 ? "poor" : rating === 2 ? "ok" : "good";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const arr: string[] = JSON.parse(process.argv[3]);
  const hours = arr.map((n) => Number(n));
  const target = Number(process.argv[4]);
  console.log(calculateExercises(hours, target));

  // [3, 0, 2, 4.5, 0, 3, 1]
}
