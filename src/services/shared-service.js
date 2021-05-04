import axiosInstance from '../utils/request'

function getUser() {
    return axiosInstance.get(`api/user`,)
}

function ChangePassword(data) {
    return axiosInstance.put("api/change-password", data)
}

export default {
    getUser,
    ChangePassword
}