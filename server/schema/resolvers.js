const { UserList } = require("../Database.js")
const { MovieList } = require("../Moviebase.js")
const _ = require("lodash")

const resolvers = {
  Query: {
    users: (parent, args, context) => {
      console.log(context)
      return UserList
    },
    user: (parent, args, context, info) => {
      const id = args.id
      const user = _.find(UserList, { id: Number(id) })
      return user
    },
    // context 参数：context 是一个对象，它在解析器函数之间传递共享的上下文数据。它通常用于在解析器中访问身份验证信息、数据库连接、请求对象等共享资源。通过在解析器的不同部分传递相同的 context 对象，可以确保解析器函数之间共享数据和状态。
    //例如，在 Express.js 中，可以使用中间件将身份验证令牌解码为用户对象，并将该用户对象存储在 context 中，然后在解析器函数中访问该用户对象以进行授权和权限检查。
    //info 参数：info 包含有关当前 GraphQL 查询的信息，例如查询字段、字段别名、选择集等。它提供了有关查询的元数据，可以在解析器函数中使用该信息进行高级操作。
    //info 对象通常用于解析器函数中的高级查询操作，例如根据查询的字段选择动态地生成数据库查询，处理查询的字段别名，或者在解析器中执行复杂的字段转换和数据处理逻辑。
    movies: () => {
      return MovieList
    },
    movie: (parent, args) => {
      const movieName = args.movieName
      const movie = _.find(MovieList, { movieName })
      return movie
    }
  },
  User: {
    favoriteMovies: (parent) => {
      // console.log(parent)
      return _.filter(MovieList, (movie) => movie.yearOfPublication == 2023)
    }
  },
  //via parents: users -> favoriteMovies -> movies
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input   //注意input是小写的
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      return user
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input
      let userUpdated
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername
          userUpdated = user
        }
      })
      return userUpdated
    },

    deleteUser: (parent, args) => {
      const id = args.id
      _.remove(UserList, (user) =>
        user.id === Number(id)
      )
      return null
    }
  }
}
module.exports = { resolvers }