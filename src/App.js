import { AgGridReact } from "ag-grid-react"

import'ag-grid-community/dist/styles/ag-grid.css'
// import'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {
    const rowData = [
        {name: 'Honda CD 70', make: 'Honda', model: '2021', price: 100000},
        {name: 'YBR 125G CD 70', make: 'Yamaha', model: '2020', price: 255000},
        {name: 'Honda CG 125', make: 'Honda', model: '2022', price: 200000}
    ]
    const columnDefs = [
        {field: 'name'},
        {field: 'make'},
        {field: 'model'},
        {field: 'price'},
    ]
    
    return (
        // width & height is determined by the same property of parent div
        <div className="ag-theme-alpine" style={{height: 500}}>
            <AgGridReact 
                rowData={rowData}
                columnDefs={columnDefs} />
        </div>
    );
}

export default App;
