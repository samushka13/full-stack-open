import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import App from "./App.jsx";

const authLink = new SetContextLink((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  const authorization = token ? `Bearer ${token}` : null;

  return { headers: { ...headers, authorization } };
});

const uri = "http://localhost:4000";

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri })),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
