import React from 'react';
import {
  TableRow,
  TableFooter,
  TablePagination,
  Button
} from '@material-ui/core';
import { exportAll } from '../../../actions/membersActions.js';

export default function TableFoot({ handleChangePage, handleChangeRowsPerPage, rowsPerPage, page, numMembers, infoOpen }) {
  return(
    <TableFooter className="sticky-footer">
      <TableRow>
        <td className="footer-actions MuiTableCell-root MuiTablePagination-root MuiTableCell-footer">
          <div className="MuiToolbar-root MuiToolbar-regular MuiTablePagination-toolbar MuiToolbar-gutters">
            <Button onClick={exportAll}>Export</Button>
          </div>
        </td>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={infoOpen ? 2 : 6}
          count={numMembers}
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
  )
}
