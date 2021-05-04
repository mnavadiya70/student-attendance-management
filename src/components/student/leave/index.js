import React, { useState } from 'react'
import Leaves from './leaves'
import LeaveRequest from './leave-request'
import Button from './../../shared/button/button'

function Staff() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button type="button" onClick={() => setOpen(true)} text="Add Leave" />
            <Leaves />
            <LeaveRequest open={open} setOpen={setOpen} />
        </>
    )
}

export default Staff