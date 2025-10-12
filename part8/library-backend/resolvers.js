const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Book = require("./models/book");
const Author = require("./models/author");

const RESOLVERS = {
  Query: {
    me: (_, __, { currentUser }) => {
      return currentUser;
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      let books = await Book.find({}).populate("author");

      if (args.author) {
        books = books.filter((b) => b.author.name === args.author);
      }

      if (args.genre) {
        books = books.filter((b) => b.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      const books = await Book.find({}).populate("author");

      authors = authors.map((a) => ({
        name: a.name,
        born: a.born || null,
        bookCount: books.filter((b) => b.author.name === a.name).length,
      }));

      return authors;
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }

      return user;
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
  },
};

module.exports = RESOLVERS;
