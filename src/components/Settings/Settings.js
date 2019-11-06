import React, { useEffect, useState } from 'react';
import { Typography, Chip } from '@material-ui/core';
import { getAllTags, deleteTag } from '../../actions/tagsActions.js';
import './Settings.css';

export default function Settings(props) {

  const [allTags, setTags] = useState([]);

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
      <Typography variant="h4" component="h4">Tags</Typography>
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
