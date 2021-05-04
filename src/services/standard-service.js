import axiosInstance from '../utils/request'

function create(data) {
    return axiosInstance.post('api/standard', data)
}

function getStandards() {
    return axiosInstance.get('api/standard')
}

function deleteStandard(id) {
    return axiosInstance.delete(`api/standard/${id}`)
}

export default {
    create,
    getStandards,
    deleteStandard
}