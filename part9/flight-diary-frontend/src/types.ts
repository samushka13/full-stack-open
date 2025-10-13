export const Weather = {
  sunny: "sunny",
  rainy: "rainy",
  cloudy: "cloudy",
  stormy: "stormy",
  windy: "windy",
} as const;

export type Weather = keyof typeof Weather;

export const Visibility = {
  great: "great",
  good: "good",
  ok: "ok",
  poor: "poor",
} as const;

export type Visibility = keyof typeof Visibility;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
