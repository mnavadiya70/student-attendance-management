import axiosInstance from '../utils/request'

function getStudents(){
    return axiosInstance.get('api/student')
}

function addStudent(data){
    return axiosInstance.post('api/student', data)
}

function deleteStudent(id){
    return axiosInstance.delete(`api/student/${id}`)
}

export default {
    addStudent,
    getStudents,
    deleteStudent
}