import React, { useState } from 'react';
import { Add, FilterList } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import './ActionBar.css';
import SearchBar from './SearchBar.js';


export default function ActionBar({ setFilter, redirectToNewMember, openFilterModal }) {

  const [text, setText] = useState('');

  return(
    <div className="action-bar">
      <SearchBar
        setFilter={setFilter}
        setText={setText}
        text={text}
      />
      <Fab
        className="filter-btn"
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        onClick={openFilterModal}
      >
        <FilterList />
        <div className="filter-label">Filter</div>
      </Fab>
      <Fab
        className="new-member-btn"
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        onClick={redirectToNewMember}
      >
        <Add />
        <div className="new-member-label">New Member</div>
      </Fab>
    </div>
  )
}
