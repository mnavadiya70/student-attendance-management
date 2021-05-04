import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

import Table from '../../shared/table/table'
import DivisionService from '../../../services/division-service'

function StaffList(props) {
    const [divisions, setDivisions] = useState()
    useEffect(() => {
        DivisionService.getDivisions()
            .then(res => {
                setDivisions(res)
            })
    }, [])

    const handleDelete = (rowData, resolve) => {
        DivisionService.deleteDivision(rowData._id)
            .then(res => {
                let updatedDivisions = [...divisions]
                updatedDivisions = updatedDivisions.filter(x => x._id !== rowData._id)
                setDivisions(updatedDivisions)
                resolve()
            })
            .catch(error => console.log(error))
    }

    const columns = [
        {
            title: '', field: '', render: (rowData) => (
                <IconButton
                    onClick={() => {
                        props.setOpen(true)
                        props.setDivId(rowData._id)
                    }}>
                    <EditIcon />
                </IconButton >
            )
        },
        { title: 'Standard', field: 'standard' },
        { title: 'Division', field: 'division' },
        { title: 'Seats', field: 'seat' }
    ]

    return (
        <Box sx={{
            // '.MuiPaper-rounded': {
            //     borderRadius: '0px'
            // },
            // '.MuiPaper-root': {
            //     color: '#FFFFFF',
            //     backgroundColor: '#000000'
            // },
            // '.MTableHeader-header-13': {
            //     backgroundColor: '#000000'
            // },
            // '.MuiTableCell-head': {
            //     color: '#FFFFFF'
            // }
        }}>
            <Table data={divisions} columns={columns} title="Divisions" editable={{
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleDelete(oldData, resolve)
                    })
            }} />
        </Box>
    )
}

export default StaffList