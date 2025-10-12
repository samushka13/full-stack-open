import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const BookForm = ({ setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const handleSuccess = () => {
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
    setMessage({ text: "Book added!" });
  };

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (e) => setMessage({ text: e.message, isError: true }),
    onCompleted: handleSuccess,
  });

  const submit = async (event) => {
    event.preventDefault();
    const variables = { title, author, published: Number(published), genres };
    createBook({ variables });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default BookForm;
