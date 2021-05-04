import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'

import Table from '../../shared/table/table'
import StaffService from '../../../services/staff-service'

function StaffList() {
    const [staff, setStaff] = useState()
    useEffect(() => {
        StaffService.getStaffMembers()
            .then(res => {
                setStaff(res)
            })
    }, [])

    const handleDelete = (rowData, resolve) => {
        StaffService.deleteStaffMember(rowData._id)
            .then(res => {
                let staffMembers = [...staff]
                let index = staffMembers.findIndex(x => x._id === rowData._id)
                staffMembers.splice(index, 1)
                setStaff(staffMembers)
                resolve()
            })
            .catch(error => console.log(error))
    }

    const columns = [
        { title: 'Standard', field: 'standard' },
        { title: 'Division', field: 'division' },
        { title: 'FirstName', field: 'firstname' },
        { title: 'LastName', field: 'lastname' },
        { title: 'Email', field: 'email' },
        { title: 'Qualification', field: 'qualification' },
        { title: 'Experience (in years)', field: 'experience' },
        { title: 'Joining Date', field: 'joiningdate' },
        { title: 'Mobile', field: 'mobile' },
        { title: 'Address', field: 'address' },
        { title: 'Gender', field: 'gender' },
        { title: 'Date of birth', field: 'dateofbirth' }
    ]

    return (
        <Box sx={{
            // '.MuiPaper-rounded': {
            //     borderRadius: '0px'
            // },
            // '.MuiPaper-root': {
            //     color: '#FFFFFF',
            //     backgroundColor: '#000000'
            // },
            // '.MTableHeader-header-13': {
            //     backgroundColor: '#000000'
            // },
            // '.MuiTableCell-head': {
            //     color: '#FFFFFF'
            // }
        }}>
            <Table data={staff} columns={columns} title="Staff Members"
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleDelete(oldData, resolve)
                        }),
                }} />
        </Box>
    )
}

export default StaffList