const { MovieList } = require('./Moviebase.js')

UserList = [
  {
    id: 1,
    name: "John",
    username: "john",
    age: 20,
    nationality: "CANADA",
    friends:
      [
        {
          id: 2,
          name: "Smith",
          username: "smioth",
          age: 24,
          nationality: "AMELIE",
        },
        {
          id: 3,
          name: "Yajuu",
          username: "senpai",
          age: 114,
          nationality: "JAPAN",
        },
        {
          id: 4,
          name: "Liu",
          username: "liu",
          age: 25,
          nationality: "CHINA",
        },
      ]
  },
  {
    id: 2,
    name: "Smith",
    username: "smioth",
    age: 24,
    nationality: "AMELIE",
  },
  {
    id: 3,
    name: "Yajuu",
    username: "senpai",
    age: 114,
    nationality: "JAPAN",
    favoriteMovies: [],
  },
  {
    id: 4,
    name: "Liu",
    username: "liu",
    age: 25,
    nationality: "CHINA",
  },
  {
    id: 5,
    name: "Elise",
    username: "sion",
    age: 19,
    nationality: "FRANCE",
  },
]

module.exports = { UserList }