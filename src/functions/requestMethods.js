import axios from 'axios'

const BASE_URL = 'http://15.237.160.238:60/api/'
const user = JSON.parse(localStorage.getItem('persist:root'))?.user
console.log(user)
const currentUser = user && JSON.parse(user).currentUser
console.log(currentUser)
// console.log(currentUser.data.token)
const TOKEN = currentUser?.data?.token
console.log(TOKEN)
// const TOKEN = localStorage.getItem('token')

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
})
