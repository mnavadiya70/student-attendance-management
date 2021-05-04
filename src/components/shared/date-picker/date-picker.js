import 'date-fns'
import { Box } from 'theme-ui'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

function DatePicker(props) {
    const {id, name, label, handleDateChange, value} = props

    return (
        <Box sx={{
            '.MuiFormLabel-root': {
                color: 'white'
            },
            '.MuiIconButton-root': {
                color: 'white'
            },
            '.MuiFormLabel-root.Mui-focused': {
                color: 'white'
            },
            '.MuiInputBase-root': {
                color: 'white'
            },
            '.MuiInput-underline:before': {
                borderBottom: '1px solid white'
            },
            '.MuiInput-underline:after': {
                borderBottom: '2px solid white'
            },
            '.MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid white'
            },
            '.MuiPickersToolbar-toolbar': {
                backgroundColor: '#E5BF7D'
            },
            '.MuiPickersDay-daySelected': {
                backgroundColor: '#E5BF7D'
            },
            '.MuiPickersDay-daySelected:hover': {
                backgroundColor: '#E5BF7D'
            },
            '.MuiTypography-colorPrimary': {
                color: '#E5BF7D'
            }
        }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id={id}
                    name={name}
                    label={label}
                    value={value}
                    onChange={(e) => handleDateChange(e)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default DatePicker