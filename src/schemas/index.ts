import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Login {
    url: String
  }

  type Me {
    display_name: String
    email: String
    birthdate: String
    country: String
  }

  type Query {
    me: Me
    login: Login
  }
`;
