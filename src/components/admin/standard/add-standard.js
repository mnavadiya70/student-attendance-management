import React, { useState } from 'react'
import { Box, Text, Button } from 'theme-ui'

import { IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import StandardService from '../../../services/standard-service'
import InputField from '../../shared/input/input'
import CustomButton from '../../shared/button/button'

function AddStandard(props) {
    const [standard, setStandard] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            standard: standard,
            createddate: new Date(),
            updateddate: new Date()
        }

        StandardService.create(data)
            .then((res) => {
                props.setOpen(false)
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
                <h3 style={{ color: "#E5BF7D" }}>Add Standard</h3>
                {errorMessage && (<Text sx={{ color: 'red' }}>{errorMessage}</Text>)}
                <form onSubmit={handleSubmit}>
                    <Box>
                        <InputField required={true} type="number" name="standard" label="Standard" value={standard} onChange={(e) => setStandard(e.target.value)} />
                        <CustomButton text="Create" type="submit" customSx={{ width: '100%' }} />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default AddStandard