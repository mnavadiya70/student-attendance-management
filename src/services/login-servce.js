import axiosInstance from '../utils/request'

function signin(data){
    return axiosInstance.post('api/auth/signin', data)
}

export default {
    signin
}