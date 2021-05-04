import { Box, Flex } from 'theme-ui'

import Login from '../components/shared/login'
// import Image from '../static/images/main_page.jpg'

function MainPage() {
    return (
        <Flex
            sx={{
                flexDirection: 'column',
                // backgroundImage: `url("${Image}")`,
                // backgroundRepeat: 'no-repeat'
            }}>
            <h3 style={{ color: "#E5BF7D" }}>Student Attendance Management System</h3>
            <Box
                sx={{
                    alignItems: 'center',
                    flex: 1,
                    margin: 'auto',
                    marginTop: '20px',
                }}>
                <Box
                    sx={{
                        border: '2px solid #E5BF7D',
                        padding: '25px',
                        width: '400px',
                        marginBottom: '10px'
                    }}>
                    <Login />
                </Box>
            </Box>
        </Flex>
    )
}

export default MainPage