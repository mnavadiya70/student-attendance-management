import React, { useState, useEffect } from 'react'
import { Box, Text } from 'theme-ui'
import DivisionList from './division-list'
import AddDivision from './add-division'
import Button from './../../shared/button/button'
import StandardService from './../../../services/standard-service'

function Staff() {

    const [open, setOpen] = useState(false)
    const [divId, setDivId] = useState()
    const [standards, setStandards] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        StandardService.getStandards()
            .then(res => {
                setStandards(res)
            })
            .catch(error => console.log(error))
    }, [])

    const handleAddDivision = () => {
        if (standards && standards.length > 0) {
            setOpen(true)
        }
        else {
            setErrorMessage("Please add standards first")
            setTimeout(() => {
                setErrorMessage("")
            }, 5000)
        }
    }

    return (
        <>
            {errorMessage && (<Box><Text>{errorMessage}</Text></Box>)}
            <Button type="button" onClick={() => handleAddDivision()} text="Add Division" />
            <DivisionList setOpen={setOpen} setDivId={setDivId} />
            <AddDivision open={open} setOpen={setOpen} standards={standards} divId={divId} setDivId={setDivId} />
        </>
    )
}

export default Staff