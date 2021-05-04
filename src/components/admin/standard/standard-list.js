import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'

import Table from '../../shared/table/table'
import StandardService from '../../../services/standard-service'

function StaffList() {
    const [standard, setStandard] = useState()
    useEffect(() => {
        StandardService.getStandards()
            .then(res => {
                setStandard(res)
            })
            .catch(error => console.log(error))
    }, [])

    const handleDelete = (rowData, resolve) => {
        StandardService.deleteStandard(rowData._id)
            .then(res => {
                let standards = [...standard]
                standards = standards.filter(x => x._id !== rowData._id)
                setStandard(standards)
                resolve()
            })
            .catch(error => console.log(error))
    }

    const columns = [
        { title: 'Standard', field: 'standard' }
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
            <Table data={standard} columns={columns} title="Standards"
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleDelete(oldData, resolve)
                        }),
                }} />
        </Box>
    )
}

export default StaffList