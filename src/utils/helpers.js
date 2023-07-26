import axios from 'axios'
let baseURL = ''
const domainName = window.location.hostname
if (domainName.includes('localhost')) {
  baseURL = 'http://localhost:3000/api/v1'
} else {
  baseURL = 'https://mioarin-board-shop-f9111bcddc75.herokuapp.com/api/v1'
}

export const apiHelper = axios.create({
  baseURL
})