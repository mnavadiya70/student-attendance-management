import React, { useState, useEffect } from 'react'
import { Text } from 'theme-ui'
import LeaveService from '../../../services/leave-service'
import Table from '../../shared/table/table'

function LeaveReports() {
    const [leaves, setLeaves] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        LeaveService.getAllLeaves()
            .then(res => setLeaves(res))
            .catch(error => setErrorMessage(error.message.message))

    }, [])
    const columns = [
        { title: "Roll No", field: "rollno" },
        { title: "Std/Div", field: "standard", render: rowData => `${rowData.standard}/${rowData.division}` },
        { title: "Name", field: "name" },
        { title: "Reason", field: "reason" },
        { title: "Leave Start Date", field: "leavestartdate", render: rowData => rowData.leavestartdate ? `${new Date(rowData.leavestartdate).toLocaleDateString()}` : "" },
        { title: "Leave End Date", field: "leaveenddate", render: rowData => rowData.leaveenddate ? `${new Date(rowData.leaveenddate).toLocaleDateString()}` : "" },
        { title: "Duration", field: "duration" },
        { title: "Approver Message", field: "approvermessage" },
        { title: "Approved Date", field: "approveddate", render: rowData => rowData.approveddate ? `${new Date(rowData.approveddate).toLocaleDateString()}` : "" },
        { title: "Status", field: "status" }
    ]

    return (
        <>
            {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
            <Table data={leaves} columns={columns} title="Leave Reports" />
        </>
    )
}

export default LeaveReports