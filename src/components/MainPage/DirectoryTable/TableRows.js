import React from 'react';
import { connect } from 'react-redux';
import {
  TableBody,
  TableCell,
  TableRow,
  Button
} from '@material-ui/core';
import { storeSelectedMember } from '../../../actions/membersActions.js';


function TableRows({ members, order, orderBy, page, rowsPerPage, history, storeSelectedMember, infoOpen, toggleInfoOpen }) {

  const formatPhoneNumber = member => {
    const desc = member.home_phone ? 'Home:' : member.cell_phone ? 'Cell:' : ''
    const num = member.home_phone || member.cell_phone || '-'
    return desc + " " + num
  }

  const redirectToEdit = (member) => (e) => {
    storeSelectedMember(member)
    history.push('/app/edit_member');
  }

  const openInfoSection = () => toggleInfoOpen(true);

  return(
    <TableBody>
    {
      sortMembers(members, order, orderBy)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((member, idx) => (
        <TableRow key={`member-${idx}`}>
          <TableCell variant="body" onClick={openInfoSection}>{member.first_name + " " + member.last_name}</TableCell>
          <TableCell variant="body" className="address-cell">
            <div>{member.address}</div>
            <div>{member.city}, {member.state} {member.zip}</div>
          </TableCell>
          {
            !infoOpen &&
            <TableCell variant="body">{formatPhoneNumber(member)}</TableCell>
          }
          {
            !infoOpen &&
            <TableCell variant="body" className="email-cell">{member.email}</TableCell>
          }
          {
            !infoOpen &&
            <TableCell variant="body"><Button className="edit-btn" onClick={redirectToEdit(member)}>Edit</Button></TableCell>
          }
        </TableRow>
      ))
    }
    </TableBody>
  )
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

function alphaSort(key, order) {
  return (_a, _b) => {
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
}

function numSort(key, order) {
  return (_a, _b) => {
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
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  storeSelectedMember: (member) => dispatch(storeSelectedMember(member))
})

export default connect(() => ({}), mapDispatchToProps)(TableRows)
