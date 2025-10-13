import type { CoursePart } from "../types";
import { Part } from "./Part";

interface Props {
  parts: CoursePart[];
}

export const Content = ({ parts }: Props) => {
  return (
    <div>
      {parts.map((p, i) => (
        <Part key={i} part={p} />
      ))}
    </div>
  );
};
