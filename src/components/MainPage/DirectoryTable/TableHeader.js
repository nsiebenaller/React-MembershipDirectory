import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

export default function TableHeader({ setSorting, order, orderBy, infoOpen }) {

  return(
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
        {
          !infoOpen &&
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
        }
        {
          !infoOpen &&
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
        }
        {
          !infoOpen &&
          <TableCell>
            <TableSortLabel
              className="header-label"
            >
              <div>Actions</div>
            </TableSortLabel>
          </TableCell>
        }
      </TableRow>
    </TableHead>
  )
}
