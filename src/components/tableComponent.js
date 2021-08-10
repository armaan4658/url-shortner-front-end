import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {TableDataContext} from './homeComponent.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './table.css'
import { Button, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Link as Connect
  ,useRouteMatch, useHistory
} from "react-router-dom"
axios.defaults.withCredentials = true;

const columns = [
  { id: 'url', label: 'URL', minWidth: 170 },
  {
    id: 'shortUrl',
    label: 'Short URL',
    minWidth: 170,
    align: 'right',
  },
];

function createData(url, shortUrl) {

  return { url, shortUrl };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export function StickyHeadTable() {
  const tableData = useContext(TableDataContext);
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  const rows = tableData.map((ele)=>{
    const data = createData(ele.url,ele.shortUrl);
    return data;
  })

  const openNewTab = (url) => {
    window.open(url,'_blank');
  }
  const {url} = useRouteMatch();
  const history = useHistory();
  const logOut = () => {
    axios.get('https://url-shortner-back-end-ak.herokuapp.com/user/logout')
    .then(res=>{
        if(res.data.message==="green"){
            localStorage.clear();
            history.push('/');
        }
    })
  }
  const ul ={
    display:"flex",
    listStyle:"none",
    margin:"0",
    justifyContent:"space-around",
    background:"#8fbcbc"
  }
  const nav={
    background:"#8fbcbc"
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="table">
      <nav style={nav}>
          <ul style={ul}>
              <li><Connect to={url}><h3>URL</h3></Connect></li>
              <li><Connect to={`${url}/addurl`}><h3>Add Url</h3></Connect></li>
              <li>
                <h3>
                  <Button 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  >
              
                  <MenuIcon />
                  </Button>
                </h3>
              
              <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
              >
                    <MenuItem >
                      <Connect to={`${url}/profile`}>
                        {/* <Button
                        startIcon={PersonIcon}
                        >profile</Button> */}
                        profile
                        
                        <PersonIcon />
                      </Connect>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                      {/* <Button
                      startIcon={ExitToAppIcon}
                      >
                        Logout
                      </Button> */}
                      Logout <ExitToAppIcon/>
                    </MenuItem>
              </Menu>
              </li>
          </ul>
      </nav>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{background:"#4d4d4d",color:"white",minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,ind) =>(
                  <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell key={ind} >
                            {row.url}
                          </TableCell>
                          <TableCell key={ind} align="right">
                            <Link
                            onClick={()=>openNewTab(row.url)}
                            >
                              {row.shortUrl}
                            </Link>
                          </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
