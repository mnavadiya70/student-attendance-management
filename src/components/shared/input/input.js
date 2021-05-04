import React from 'react'
import { Box, Label, Input, Button, Text } from 'theme-ui'

function InputField(props) {
    const { errorMessage, icon, label, onChange, onIconClick,
        required, type, name, value, min, max, disabled = false } = props

    return (
        <Box
            sx={{
                position: 'relative',
                paddingBottom: ['20px', '28px', '40px'],
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column-reverse',
                    position: 'relative',
                    width: '100%',
                    'input, label': {
                        transition: 'all 0.2s',
                        touchAction: 'manipulation',
                    },
                    'input:placeholder-shown + label ': {
                        transform: [
                            'translateY(17px)',
                            null,
                            null,
                            'translateY(17px)',
                            'translateY(22px)',
                        ],
                        overflow: 'hidden',
                        transformOrigin: 'left bottom',
                        cursor: 'text',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                    'input::-webkit-input-placeholder': {
                        transition: 'inherit',
                        opacity: '0',
                    },
                    'input:focus::-webkit-input-placeholder': {
                        opacity: '1',
                    },
                    'input:not(:placeholder-shown) + label, input:focus + label': {
                        transform: [
                            'translateY(8px)',
                            null,
                            null,
                            'translateY(8px)',
                            'translateY(16px)',
                        ],
                        cursor: 'pointer',
                        fontSize: ['10px', null, null, 0, 0],
                    },
                }}
                css={{
                    'input:-internal-autofill-selected, input:focus:-internal-autofill-selected, input:hover:-internal-autofill-selected': {
                        WebkitTextFillColor: 'white !important',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset  !important',
                    },
                }}
            >
                <Input
                    required={required}
                    type={type}
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder=" "
                    minLength={min}
                    maxLength={max}
                    disabled={disabled}
                    sx={{
                        fontFamily: '"Roboto Mono", Menlo, monospace',
                        fontSize: 0,
                        border: '2px solid',
                        borderColor: '#808080',
                        borderRadius: 0,
                        paddingTop: [
                            '24px',
                            '24px',
                            '24px',
                            '24px',
                            '32px',
                        ],
                        paddingBottom: [
                            '8px',
                            '8px',
                            '8px',
                            '8px',
                            '12px',
                        ],
                        paddingX: '16px',
                        cursor: 'text',
                        color: '#FFFFFF',
                        height: ['50px', null, null, '48px', '64px'],
                        lineHeight: ['16px, null, null, 14px, 16px'],
                        letterSpacing: '1px',
                        textTransform: 'none',
                        '&:focus': {
                            outline: 0,
                            border: '2px solid #ccc',
                        },

                        '&.error': {
                            borderColor: '#F43434',
                        },
                    }}
                />
                <Label
                    sx={{
                        position: 'absolute',
                        top: 0,
                        textTransform: 'uppercase',
                        pointerEvents: 'none',
                        paddingY: 0,
                        paddingX: '16px',
                        fontSize: 0,
                        fontFamily: '"Roboto Mono", Menlo, monospace',
                        lineHeight: '16px',
                        color: '#FFFFFF',
                        letterSpacing: '1px',
                    }}
                >
                    {label}
                </Label>
                {icon && (
                    <Button
                        type="button"
                        sx={{
                            background: 'none',
                            position: 'absolute',
                            right: 0,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            '&:focus': {
                                outline: 0,
                            },
                        }}
                        onClick={onIconClick}
                    >
                        {icon}
                    </Button>
                )}
            </Box>
            {errorMessage && (
                <Text
                    sx={{
                        color: '#F43434',
                        marginTop: '12px',
                        marginBottom: ['20px', '28px', '40px'],
                        height: '32px',
                        fontSize: ['16px', null, null, '14px', '18px'],
                        letterSpacing: '1px',
                    }}
                >
                    {errorMessage}
                </Text>
            )}
        </Box>
    )
}

export default InputField