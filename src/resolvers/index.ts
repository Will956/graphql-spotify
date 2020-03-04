import { IResolvers } from "apollo-server";

const books: Array<{ title: string; author: string }> = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: IResolvers<any, any> = {
  Query: {
    books: () => books,
  },
};
