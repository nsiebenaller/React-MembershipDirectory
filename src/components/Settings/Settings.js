import React, { useEffect, useState } from 'react';
import { Typography, Chip, Button, Fab } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { getAllTags, deleteTag, createTag } from '../../actions/tagsActions.js';
import './Settings.css';
import TagsForm from './TagsForm.js';

export default function Settings(props) {

  const [allTags, setTags] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);
  const [tagsForm, setTagsForm] = useState({ name: '', color: '#2196f3' });
  const setValue = (param) => setTagsForm({ ...tagsForm, ...param });

  useEffect(() => {
    (async() => {
      const resp = await getAllTags();
      const tags = addColorClasses(resp.data);
      setTags(tags);
    })();
  }, []);

  const handleDeleteTag = (tagID) => async () => {
    const resp = await deleteTag(tagID);
    if(resp.data.success) {
      const resp = await getAllTags();
      const tags = addColorClasses(resp.data);
      setTags(tags);
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

      {
        formOpen &&
        <TagsForm color={tagsForm.color} setValue={setValue} />
      }

      <div className="tags-container">
      {
        allTags.map((tag, idx) => (
          <Chip
            key={`tag-id-${idx}`}
            label={tag.name}
            classes={{ root: tag.colorClass }}
            onClick={handleDeleteTag(tag.id)}
          />
        ))
      }
      </div>

    </div>

  )
}

function addColorClasses(tags) {
  const colorClasses = {};
  return tags.map((tag) => {
    if(!colorClasses[tag.color] && !document.getElementById(tag.color)) {
      var element  = document.createElement("style");
      element.id = tag.color ; // so you can get and alter/replace/remove later
      element.innerHTML = ".custom-color-" + tag.id + " { background:" + tag.color + "; color: white; }" ; // css rule
      var header = document.getElementsByTagName("HEAD")[0] ;
      header.appendChild(element);
      colorClasses[tag.color] = "custom-color-" + tag.id;
      tag.colorClass = "custom-color-" + tag.id;
      return tag;
    } else {
      tag.colorClass = colorClasses[tag.color];
      return tag;
    }
  })
}
