import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import { getAllMembers } from '../../actions/membersActions.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper
} from '@material-ui/core';
import FilterSection from './FilterSection.js';


function MainPage({ members, getAllMembers }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function init() {
      getAllMembers()
    }
    init()
  }, [getAllMembers])

  const formatPhoneNumber = member => {
    const desc = member.home_phone ? 'Home:' : 'Cell:'
    const num = member.home_phone || member.cell_phone || 'none'
    return desc + " " + num
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return(
    <div className="directory-container">
      <FilterSection />
      <div className="directory-table-container">
      <Paper className="directory-table">
      <Table>
        <TableHead className="sticky-header">
          <TableRow>
            <TableCell variant="head"><div>Name</div></TableCell>
            <TableCell variant="head"><div>Address</div></TableCell>
            <TableCell variant="head"><div>City</div></TableCell>
            <TableCell variant="head"><div>State</div></TableCell>
            <TableCell variant="head"><div>Phone</div></TableCell>
            <TableCell variant="head"><div>Email</div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member, idx) => (
            <TableRow key={`member-${idx}`}>
              <TableCell variant="body">{member.first_name + " " + member.last_name}</TableCell>
              <TableCell variant="body" className="address-cell">{member.address}</TableCell>
              <TableCell variant="body">{member.city}</TableCell>
              <TableCell variant="body">{member.state}</TableCell>
              <TableCell variant="body">{formatPhoneNumber(member)}</TableCell>
              <TableCell variant="body" className="email-cell">{member.email}</TableCell>
            </TableRow>
          ))
        }
        </TableBody>
        <TableFooter className="sticky-footer">
            <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
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
    </div>
  )
};

const mapStateToProps = (state) => ({
  members: state.members
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllMembers: () => dispatch(getAllMembers())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
