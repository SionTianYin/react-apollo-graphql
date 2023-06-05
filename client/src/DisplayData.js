import React from 'react'
import { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'

const QUERY_ALL_USERS = gql`
    query QueryAllUsers{
      users {
        id
        name
        age
        username
        nationality
      }
    }
  `

const QUERY_ALL_MOVIES = gql`
    query QueryAllMovies{
      movies{
        movieName
        isInTheaters
        yearOfPublication
      }
    }
  `

const GET_FIND_MOVIE = gql`
    query FindMovie($movieName: String!){
      movie(movieName: $movieName) {
        movieName
        yearOfPublication
      }
    }
  `

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!){
  createUser(input: $input) {
    name
    username
    age
    nationality
  }
}
`


function DisplayData () {

  const [movieSearched, setMovieSearched] = useState("")
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_FIND_MOVIE)

  // Create User State Hooks
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState("")
  const [createUser] = useMutation(CREATE_USER)


  if (loading) {
    return <h1> DATA IS LOADING ... </h1>
  }
  // if (error) {
  //   console.log(error)
  // }
  if (data) {
    console.log(data)
  }
  //在 JavaScript 中，可以使用 toUpperCase() 方法将字符串转换为全大写。这个方法会返回一个新的字符串，其中所有的字母都被转换为大写字母。
  return (
    <div>
      <div>
        <h2>Create User Here</h2>
        <input type="text" placeholder='input name' onChange={(event) => { setName(event.target.value) }} /><br />
        <input type="text" placeholder='input username' onChange={(event) => { setUsername(event.target.value) }} /><br />
        <input type="number" placeholder='input age' onChange={(event) => { setAge(event.target.value) }} /><br />
        <input type="text" placeholder='input nationality' onChange={(event) => { setNationality(event.target.value.toUpperCase()) }} /><br />

        <button onClick={() => {
          createUser({
            variables: {
              input: {
                name, username, age: Number(age), nationality,
              }
            }
          })
          refetch()
        }}>Submit!</button>
      </div>
      <h1>List of Users</h1><hr />
      {
        data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name:{user.name}</h1>
              <h1>Age:{user.age}</h1>
              <h1>Username:{user.username}</h1>
              <h1>Nationality:{user.nationality}</h1>
              <hr />
            </div>
          )
        })}
      {/* {
        movieData &&
        movieData.movies.map((movie) => {
          return (
            <div>
              <h1>Name:{movie.movieName}</h1>
              <h1>isInTheaters:{movie.isInTheaters}</h1>
              <h1>Year:{movie.yearOfPublication}</h1>
              <hr />
            </div>
          )
        })
      } */}
      <div>
        <input
          type="text"
          placeholder='Please Insert Movie Name'
          onChange={(event) => { setMovieSearched(event.target.value) }} />
        <button onClick={() => {
          fetchMovie({
            variables: {
              movieName: movieSearched
            }
          })
        }}>Fetch Data</button>
        {/* 当你点击按钮时，它将触发查询，并将movieSearched作为movieName变量的值传递给fetchMovie函数。查询结果将存储在movieSearchedData变量中。 */}
        <div>
          {movieSearchedData && (
            <div>
              <h2>MovieName:{movieSearchedData.movie.movieName}</h2>
              <h2>Year:{movieSearchedData.movie.yearOfPublication}</h2>
            </div>
          )}
          {movieError && <h3>No such Movie!</h3>}
        </div>
      </div>
    </div>
  )
}

export default DisplayData
