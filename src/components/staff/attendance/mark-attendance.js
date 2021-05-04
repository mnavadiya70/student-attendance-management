import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import { Checkbox, Text } from 'theme-ui'

import StaffService from '../../../services/staff-service'
import Table from '../../shared/table/table'
import Button from '../../shared/button/button'
import DatePicker from '../../shared/date-picker/date-picker'
import { getItem } from '../../../helpers/helper'
import AttendanceService from '../../../services/attendance-service'

function MarkAttendance() {
    const [staff, setStaff] = useState('')
    const [students, setStudents] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedStudents, setSelectedStudents] = useState([])
    const [hideCheckbox, setHideCheckbox] = useState(false)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const user = getItem('user')
        setStaff(JSON.parse(user))

        StaffService.getStudents()
            .then(res => setStudents(res))
            .catch(error => setErrorMessage(error.message.message))
    }, [])

    const addSelectedData = (rollno) => {
        const selectedIndex = selectedStudents.indexOf(rollno);
        let newSelected = [];
        if (selectedIndex === -1) { //add to array of selected rows
            newSelected.push(rollno);
            if (!_.isEmpty(selectedStudents)) {
                setSelectedStudents([...selectedStudents, ...newSelected]);
            } else {
                setSelectedStudents(newSelected);
            }
        } else if (selectedIndex > -1) { //remove from array of selected rows
            newSelected = selectedStudents;
            newSelected.splice(selectedIndex, 1);
            setSelectedStudents([...newSelected]);
        }
    }

    const checkIsChecked = (rollno) => {
        return selectedStudents.indexOf(rollno) !== -1;
    }

    const handleDateChange = (date) => {
        setDate(date);
    }

    const handleSave = (e) => {
        e.preventDefault()
        const data = []
        for (let i = 0; i < students.length; i++) {
            data.push({
                rollno: students[i].rollno,
                name: `${students[i].firstname} ${students[i].lastname}`,
                standard: students[i].standard,
                division: students[i].division,
                status: selectedStudents.includes(students[i]) ? "Present" : "Absent",
                staffname: staff.username,
                createddate: new Date(),
                updateddate: new Date(),
                staffId: staff.id,
                date: date.toLocaleDateString(),
                studentId: students[i]._id
            })
        }

        AttendanceService.markAttendance(data)
            .then(res => {
                setErrorMessage(res.message)
                setHideCheckbox(true)
                setDate(new Date())
            })
            .catch(error => {
                setErrorMessage(error.message.message)
                setHideCheckbox(false)
            })

        setTimeout(() => {
            setErrorMessage("")
        }, 5000)
    }

    const columns = [
        {
            title: "Mark Presence", field: "", hidden: hideCheckbox, render: (rowData) =>
                rowData && (
                    <IconButton onClick={() => addSelectedData(rowData)}>
                        <Checkbox checked={checkIsChecked(rowData)} />
                    </IconButton>
                )
        },
        { title: "Roll No", field: "rollno" },
        { title: "FirstName", field: "firstname" },
        { title: "LastName", field: "lastname" },
        { title: "Email", field: "email" },
        { title: "Gender", field: "gender" },
        { title: "Date Of Birth", field: "dateofbirth" },
    ]

    return (
        <>
            <DatePicker label="Select Date" name="date" id="date" value={date} handleDateChange={handleDateChange} />
            {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
            <Table data={students} columns={columns} title="Mark student attendance" />
            <Button text="Save" onClick={(e) => handleSave(e)} customSx={{ float: 'right' }} />
        </>
    )
}

export default MarkAttendance