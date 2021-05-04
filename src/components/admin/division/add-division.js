import React, { useState, useEffect } from 'react'
import { Box, Text, Button } from 'theme-ui'

import { IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import InputField from '../../shared/input/input'
import SelectField from '../../shared/select/select'
import CustomButton from '../../shared/button/button'
import DivisionService from '../../../services/division-service'
import { DataUsageRounded } from '@material-ui/icons'

const fields = {
    division: '',
    standard: null,
    seat: null
}

function AddDivision(props) {
    const [data, setData] = useState()
    const [formValues, setFormValues] = useState(fields)

    const [standards, setStandards] = useState()

    const { division, standard, seat } = formValues

    const [errorMessage, setErrorMessage] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        setStandards(props.standards)
    }, [])

    useEffect(() => {
        setFormValues(fields)
    }, [props.open])

    useEffect(() => {
        const { divId } = props
        if (divId !== null) {
            DivisionService.getDivision(divId)
                .then((res) => {
                    setFormValues(prevState => ({
                        ...prevState,
                        division: res.division,
                        standard: res.standard,
                        seat: res.seat
                    }))
                })
                .catch(error => setErrorMessage(error.message.message))
        }
    }, [props.divId])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            division: division,
            standard: standard,
            seat: seat,
            updateddate: new Date()
        }
        if (props.divId) {
            DivisionService.updateDivision(props.divId, data)
                .then((res) => {
                    props.setOpen(false)
                    props.setDivId(null)  
                })
                .catch(error => setErrorMessage(error.message.message))
        }
        else {
            data = {
                ...data,
                assigned: false,
                createddate: new Date()
            }
            DivisionService.create(data)
                .then((res) => {
                    props.setOpen(false)
                    props.setDivId(null)
                })
                .catch(error => setErrorMessage(error.message.message))
        }

        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    return (
        <Modal
            isOpen={props.open}
            closeTimeoutMS={500}
            style={{
                content: {
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    background: '#111517',
                    border: 'none',
                    borderRadius: 0,
                    display: 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                },
                overlay: { zIndex: 2000 },
            }}
        >
            {/* CLOSE BUTTON */}
            <Button
                onClick={() => {
                    props.setOpen(false)
                    props.setDivId(null)
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
                <h3 style={{ color: "#E5BF7D" }}>Add Division</h3>
                {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
                <form onSubmit={handleSubmit}>
                    <Box>
                        <SelectField required={true} name="standard" label="Standard" value={standard} onChange={(e) => handleChange(e)}>
                            <option></option>
                            {standards && standards.length > 0 && (
                                standards.map((std, index) => {
                                    return <option key={index} value={std.standard}>{std.standard}</option>
                                })
                            )}
                        </SelectField>
                        <InputField required={true} type="text" name="division" label="Division" value={division} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="number" name="seat" label="No of seats" value={seat} onChange={(e) => handleChange(e)} />
                        <CustomButton text="Create" type="submit" customSx={{ width: '100%' }} />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default AddDivision