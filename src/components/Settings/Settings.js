import React, { useEffect, useState } from 'react';
import { Typography, Chip, Button, Fab } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { getAllTags, deleteTag } from '../../actions/tagsActions.js';
import './Settings.css';
import TagsForm from './TagsForm.js';

export default function Settings(props) {

  const [allTags, setTags] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);
  const [tagsForm, setTagsForm] = useState({ name: '', color: '#2196f3' });
  const setValue = (param) => setTagsForm({ ...tagsForm, ...param });

  const retrieveTags = async () => {
    const resp = await getAllTags();
    const tags = addColorClasses(resp.data);
    setTags(tags);
  }

  useEffect(() => {
    retrieveTags();
  }, []);

  const handleDeleteTag = (tagID) => async () => {
    if(window.confirm("Are you sure you'd like to delete this tag?")) {
      const resp = await deleteTag(tagID);
      if(resp.data.success) {
        retrieveTags();
      }
    }
  }

  return(
    <div className="settings-container">
      <div className="header-container">
        <Typography variant="h4" component="h4">Tags</Typography>
        {
          formOpen &&
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            className="tag-action-btn"
            onClick={closeForm}
          >
            <Close />
          </Fab>
        }
        {
          !formOpen &&
          <Button
            className="tag-action-btn"
            variant="contained"
            color="primary"
            onClick={openForm}
          >Add</Button>
        }
      </div>

      <TagsForm
        isOpen={formOpen}
        color={tagsForm.color}
        name={tagsForm.name}
        setValue={setValue}
        closeForm={closeForm}
        retrieveTags={retrieveTags}
      />

      <div className="tags-container">
        {console.log(allTags)}
      {
        allTags.map((tag, idx) => (

          <Chip
            key={`tag-id-${idx}`}
            label={tag.name}
            classes={{ root: tag.colorClass }}
            onDelete={handleDeleteTag(tag.id)}
          />
        ))
      }
      </div>

    </div>

  )
}

function addColorClasses(tags) {
  const colorMap = {
    '#f44336': 'cc-red',
    '#9c27b0': 'cc-purple',
    '#2196f3': 'cc-blue',
    '#4caf50': 'cc-green',
    '#ff9800': 'cc-orange'
  }

  return tags.map((tag) => ({ ...tag, colorClass: colorMap[tag.color] }));
}
