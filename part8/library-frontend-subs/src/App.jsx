import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import Recommendations from "./components/Recommendations";

const INITIAL_MSG = { text: "", isError: false };

const App = () => {
  const client = useApolloClient();

  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(INITIAL_MSG);

  const logout = () => {
    setToken(null);
    setPage("login");
    localStorage.clear();
    client.resetStore();
  };

  const handleMessage = (e) => {
    setMessage(e);
    setTimeout(() => setMessage(INITIAL_MSG), 5000);
  };

  useEffect(() => {
    setPage(token ? "authors" : "login");
  }, [token]);

  return (
    <div>
      <div style={{ color: message.isError ? "red" : "green" }}>
        {message.text}
      </div>

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>login</button>
            <button onClick={() => setPage("create-user")}>create user</button>
          </>
        )}
      </div>

      {page === "authors" && <Authors setMessage={handleMessage} />}
      {page === "books" && <Books setMessage={handleMessage} />}
      {page === "recommendations" && token && <Recommendations />}
      {page === "add" && token && <BookForm setMessage={handleMessage} />}
      {page === "login" && !token && (
        <LoginForm setToken={setToken} setMessage={handleMessage} />
      )}
      {page === "create-user" && !token && (
        <UserForm setToken={setToken} setMessage={handleMessage} />
      )}
    </div>
  );
};

export default App;
