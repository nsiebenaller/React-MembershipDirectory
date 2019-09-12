import React, { useState } from 'react';
import './SearchBar.css';
import { Search, Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function SearchBar({ setFilter }) {

  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);
  const onSearch = () => setFilter({ fn: (member) => {
    return (
      member.first_name.toUpperCase().includes(text.toUpperCase()) ||
      member.last_name.toUpperCase().includes(text.toUpperCase())
    )} })
  const onClear = () => {
    setFilter({ fn: () => true });
    setText('');
  }
  const onEnter = (e) => (e.key === 'Enter') ? (onSearch()) : (null)

  return(
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search by name..."
        value={text}
        onChange={onChange}
        onKeyPress={onEnter}
      />
      <IconButton
        className={`cancel-icon ${text.length > 0 ? 'show' : ''}`}
        onClick={onClear}
      ><Clear /></IconButton>
      <div
        className="search-icon"
        onClick={onSearch}
      ><Search /></div>
    </div>
  )
}
