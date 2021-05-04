import MaterialTable from 'material-table'
import icons from '../icons'

function Table(props) {
    const { columns, data, title, editable } = props
    return (
        <MaterialTable
            title={title}
            icons={icons}
            columns={columns}
            data={data}
            editable={editable}
            options={{
                headerStyle: {
                    fontWeight: 'bolder'
                },
                // filtering: true,
                // selection: true,
                // headerStyle: {
                //     backgroundColor: '#000',
                //     color: '#FFF'
                // },
                // cellStyle:{
                //     backgroundColor: '#000',
                //     color: '#FFF'
                // },
                // rowStyle:{
                //     backgroundColor: '#000',
                //     color: '#FFF'
                // },
                // searchFieldStyle:{
                //     backgroundColor: '#000',
                //     color: '#FFF'
                // },
                // filterCellStyle:{
                //     backgroundColor: '#000',
                //     color: '#FFF'
                // },
            }}
            onSelectionChange={(rows) => console.log(rows)}
            // localization={{
            //     pagination: {
            //         labelDisplayedRows: '{from}-{to} of {count}',
            //     },
            //     toolbar: {
            //         nRowsSelected: '{0} row(s) selected'
            //     },
            //     header: {
            //         actions: ''
            //     },
            //     body: {
            //         emptyDataSourceMessage: 'No records to display',
            //         filterRow: {
            //             filterTooltip: 'Filter'
            //         }
            //     }
            // }}
        />
    )
}

export default Table