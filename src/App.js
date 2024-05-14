import { useEffect, useState, useMemo } from "react"
import { AgGridReact } from "ag-grid-react"

import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import'ag-grid-community/dist/styles/ag-theme-alpine.css'
import axios from "axios"

function App() {
    const [gridRef, setGridRef] = useState()
    const columnDefs = [
        {
            field: 'id',
            filter: 'agNumberColumnFilter',
        },
        { 
            field: 'name',
            filter: 'agTextColumnFilter',
            filterParams: {
                // pass in additional parameters to the Text Filter
            },
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
    
    useEffect(() => {
        if (gridRef) {
          const dataSource = {
            getRows: (params) => {
              gridRef.showLoadingOverlay();
              
              console.log(params)
              axios.post(`http://localhost:3012/currency/list`, {
                // params: {
                    startRow: params.startRow,
                    endRow: params.endRow,
                    filterModel: params.filterModel,  
                // }
              })
                .then(res => {
                    
                  if (!res.data) {
                    gridRef.showNoRowsOverlay();
                  }
                  else {
                    gridRef.hideOverlay();
                  }
                  params.successCallback(res.data.records, res.data.totalRecords);
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
                    cacheBlockSize={20} // Total Items to be fetched at a time
                    pagination={true}
                    paginationPageSize={5}
                />
            </div>
        </div>
    );
}

export default App;
