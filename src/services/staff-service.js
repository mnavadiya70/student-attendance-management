import axiosInstance from '../utils/request'

function getStaffMembers(){
    return axiosInstance.get('api/staff')
}

function addStaffMember(data){
    return axiosInstance.post('api/add', data)
}

function deleteStaffMember(id){
    return axiosInstance.delete(`api/staff/${id}`)
}

function getStudents(){
    return axiosInstance.get('api/students')
}

export default {
    addStaffMember,
    getStaffMembers,
    deleteStaffMember,
    getStudents
}