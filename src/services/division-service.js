import axiosInstance from '../utils/request'

function create(data) {
    return axiosInstance.post('api/division', data)
}

function getDivisions() {
    return axiosInstance.get('api/division')
}

function getDivision(id) {
    return axiosInstance.get(`api/division/${id}`)
}

function updateDivision(id, data) {
    return axiosInstance.put(`api/division/${id}`, data)
}

function getUnassignedDivisions() {
    return axiosInstance.get('api/unassigned-divisions')
}

function deleteDivision(id) {
    return axiosInstance.delete(`api/division/${id}`)
}

export default {
    create,
    getDivisions,
    getDivision,
    deleteDivision,
    updateDivision,
    getUnassignedDivisions
}