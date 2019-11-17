import React from 'react';
import { TextField, Select, MenuItem, FormControl, Typography, OutlinedInput, Button } from '@material-ui/core';
import './TagsForm.css';

const colorOptions = [
  '#f44336', //red
  '#9c27b0', //purple
  '#2196f3', //blue
  '#4caf50', //green
  '#ff9800' //orange
];

export default function TagsForm({ color, setValue }) {

  const setColor = (e) => setValue({ color: e.target.value })

  return(
    <div className="tags-form-row">
      <div className={"tags-form-container"}>
        <div className="tags-name-input">
          <Typography component="b">Name</Typography>
          <TextField
            variant="outlined"
            onChange={setColor}
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

        <Button className={"create-tag-btn"} variant="outlined" color="secondary">Create</Button>

      </div>
    </div>
  )
}
