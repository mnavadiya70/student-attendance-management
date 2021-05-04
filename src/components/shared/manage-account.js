import React, { useState } from 'react'
import { Box, Text } from 'theme-ui'
import { useHistory } from 'react-router'
import SharedService from '../../services/shared-service'
import InputField from './input/input'
import Button from './button/button'

function ManageAccount() {

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const [passwordValidationError, setPasswordValidationError] = useState()
    const [passwordMatchError, setPasswordMatchError] = useState()
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(true)

    const { currentPassword, newPassword, confirmNewPassword } = passwords
    const history = useHistory()
    const handleChangePassword = (e) => {
        setDisabled(true)
        const { name, value } = e.target
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

        if (name === "newPassword" && currentPassword && value === currentPassword) {
            setPasswordValidationError("New password must be different from current password")
        }
        else if (name === "newPassword" && !regex.test(value)) {
            setPasswordValidationError("New password must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, 1 special character and at least 8 characters long.")
        }
        else if (name === "confirmNewPassword" && newPassword && value !== newPassword) {
            setPasswordMatchError("Please make sure your new passwords match")
        }
        else {
            setPasswordMatchError("")
            setPasswordValidationError("")
            setDisabled(false)
        }

        setPasswords(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSave = (e) => {
        e.preventDefault()

        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        }

        SharedService.ChangePassword(data)
            .then(res => {
                setMessage("Your Password has been changed successfully")
                setTimeout(() => {
                    setMessage("")
                    history.push('/home')
                }, 5000)
            })
            .catch(error => {
                setMessage(error.message.message)
                setTimeout(() => {
                    setMessage("")
                }, 5000)
            })
    }

    return (
        <Box sx={{
            width: '350px'
        }}>
            {message && (<Text sx={{ color: 'red' }}>{message}</Text>)}
            <InputField name="currentPassword" label="Current Password" type="password" value={currentPassword} onChange={(e) => handleChangePassword(e)} />
            <InputField name="newPassword" label="New Password" type="password" value={newPassword} onChange={(e) => handleChangePassword(e)} errorMessage={passwordValidationError} />
            <InputField name="confirmNewPassword" label="Confirm New Password" type="password" value={confirmNewPassword} onChange={(e) => handleChangePassword(e)} errorMessage={passwordMatchError} />
            <Button type="submit" onClick={(e) => handleSave(e)} text="Change Password" customSx={{ width: '45%' }} disabled={disabled} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="button" onClick={() => history.push('/home')} text="Cancel" customSx={{ width: '45%' }} />
        </Box>
    )
}

export default ManageAccount