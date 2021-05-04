import axiosInstance from './../utils/request'

function markAttendance(data){
    return axiosInstance.post('api/mark-attendance', data)
}

function getAttendanceReports(){
    return axiosInstance.get('api/attendance-report')
}

export default {
    markAttendance,
    getAttendanceReports
}