import React, { useState } from 'react';
import {
  Table,
  Paper,
} from '@material-ui/core';
import './DirectoryTable.css';
import TableHeader from './TableHeader.js';
import TableRows from './TableRows.js';
import TableFoot from './TableFoot.js';


export default function DirectoryTable({ members, history, infoOpen, toggleInfoOpen }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const setSorting = (key) => (e) => {
    if(orderBy === key && order === 'asc') setOrder('desc');
    else if(orderBy === key && order === 'desc') setOrderBy('');
    else {
      setOrder('asc');
      setOrderBy(key);
    }
  }

  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }

  return(
    <div className={`directory-table-container ${infoOpen ? 'info-sec-open' : ''}`}>
      <Paper className="directory-table">
        <Table>
          <TableHeader
            setSorting={setSorting}
            order={order}
            orderBy={orderBy}
            infoOpen={infoOpen}
          />
          <TableRows
            members={members}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            history={history}
            infoOpen={infoOpen}
            toggleInfoOpen={toggleInfoOpen}
          />
          <TableFoot
            numMembers={members.length}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            infoOpen={infoOpen}
          />
        </Table>
      </Paper>
    </div>
  )
}
