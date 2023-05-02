import axios from 'axios'

const BASE_URL = 'http://15.237.160.238:60/api/'
const user = JSON.parse(localStorage.getItem('persist:root'))?.user
const currentUser = user && JSON.parse(user).currentUser
console.log(currentUser)
const TOKEN = currentUser
// const TOKEN = localStorage.getItem('token')

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
})
