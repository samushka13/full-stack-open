interface Props {
  total: number;
}

export const Total = ({ total }: Props) => {
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};
