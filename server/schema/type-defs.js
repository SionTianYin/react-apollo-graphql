const { gql } = require('apollo-server')


const typeDefs = gql`
  type User{
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }
  enum Nationality{
    CANADA
    AMELIE 
    CHINA
    FRANCE 
    JAPAN
    YAJUUEMPIRE
  }

  type Movie{
    id: ID!
    movieName: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query{
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(movieName:String!): Movie!
  }

  input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = YajuuEmpire
  }

  input UpdateUsernameInput{
    id: ID!
    newUsername: String!
  }

  type Mutation{
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }
`
module.exports = { typeDefs }
