import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://spacetime.onrender.com/',
})
