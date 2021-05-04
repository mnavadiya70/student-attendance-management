import React, { useState } from 'react'
import StandardList from './standard-list'
import AddStandard from './add-standard'
import Button from './../../shared/button/button'

function Staff() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button type="button" onClick={() => setOpen(true)} text="Add Standard" />
            <StandardList />
            <AddStandard open={open} setOpen={setOpen} />
        </>
    )
}

export default Staff