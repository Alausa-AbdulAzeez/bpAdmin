import axios from 'axios'

const BASE_URL = 'https://app.biopathonline.com/api/'
export const BASE_FRONTEND_URL = 'http://localhost:3000/'

// https://app.biopathonline.com/swagger/index.html
console.log('aaa')
const user =
  localStorage.getItem('persist:root') !== undefined
    ? JSON.parse(localStorage.getItem('persist:root'))?.user
    : null
console.log(user)
const currentUser = user && JSON.parse(user)?.currentUser
console.log(currentUser)
const TOKEN = currentUser?.data?.token

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
console.log(TOKEN)
