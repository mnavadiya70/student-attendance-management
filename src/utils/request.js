import axios from 'axios'
import { getItem } from '../helpers/helper'

const service = axios.create({
    baseURL: 'http://localhost:4000/'
})

service.interceptors.request.use((request) => {
    const token = getItem('token')
    if (token) {
        request.headers.common['x-access-token'] = `${token}`
    }
    return request
})

service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.clear()
            window.location.replace('/')
            return error.response.status
        }
        if (error.response) {
            return Promise.reject(error.response.data)
        } else if (error.request) {
            return Promise.reject({ message: 'Server not responding' })
        } else {
            return Promise.reject({ message: 'Something went wrong' })
        }
    },
)

export default service