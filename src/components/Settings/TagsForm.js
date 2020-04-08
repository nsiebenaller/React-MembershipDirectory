import React from 'react';
import { TextField, Select, MenuItem, Typography, OutlinedInput, Button } from '@material-ui/core';
import './TagsForm.css';
import { createTag } from '../../actions/tagsActions.js';

const colorOptions = [
  '#f44336', //red
  '#9c27b0', //purple
  '#2196f3', //blue
  '#4caf50', //green
  '#ff9800' //orange
];

export default function TagsForm({ isOpen, color, name, setValue, closeForm, retrieveTags }) {

  const setColor = (e) => setValue({ color: e.target.value });
  const setName = (e) => setValue({ name: e.target.value });

  const handleCreateTag = async () => {
    const resp = await createTag({ name: name, color: color });
    if(resp.data.success) closeForm();
    else window.alert("Error creating tag!");
    retrieveTags();
  }

  return(
    <div className={`tags-form-row ${isOpen ? '' : 'tags-form-closed'}`}>
      <div className={"tags-form-container"}>
        <div className="tags-name-input">
          <Typography component="b">Name</Typography>
          <TextField
            variant="outlined"
            value={name}
            onChange={setName}
          />
        </div>


        <div className="tags-color-input">
          <Typography component="b">Color</Typography>
          <Select
            input={<OutlinedInput labelWidth={0} />}
            value={color}
            onChange={setColor}
          >
            {
              colorOptions.map((opt, idx) => (
                <MenuItem key={`color-${idx}`} value={opt}>{opt}</MenuItem>
              ))
            }
          </Select>
        </div>

        <div className={"tags-color-display"}>
          <div className="color-square" style={{ background: color }} />
        </div>

        <Button
          className={"create-tag-btn"}
          variant="outlined"
          color="secondary"
          disabled={name === ''}
          onClick={handleCreateTag}
        >Create</Button>

      </div>
    </div>
  )
}
