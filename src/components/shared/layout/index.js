import React from 'react'
import { Box } from 'theme-ui'
import SideBar from '../sidebar'

function Layout(props) {
    return (
        <main>
            <SideBar />
            <Box sx={{
                marginLeft: '270px',
                position: 'fixed',
                top: 0,
                paddingLeft: '10px',
                width: '-webkit-fill-available'
            }}>
                {props.children}
            </Box>
        </main>
    )
}

export default Layout