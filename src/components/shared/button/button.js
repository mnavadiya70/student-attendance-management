import React from 'react'
import { Box, Text, Button } from 'theme-ui'

function CustomButton(props) {
    const { type, text, customSx, onClick, disabled } = props
    return (
        <Button
            sx={{
                minHeight: ['50px', null, null, '48px', '64px'],
                borderRadius: 0,
                background: 'transparent',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: 0,
                position: 'relative',
                overflow: 'hidden',
                px: '8px',
                width: '200px',
                bg: 'transparent',
                cursor: disabled ? 'inherit' : 'pointer',
                border: '2px solid #E5BF7D',
                ':focus': {
                    outline: 0,
                },
                '.button-overlay': {
                    transition: '.5s transform ease, .3s opacity ease',
                    transform: 'translate3d(100%,0,0) skew(-25deg)',
                },
                ':hover  .button-overlay': {
                    transform: 'translate3d(-10%, 0, 0) skew(-25deg)',
                    color: '#E5BF7D',
                },
                ...customSx
            }}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            <Box
                className="button-overlay"
                sx={{
                    background: '#E5BF7D',
                    top: 0,
                    left: 0,
                    width: '120%',
                    height: '100%',
                    zIndex: '0',
                    pointerEvents: 'none',
                    position: 'absolute',
                    filter: 'blur(2px)',
                    display: 'block',
                    fontWeight: 'bold'
                }}
            />
            <Text
                variant="mono"
                sx={{
                    zIndex: '1',
                    color: '#FFFFFF',
                    display: 'inline-block',
                    boxSizing: 'inherit',
                    position: 'relative',
                }}
            >
                {text}
            </Text>
        </Button>
    )
}

export default CustomButton