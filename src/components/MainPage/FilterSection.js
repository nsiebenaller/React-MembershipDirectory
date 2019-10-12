import React from 'react';
import './FilterSection.css';
import { Paper, Typography, Button } from '@material-ui/core';
// import {
//   Paper,
//   Typography,
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
// } from '@material-ui/core'

export default function FilterSection(props) {

  return(
    <div className="filter-section-container">
      <Paper className="filter-section">
        <Typography variant="subtitle2" className="filter-title">Filters</Typography>
        <div className="filter-body">

          {/*
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <FormGroup>
              <FormControlLabel
                label={'WI'}
                control={
                  <Checkbox
                    checked={true}
                    onChange={(e) => console.log(e)}
                    value="State"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />}
                />
              <FormControlLabel
                label={'WI'}
                control={
                  <Checkbox
                    checked={true}
                    onChange={(e) => console.log(e)}
                    value="State"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />}
                />
            </FormGroup>
          </FormControl>
          */}

        </div>
        <div className="filter-actions">
          <Button variant="contained" color="primary">Filter</Button>
          <Button color="primary">Clear</Button>
        </div>
      </Paper>
    </div>
  )
}
