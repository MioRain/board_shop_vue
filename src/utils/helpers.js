import axios from 'axios'

const baseURL = 'http://localhost:3000/api/v1'

export const apiHelper = axios.create({
  baseURL
})