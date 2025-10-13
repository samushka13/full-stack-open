import type { CoursePart } from "../types";

interface Props {
  part: CoursePart;
}

export const Part = ({ part }: Props) => {
  const style = { backgroundColor: "lightgrey" };

  switch (part.kind) {
    case "basic":
      return (
        <div style={style}>
          <b>name: {part.name}</b>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
        </div>
      );
    case "background":
      return (
        <div style={style}>
          <b>name: {part.name}</b>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "group":
      return (
        <div style={style}>
          <b>name: {part.name}</b>
          <p>exercise count: {part.exerciseCount}</p>
          <p>group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "special":
      return (
        <div style={style}>
          <b>name: {part.name}</b>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>requirements: {part.requirements.join(", ")}</p>
        </div>
      );
  }
};
