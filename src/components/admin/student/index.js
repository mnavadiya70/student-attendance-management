import React, { useState } from 'react'
import StudentList from './student-list'
import AddStudent from './add-student'
import Button from './../../shared/button/button'

function Staff() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button type="button" onClick={() => setOpen(true)} text="Add Student" />
            <StudentList />
            <AddStudent open={open} setOpen={setOpen} />
        </>
    )
}

export default Staff