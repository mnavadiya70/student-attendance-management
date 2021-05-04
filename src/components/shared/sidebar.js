import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Box } from 'theme-ui'
import { ProSidebar, Menu, MenuItem, } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'

import { FaGem } from 'react-icons/fa'
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { getItem } from '../../helpers/helper'
import Roles from '../../shared/roles'

function SideBar(props) {
    const [menuCollapse, setMenuCollapse] = useState(false)
    let history = useHistory()
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
    }

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    const role = getItem('Role')

    return (
        <Box
            sx={{
                width: '270px'
                // '.pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover': {
                //     color: "#E5BF7D"
                // },
                // 'pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus': {
                //     color: "#E5BF7D"
                // }
            }}
        >
            <ProSidebar collapsed={menuCollapse}>
                <div className="closemenu" onClick={menuIconClick}>
                    {menuCollapse ? (
                        <FiArrowRightCircle />
                    ) : (
                            <FiArrowLeftCircle />
                        )}
                </div>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />} onClick={() => history.push('/home')}>Dashboard</MenuItem>
                    {role === Roles.Admin ? <>
                        <MenuItem onClick={() => history.push('/manage-staff')}>Manage Staff</MenuItem>
                        <MenuItem onClick={() => history.push('/manage-standard')}>Manage Standard</MenuItem>
                        <MenuItem onClick={() => history.push('/manage-division')}>Manage Division</MenuItem>
                        <MenuItem onClick={() => history.push('/manage-student')}>Manage Student</MenuItem>
                        <MenuItem onClick={() => history.push('/leave-reports')}>Leave Reports</MenuItem>
                    </> : null
                    }
                    {role === Roles.Staff ?
                        <>
                            <MenuItem onClick={() => history.push('/manage-attendance')}>Fill Attendance</MenuItem>
                            <MenuItem onClick={() => history.push('/manage-leave')}>Manage Leaves</MenuItem>
                        </> : null
                    }
                    {role === Roles.Student ?
                        <>
                            <MenuItem onClick={() => history.push('/leave-request')}>Leave Request</MenuItem>
                            <MenuItem onClick={() => history.push('/attendance-reports')}>Attendance Reports</MenuItem>
                        </> : null
                    }
                    <MenuItem onClick={() => history.push('/my-account')}>Manage Account</MenuItem>
                    <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default SideBar