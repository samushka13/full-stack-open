interface Props {
  name: string;
}

export const Header = ({ name }: Props) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};
