import { useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState("all");
  const [author, setAuthor] = useState("all");

  const allBooksResult = useQuery(ALL_BOOKS);
  const allBooks = allBooksResult?.data?.allBooks || [];
  const genres = ["all", ...new Set(allBooks.flatMap((b) => b.genres))];
  const authors = ["all", ...new Set(allBooks.map((b) => b.author.name))];

  const genreVariable = genre !== "all" ? { genre } : {};
  const authorVariable = author !== "all" ? { author } : {};

  const filteredBooksResult = useQuery(ALL_BOOKS, {
    variables: { ...genreVariable, ...authorVariable },
  });

  const booksToShow = filteredBooksResult?.data?.allBooks || [];

  const onSelectGenre = async (newGenre) => {
    setGenre(newGenre);
    genre !== newGenre &&
      (await filteredBooksResult.refetch({
        genre: newGenre,
        ...authorVariable,
      }));
  };

  const onSelectAuthor = async (newAuthor) => {
    setAuthor(newAuthor);
    author !== newAuthor &&
      (await filteredBooksResult.refetch({
        ...genreVariable,
        author: newAuthor,
      }));
  };

  const isLoading =
    allBooksResult.loading ||
    filteredBooksResult.loading ||
    filteredBooksResult.networkStatus === NetworkStatus.refetch;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        <label>
          in genre:
          <select
            value={genre}
            onChange={({ target }) => onSelectGenre(target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label>
          by author:
          <select
            value={author}
            onChange={({ target }) => onSelectAuthor(target.value)}
          >
            {authors.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {booksToShow.map((a, i) => (
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
