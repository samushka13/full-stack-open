import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = () => {
  const result = useQuery(ALL_BOOKS);
  const userResult = useQuery(ME);
  const books = result?.data?.allBooks || [];
  const favoriteGenre = userResult?.data?.me.favoriteGenre || "";

  const booksToShow = favoriteGenre
    ? books.filter((b) => b.genres.includes(favoriteGenre))
    : [];

  if (result.loading || userResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre: <b>{favoriteGenre}</b>
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

export default Recommendations;
