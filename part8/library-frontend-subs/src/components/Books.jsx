import { useState } from "react";
import { NetworkStatus } from "@apollo/client";
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "../queries.js";

const uniqByName = (a) => {
  let seen = new Set();
  return a.filter((item) => {
    let k = item.name;
    return seen.has(k) ? false : seen.add(k);
  });
};

const updateBookCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(addedBook)) };
  });
};

const updateAuthorCache = (cache, query, addedAuthor) => {
  cache.updateQuery(query, ({ allAuthors }) => {
    return { allAuthors: uniqByName(allAuthors.concat(addedAuthor)) };
  });
};

const Books = ({ setMessage }) => {
  const client = useApolloClient();

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      const addedAuthor = data.data.bookAdded.author;
      setMessage(`${addedBook.name} added!`);
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook);
      updateAuthorCache(client.cache, { query: ALL_AUTHORS }, addedAuthor);
    },
  });

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
