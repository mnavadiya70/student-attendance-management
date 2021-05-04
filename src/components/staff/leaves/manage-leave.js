import React, { useState, useEffect } from 'react'
import { Text, Button, Box } from 'theme-ui'
import Modal from 'react-modal'
import { IoClose } from 'react-icons/io5'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import LeaveService from '../../../services/leave-service'
import InputField from '../../shared/input/input'
import CustomButton from '../../shared/button/button'
import SelectField from '../../shared/select/select'
import { useHistory } from 'react-router'
import Table from '../../shared/table/table'

const statuses = [
    { label: "Approve", value: "Approved" },
    { label: "Reject", value: "Rejected" }
]

function ManageLeave() {
    const history = useHistory()
    const [leaves, setLeaves] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [open, setOpen] = useState(false)
    const [leaveData, setLeaveData] = useState()
    const [approverMesssage, setApproverMessage] = useState('')
    const [status, setStatus] = useState()

    useEffect(() => {
        LeaveService.getApprovalLeaves()
            .then(res => setLeaves(res))
            .catch(error => setErrorMessage(error.message.message))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            message: approverMesssage,
            status: status,
            approvedDate: new Date(),
            updateddate: new Date()
        }

        LeaveService.updateLeaveByApprover(leaveData._id, data)
            .then(res => {
                history.push('/manage-leave')
                setOpen(false)
            })
            .catch(error => setErrorMessage(error.message.message))

    }
    const handleCancel = () => {
        setOpen(false)
        setApproverMessage('')
    }

    const columns = [
        { title: "Roll No", field: "rollno" },
        { title: "Student Name", field: "name" },
        { title: "Leave Reason", field: "reason" },
        { title: "Leave Start Date", field: "leavestartdate", render: rowData => rowData.leavestartdate ? `${new Date(rowData.leavestartdate).toLocaleDateString()}` : "" },
        { title: "Leave End Date", field: "leaveenddate", render: rowData => rowData.leaveenddate ? `${new Date(rowData.leaveenddate).toLocaleDateString()}` : "" },
        { title: "Status", field: "status" },
        {
            title: "", field: "", render: (rowData) => (
                rowData &&
                <IconButton
                    onClick={() => {
                        setOpen(true)
                        setLeaveData(rowData)
                    }}>
                    <EditIcon />
                </IconButton >
            )
        },
    ]

    return (
        <>
            {errorMessage && (<Text>{errorMessage}</Text>)}
            <Table data={leaves} columns={columns} title="Manage Leaves" />
            <Modal
                isOpen={open}
                closeTimeoutMS={500}
                style={{
                    content: {
                        width: '640px',
                        height: '320px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '48px 20px 20px',
                        maxWidth: '100%',
                        background: '#111517',
                        border: 'none',
                        borderRadius: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    overlay: { zIndex: 2000 },
                }}>
                {/* CLOSE BUTTON */}
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    sx={{
                        position: 'absolute',
                        top: ['24px', '32px'],
                        right: ['16px', '32px'],
                        display: 'flex',
                        m: 0,
                        p: 0,
                        bg: 'transparent',
                        ':focus': {
                            outline: 0,
                        },
                    }}
                >
                    <IoClose />
                </Button>
                <Box sx={{ width: '50%' }}>
                    <SelectField name="status" required={true} onChange={(e) => setStatus(e.target.value)} value={status} label="Leave Status">
                        <option></option>
                        {statuses.map((obj, index) => {
                            return <option key={index} value={obj.value}>{obj.label}</option>
                        })}
                    </SelectField>
                    <InputField required={true} type="text" name="message" label="Message" value={approverMesssage} onChange={(e) => setApproverMessage(e.target.value)} />
                    <CustomButton text="Save" type="button" customSx={{ width: '100%' }} onClick={(e) => handleSubmit(e)} />
                    <CustomButton text="Cancel" type="button" customSx={{ width: '100%' }} onClick={() => handleCancel()} />
                </Box>
            </Modal>
        </>
    )
}

export default ManageLeave