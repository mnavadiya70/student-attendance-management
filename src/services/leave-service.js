import axiosInstance from '../utils/request'

function addLeave(data) {
    return axiosInstance.post('api/leave-request', data)
}

function getLeaves() {
    return axiosInstance.get('api/leave-request')
}

function getAllLeaves() {
    return axiosInstance.get('api/all-leave')
}

function getApprovalLeaves() {
    return axiosInstance.get('api/approval-leave-request')
}

function updateLeaveByApprover(id, data) {
    return axiosInstance.put(`api/approval-leave-request/${id}`, data)
}

function cancelLeave(id, data) {
    return axiosInstance.put(`api/cancel-leave-request/${id}`, data)
}

export default {
    addLeave,
    getLeaves,
    getApprovalLeaves,
    updateLeaveByApprover,
    cancelLeave,
    getAllLeaves
}