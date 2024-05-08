import { useEffect, useState, useMemo } from "react"
import { AgGridReact } from "ag-grid-react"

import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {
    const [gridRef, setGridRef] = useState()
    const columnDefs = [
        {
            field: 'id'
        },
        { 
            field: 'name'
        },
        {
            field: 'symbol', 
        },
        {
            field: 'exchangeRate',
        }
    ]

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), [])

    // useEffect(() => {
    //     fetch(`http://localhost:3012/currency/?startRow=${startRow}&endRow=${startRow+10}`, {
    //     })
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, [startRow]);
    
    useEffect(() => {
        if (gridRef) {
          const dataSource = {
            getRows: (params) => {
              gridRef.showLoadingOverlay();
              const startRow = params.startRow;
              const endRow = params.endRow;
              fetch(`http://localhost:3012/currency/?startRow=${startRow}&endRow=${endRow}`)
                .then(resp => resp.json())
                .then(res => {
                    
                  if (!res) {
                    gridRef.showNoRowsOverlay();
                  }
                  else {
                    gridRef.hideOverlay();
                  }
                  params.successCallback(res.records, res.totalRecords);
                }).catch(err => {
                  gridRef.showNoRowsOverlay();
                  params.successCallback([], 0);
                });
            }
          }
     
          gridRef.setDatasource(dataSource);
        }
      }, [gridRef]);
    

    return (
        // width & height is determined by the same property of parent div
        <div style={{ margin: '50px'}}>
            <div className="ag-theme-alpine" style={{height: 300}}>
                <AgGridReact 
                    onGridReady={(params) => setGridRef(params.api)}
                    rowData={[]}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef} 
                    animateRows={true} 
                    rowModelType="infinite"
                    serverSideInfiniteScroll={true}
                    cacheBlockSize={30} // Total Items to be fetched at a time
                    pagination={true}
                    paginationPageSize={5}
                />
            </div>
        </div>
    );
}

export default App;
