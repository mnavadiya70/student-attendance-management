import React, { useEffect, useState } from 'react'
import { Text } from 'theme-ui'
import IconButton from '@material-ui/core/IconButton'
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined'
import Table from '../../shared/table/table'
import LeaveService from '../../../services/leave-service'
import { useHistory } from 'react-router'

function Leaves() {
    const history = useHistory()
    const [leaves, setLeaves] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        LeaveService.getLeaves()
            .then(res => setLeaves(res))
            .catch(error => setErrorMessage(error.message.message))

    }, [])

    const handleCancelLeave = (leaveData) => {
        const data = {
            status: "Cancelled",
            updateddate: new Date()
        }

        LeaveService.cancelLeave(leaveData._id, data)
            .then(res => {
                history.push('/leave-request')
            })
            .catch(error => setErrorMessage(error.message.message))
    }

    const columns = [
        { title: "Leave Start Date", field: "leavestartdate", render: rowData => rowData.leavestartdate ? `${new Date(rowData.leavestartdate).toLocaleDateString()}` : "" },
        { title: "Leave End Date", field: "leaveenddate", render: rowData => rowData.leaveenddate ? `${new Date(rowData.leaveenddate).toLocaleDateString()}` : "" },
        { title: "Duration", field: "duration" },
        { title: "Approver Message", field: "approvermessage" },
        { title: "Approved Date", field: "approveddate", render: rowData => rowData.approveddate ? `${new Date(rowData.approveddate).toLocaleDateString()}` : "" },
        { title: "Status", field: "status" },
        {
            title: "", field: "", render: (rowData) => (
                rowData && rowData.status !== "Cancelled" &&
                <IconButton
                    onClick={() => {
                        if (window.confirm("Are you sure you want to cancel this leave?")) {
                            handleCancelLeave(rowData)
                        }
                    }
                    }>
                    <BlockOutlinedIcon />
                </IconButton >
            )
        },
    ]

    return (
        <>
            {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
            <Table data={leaves} columns={columns} title="My Leaves" />
        </>
    )
}

export default Leaves