import React, { useState, useEffect } from 'react'
import { Box, Text, Button, Radio, Label } from 'theme-ui'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import { IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import StudentService from '../../../services/student-service'
import DivisionService from '../../../services/division-service'
import StandardService from '../../../services/standard-service'
import InputField from '../../shared/input/input'
import SelectField from '../../shared/select/select'
import CustomButton from '../../shared/button/button'

const fields = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rollNo: null,
    dateOfBirth: new Date().toLocaleDateString(),
    mobile: null,
    address: '',
    city: '',
    pincode: null,
    gender: '',
    div: null,
    std: null
}

function AddStudent(props) {
    const [formValues, setFormValues] = useState(fields)

    const { email, firstName, lastName, password, dateOfBirth,
        rollNo, mobile, address, city, pincode, gender, div, std } = formValues

    const [divisions, setDivisions] = useState()
    const [standards, setStandards] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        DivisionService.getDivisions()
            .then(res => {
                setDivisions(res)
            })
            .catch(error => console.log(error))
        StandardService.getStandards()
            .then(res => {
                setStandards(res)
            })
            .catch(error => console.log(error))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'Male' || name === 'Female') {
            setFormValues(prevState => ({
                ...prevState,
                gender: name
            }))
        }
        else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value
            }))
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            rollno: rollNo,
            password: password,
            dateofbirth: new Date(dateOfBirth).toLocaleDateString(),
            mobile: mobile,
            address: address,
            city: city,
            pincode: pincode,
            gender: gender,
            division: div,
            standard: std,
            createddate: new Date(),
            updateddate: new Date()
        }

        StudentService.addStudent(data)
            .then((res) => {
                props.setOpen(false)
                setFormValues(fields)
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
                <h3 style={{ color: "#E5BF7D" }}>Add Student</h3>
                {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
                <form onSubmit={handleSubmit}>
                    <Box>
                        <InputField required={true} type="text" name="firstName" label="First Name" value={firstName} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="text" name="lastName" label="Last Name" value={lastName} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="email" name="email" label="Email Address" value={email} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="number" name="rollNo" label="Roll No" value={rollNo} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="date" name="dateOfBirth" label="Date of Birth" value={dateOfBirth} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="number" min="10" max="10" name="mobile" label="Mobile No" value={mobile} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="text" name="address" label="Address" value={address} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="text" name="city" label="City" value={city} onChange={(e) => handleChange(e)} />
                        <InputField required={true} type="number" min="5" max="9" name="pincode" label="PinCode" value={pincode} onChange={(e) => handleChange(e)} />
                        <Label sx={{
                            color: 'white',
                            paddingBottom: ['20px', '28px', '40px']
                        }}>
                            Gender:
                            <Label>
                                <Radio
                                    name='Male'
                                    value={gender}
                                    onChange={(e) => handleChange(e)}
                                    checked={gender === "Male"}
                                />
                                Male
                            </Label>
                            <Label>
                                <Radio
                                    name='Female'
                                    value={gender}
                                    onChange={(e) => handleChange(e)}
                                    checked={gender === "Female"}
                                />
                                Female
                            </Label>
                        </Label>
                        <SelectField name="std" required={true} onChange={(e) => handleChange(e)} value={std} label="Standard">
                            <option></option>
                            {standards && standards.length > 0 && (
                                standards.map((std, index) => {
                                    return <option key={index} value={std.standard}>{std.standard}</option>
                                })
                            )}
                        </SelectField>
                        <SelectField name="div" required={true} onChange={(e) => handleChange(e)} value={div} label="Division">
                            <option></option>
                            {divisions && divisions.length > 0 && (
                                divisions.map((div, index) => {
                                    return <option key={index} value={div.division}>{div.division}</option>
                                })
                            )}
                        </SelectField>
                        <InputField required={true} type={showPassword ? "text" : "password"} name="password" label="Create default password" value={password} onChange={(e) => handleChange(e)}
                            icon={showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            onIconClick={() => setShowPassword(!showPassword)} />
                        <CustomButton text="Create" type="submit" customSx={{ width: '100%' }} />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default AddStudent