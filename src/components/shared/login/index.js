import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Box, Text, } from 'theme-ui'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import LoginService from '../../../services/login-servce'
import InputField from '../input/input'
import Button from '../button/button'
import { setItem } from '../../../helpers/helper'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        LoginService.signin(data)
            .then((res) => {
                setItem('user', JSON.stringify(res))
                setItem('Role', res.roles[0])
                setItem('token', res.accessToken)
                history.push('/home')
            })
            .catch(error => {
                setErrorMessage(error.message)})
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    return (
        <Box>
            <h3 style={{ color: "#E5BF7D" }}>Login</h3>
            {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
            <form onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: '400px' }}>
                    <InputField required={true} type="email" name="Email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField required={true} type={showPassword ? "text" : "password"} name="Password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        icon={showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        onIconClick={() => setShowPassword(!showPassword)} />
                    <Button type="submit" text="LOG IN"
                        customSx={{
                            width: '100%'
                        }} />
                </Box>
            </form>
        </Box>
    )

}

export default Login