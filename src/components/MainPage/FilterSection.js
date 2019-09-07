import React from 'react';
import './FilterSection.css';
import { Paper } from '@material-ui/core'

export default function FilterSection(props) {

  return(
    <div className="filter-section-container">
      <Paper className="filter-section">
        filter section
        <div className="filter-actions">
          actions
        </div>
      </Paper>
    </div>
  )
}
