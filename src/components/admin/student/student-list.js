import React, { useEffect, useState } from 'react'
import {Box} from 'theme-ui'

import Table from '../../shared/table/table'
import StudentService from '../../../services/student-service'

function StudentList() {
    const [students, setStudents] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        StudentService.getStudents()
        .then(res=>{
            setStudents(res)
        })
        .catch(error => setErrorMessage(error.message.message))
    }, [])

    const handleDelete = (rowData, resolve) => {
        StudentService.deleteStudent(rowData._id)
            .then(res => {
                let updatedStudents = [...students]
                updatedStudents = updatedStudents.filter(x => x._id !== rowData._id)
                setStudents(updatedStudents)
                resolve()
            })
            .catch(error => console.log(error))
    }

    const columns = [
        { title: 'Roll No', field: 'rollno' },
        { title: 'Standard', field: 'standard' },
        { title: 'Division', field: 'division' },
        { title: 'FirstName', field: 'firstname' },
        { title: 'LastName', field: 'lastname' },
        { title: 'Email', field: 'email' },
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
            <Table data={students} columns={columns} title="Students"
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleDelete(oldData, resolve)
                        })
                }} />
        </Box>
    )
}

export default StudentList