import axios from 'axios'
import humps from 'humps'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: false,
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json',
  },
  transformResponse: [
    // convert keys of returned data from snake_case to camelCase
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data),
  ],
  transformRequest: [
    // convert keys of request data from camelCase to snake_case
    (data) => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
})

export default apiClient
