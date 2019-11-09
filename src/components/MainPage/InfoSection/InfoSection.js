import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Chip
} from '@material-ui/core';
import './InfoSection.css';
import { createTag } from '../../../actions/tagsActions.js';
import { addTag, removeTag } from '../../../actions/membersActions.js';


export default function InfoSection({ infoOpen, selMember, setSelMember }) {

  const style = {
    width: infoOpen ? '400px' : '0px',
    margin: infoOpen ? '30px 60px 60px 15px' : '30px 0px 60px 0px'
  }

  //createTag({ name: 'Admin', color: '#2196f3' })
  //(106, 7);

  let coloredTags = selMember !== null ? addColorClasses(selMember.tags) : [];

  const handleRemoveTag = (tagID) => async() => {
    // TODO: Add confirmation to remove tag
    const resp = removeTag(selMember.id, tagID)
    const member = selMember;
    member.tags = selMember.tags.filter((tag) => tag.id !== tagID);
    setSelMember(member)
  }

  return(
    <Paper className="info-section" style={style}>
      {
        infoOpen && selMember !== null && (
          <div>
            <Typography className="info-title" variant="h5">{selMember.first_name} {selMember.last_name}</Typography>
            <div className="tag-title-section">
              <Typography className="tag-title" variant="subtitle1">Tags</Typography>
              <Button className="add-tag-btn" variant="outlined" color="primary">Add</Button>
            </div>
            <div className="tag-body-section">
              {
                coloredTags.map((tag, idx) => (
                  <Chip
                    label={tag.name}
                    key={`tag-chip-${idx}`}
                    classes={{ root: tag.colorClass }}
                    onDelete={handleRemoveTag(tag.id)}
                  />
                ))
              }
              {
                coloredTags.length === 0 && <div className="no-tags-text">no tags for user</div>
              }
            </div>
          </div>
        )
      }
    </Paper>
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
