import React, { useEffect, useState } from 'react'
import AttendanceService from '../../../services/attendance-service'
import Table from '../../shared/table/table'

function AttendanceReports() {
    const [reports, setReports] = useState()

    useEffect(() => {
        AttendanceService.getAttendanceReports()
            .then(res => {
                setReports(res)
                console.log(res)
            })
            .catch(error => console.log(error))
    }, [])


    const columns = [
        { title: "Date", field: "date", render: rowData => `${new Date(rowData.date).toLocaleDateString()}` },
        { title: "Status", field: "status" },
        { title: "Staff Name", field: "staffname" }
    ]

    return (
        <Table data={reports} columns={columns} title="Attendance reports" />
    )
}

export default AttendanceReports