import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { ADD_AUTHOR_BORN, ALL_AUTHORS } from "../queries";
import { useEffect } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const fetchedAuthors = result?.data?.allAuthors;
  const authors = fetchedAuthors || [];

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [createBook] = useMutation(ADD_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    const variables = { name, setBornTo: Number(born) };
    createBook({ variables });
    setName("");
    setBorn("");
  };

  useEffect(() => {
    setName(fetchedAuthors?.length ? fetchedAuthors[0].name : "");
  }, [fetchedAuthors]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>

      <div>
        <form onSubmit={submit}>
          <div>
            <label>
              name
              <select onChange={({ target }) => setName(target.value)}>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              born
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </label>
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
