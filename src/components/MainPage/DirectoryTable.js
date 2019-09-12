import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  TableSortLabel,
  Button
} from '@material-ui/core';
import './DirectoryTable.css';
import { storeSelectedMember } from '../../actions/membersActions.js';

const alphaSort = (key, order) => (_a, _b) => {
  const a = _a[key] ? _a[key].toUpperCase() : '';
  const b = _b[key] ? _b[key].toUpperCase() : '';

  if(order === 'asc') {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }
  else {
    if (a < b) return 1;
    else if (a > b) return -1;
    return 0;
  }
}

const numSort = (key, order) => (_a, _b) => {
  const a = _a[key];
  const b = _b[key];

  if(order === 'asc') {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }
  else {
    if (a < b) return 1;
    else if (a > b) return -1;
    return 0;
  }
}

function sortMembers(members, order, orderBy) {
  switch(orderBy) {
    case 'Name':
      return members.sort(alphaSort('first_name', order));
    case 'Address':
      return members.sort(alphaSort('address', order));
    case 'City':
      return members.sort(alphaSort('city', order));
    case 'State':
      return members.sort(alphaSort('state', order));
    case 'Phone':
      return members.sort(numSort('home_phone', order));
    case 'Email':
      return members.sort(alphaSort('email', order));
    default:
      return members;
  }
}

function DirectoryTable({ members, history, storeSelectedMember }) {

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

  const formatPhoneNumber = member => {
    const desc = member.home_phone ? 'Home:' : 'Cell:'
    const num = member.home_phone || member.cell_phone || 'none'
    return desc + " " + num
  }

  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }

  const redirectToEdit = (member) => (e) => {
    storeSelectedMember(member)
    history.push('/app/edit_member');
  }

  return(
    <div className="directory-table-container">
    <Paper className="directory-table">
    <Table>
      <TableHead className="sticky-header">
        <TableRow>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'Name'}
              direction={order}
              onClick={setSorting('Name')}
            >
            <div>Name</div>
            </TableSortLabel>
          </TableCell>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'Address'}
              direction={order}
              onClick={setSorting('Address')}
            >
              <div>Address</div>
            </TableSortLabel>
          </TableCell>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'City'}
              direction={order}
              onClick={setSorting('City')}
            >
              <div>City</div>
            </TableSortLabel>
          </TableCell>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'State'}
              direction={order}
              onClick={setSorting('State')}
            >
              <div>State</div>
            </TableSortLabel>
          </TableCell>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'Phone'}
              direction={order}
              onClick={setSorting('Phone')}
            >
              <div>Phone</div>
            </TableSortLabel>
          </TableCell>
          <TableCell variant="head">
            <TableSortLabel
              className="header-label"
              active={orderBy === 'Email'}
              direction={order}
              onClick={setSorting('Email')}
            >
              <div>Email</div>
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              className="header-label"
            >
              <div>Actions</div>
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {
        sortMembers(members, order, orderBy)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((member, idx) => (
          <TableRow key={`member-${idx}`}>
            <TableCell variant="body">{member.first_name + " " + member.last_name}</TableCell>
            <TableCell variant="body" className="address-cell">{member.address}</TableCell>
            <TableCell variant="body">{member.city}</TableCell>
            <TableCell variant="body">{member.state}</TableCell>
            <TableCell variant="body">{formatPhoneNumber(member)}</TableCell>
            <TableCell variant="body" className="email-cell">{member.email}</TableCell>
            <TableCell variant="body"><Button onClick={redirectToEdit(member)}>Edit</Button></TableCell>
          </TableRow>
        ))
      }
      </TableBody>
      <TableFooter className="sticky-footer">
          <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={7}
                count={members.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </TableRow>
        </TableFooter>
    </Table>
    </Paper>
    </div>
  )
}

const mapStateToProps = (state) => {
  return({ })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeSelectedMember: (member) => dispatch(storeSelectedMember(member))
})

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryTable)
