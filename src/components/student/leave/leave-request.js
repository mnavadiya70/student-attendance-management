import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Box, Text, Button } from 'theme-ui'
import moment from 'moment'
import { IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import _ from 'lodash'
// import { makeStyles } from '@material-ui/core/styles'
import InputField from '../../shared/input/input'
import CustomButton from '../../shared/button/button'
// import DatePicker from '../../shared/date-picker/date-picker'
import LeaveService from '../../../services/leave-service'

const fields = {
    leaveStartDate: null,
    leaveEndDate: null,
    reason: '',
    duration: null,
    requestedDate: null
}

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//     },
// }));

function LeaveRequest(props) {
    // const classes = useStyles()
    const [formValues, setFormValues] = useState(fields)

    const { leaveStartDate, leaveEndDate, reason, duration, requestedDate } = formValues

    const [errorMessage, setErrorMessage] = useState()
    const history = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        if (!_.isNull(leaveStartDate) && !_.isNull(leaveEndDate)) {
            const endDate = moment(leaveEndDate)
            const startDate = moment(leaveStartDate)
            const diff = endDate.diff(startDate, 'days')
            setFormValues(prevState => ({
                ...prevState,
                duration: diff + 1
            }))
        }
    }, [leaveStartDate, leaveEndDate])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            reason: reason,
            leavestartdate: new Date(leaveStartDate).toLocaleDateString(),
            leaveenddate: new Date(leaveEndDate).toLocaleDateString(),
            status: "Pending",
            duration: duration,
            requesteddate: new Date(requestedDate),
            createddate: new Date(),
            updateddate: new Date()
        }

        LeaveService.addLeave(data)
            .then(res => {
                props.setOpen(false)
                history.push('/home')
            })
            .catch(error => setErrorMessage(error.message.message))

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
                <h3 style={{ color: "#E5BF7D" }}>Leave Request</h3>
                {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
                <form onSubmit={handleSubmit}>
                    <Box sx={{
                        '.MuiFormLabel-root': {
                            color: 'white'
                        },
                        '.MuiInputBase-root': {
                            color: 'white'
                        },
                        '.MuiInput-underline:after': {
                            borderBottom: 'white'
                        },
                        '.MuiInput-underline:before': {
                            borderBottom: 'white'
                        }
                    }}>
                        <InputField required={true} type="text" name="reason" label="Leave Reason" value={reason} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="date" name="leaveStartDate" label="Leave start date" value={leaveStartDate} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="date" name="leaveEndDate" label="Leave end date" value={leaveEndDate} onChange={(e) => handleChange(e)} />
                        <InputField type="text" name="duration" label="Leave Duration" value={duration} disabled={true} />
                        <InputField required={true} type="date" name="requestedDate" label="Leave requested date" value={requestedDate} onChange={(e) => handleChange(e)} />
                        {/* <DatePicker label="Leave Start Date" name="leaveStartDate" id="leaveStartDate" value={leaveStartDate} handleDateChange={handleChange} /> */}
                        {/* <DatePicker label="Leave End Date" value={leaveEndDate} handleDateChange={handleChange} /> */}

                        {/* <Label sx={{color: 'white'}}>Request Date : {requestedDate}</Label> */}
                        <CustomButton text="Create" type="submit" customSx={{ width: '100%' }} />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default LeaveRequest