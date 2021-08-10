import React, {  useState,useEffect } from "react";
import {
    Switch,
    Route,useRouteMatch
} from "react-router-dom"
import {StickyHeadTable} from './tableComponent.js';
import {Profile} from './profileComponent.js';
import {AddUrl} from './addUrlComponent.js';
import {Edit} from './editComponent.js';
import axios from "axios";
export const TableDataContext = React.createContext(null);
export const SetTableDataContext = React.createContext(null);
export const GetTableDataContext = React.createContext(null);

export const HomeComponent = () => {
    const [tableData,setTableData] = useState([]);
    const {path} = useRouteMatch();

    const getTableData = () => {
        axios.get(`https://url-shortner-back-end-ak.herokuapp.com/url/get/${localStorage.getItem("_id")}`,{withCredentials:true})
        .then(res=>{
            if(res.data){
                setTableData(res.data)
            }
        })
        .catch(res=>console.log(res))
    }

    try{
        useEffect(getTableData,[])
    }catch(e){
        console.log(e);
    }
    return(
        <>
            
            <Switch>
                <TableDataContext.Provider value={tableData}>
                    <SetTableDataContext.Provider value={setTableData}>
                        <GetTableDataContext.Provider value={getTableData}>
                            <Route exact path={path}>
                                {tableData?(
                                    tableData.length>0?(
                                        <StickyHeadTable/>
                                    ):(
                                        <p>No data to display</p>
                                    )
                                    
                                ):(
                                    <p></p>
                                )}
                                
                            </Route>
                            <Route path={`${path}/addurl`}>
                                <AddUrl />
                            </Route>
                            <Route path={`${path}/profile`}>
                                <Profile />
                            </Route>
                            <Route path={`${path}/edit`}>
                                <Edit />
                            </Route>
                        </GetTableDataContext.Provider>
                    </SetTableDataContext.Provider>
                </TableDataContext.Provider>
            </Switch>
        </>
    )
}