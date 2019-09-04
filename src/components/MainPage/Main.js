import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllMembers } from '../../actions/membersActions.js'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function MainPage({ members, getAllMembers }) {

  useEffect(() => {
    async function init() {
      const resp = await getAllMembers()
      console.log(resp) // {success:true}
    }
    init()
  }, [getAllMembers])

  const formatPhoneNumber = member => {
    const desc = member.home_phone ? 'Home:' : 'Cell:'
    const num = member.home_phone || member.cell_phone
    return desc + " " + num
  }

  console.log(members)

  return(
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Firstname</TableCell>
            <TableCell variant="head">Lastname</TableCell>
            <TableCell variant="head">Address</TableCell>
            <TableCell variant="head">City</TableCell>
            <TableCell variant="head">State</TableCell>
            <TableCell variant="head">Phone</TableCell>
            <TableCell variant="head">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          members.map((member, idx) => (
            <TableRow key={`member-${idx}`}>
              <TableCell variant="body">{member.first_name}</TableCell>
              <TableCell variant="body">{member.last_name}</TableCell>
              <TableCell variant="body">{member.address}</TableCell>
              <TableCell variant="body">{member.city}</TableCell>
              <TableCell variant="body">{member.state}</TableCell>
              <TableCell variant="body">{formatPhoneNumber(member)}</TableCell>
              <TableCell variant="body">{member.email}</TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      MAIN
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
