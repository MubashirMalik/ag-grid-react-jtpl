import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { AgGridReact } from "ag-grid-react"

import'ag-grid-community/dist/styles/ag-grid.css'
// import'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {
    const [rowData, setRowData] = useState([])
    const gridRef = useRef()

    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model', filter: true},
        {field: 'price', sortable: true}
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), [])

    const cellClickedListener = useCallback((e) => {
        console.log("Cell clicked", e)
    })

    const pushMeClicked = useCallback(e => {
        gridRef.current.api.deselectAll()
    })

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);
    
    return (
        // width & height is determined by the same property of parent div
        <div className="ag-theme-alpine" style={{height: 500}}>
            <AgGridReact 
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs} 
                defaultColDef={defaultColDef} 
                animateRows={true} 
                rowSelection="multiple" 
                onCellClicked={cellClickedListener}
            />
            <button onClick={pushMeClicked}>Deselect All</button>
        </div>
    );
}

export default App;
