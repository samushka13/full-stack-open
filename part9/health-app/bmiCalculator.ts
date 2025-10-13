export const calculateBmi = (height: number, weight: number) => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  const rating =
    bmi < 16
      ? "Underweight (Severe thinness)"
      : bmi >= 16 && bmi < 17
      ? "Underweight (Moderate thinness)"
      : bmi >= 17 && bmi < 18.5
      ? "Underweight (Mild thinness)"
      : bmi >= 18.5 && bmi < 25
      ? "Normal range"
      : bmi >= 25 && bmi < 30
      ? "Overweight (Pre-obese)"
      : bmi >= 30 && bmi < 35
      ? "Obese (Class I)"
      : bmi >= 35 && bmi < 40
      ? "Obese (Class II)"
      : "Obese (Class III)";

  return rating;
};

if (require.main === module) {
  const h = Number(process.argv[3]);
  const w = Number(process.argv[4]);
  console.log(calculateBmi(h, w));
}
