import React, { useState } from 'react'
import StaffList from './staff-list'
import AddStaff from './add-staff'
import Button from './../../shared/button/button'

function Staff() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button type="button" onClick={() => setOpen(true)} text="Add Staff Member" />
            <StaffList />
            <AddStaff open={open} setOpen={setOpen} />
        </>
    )
}

export default Staff