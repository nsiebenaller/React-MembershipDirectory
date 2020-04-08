import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Chip
} from '@material-ui/core';
import './InfoSection.css';
import { getAllTags } from '../../../actions/tagsActions.js';
import { removeTag } from '../../../actions/membersActions.js';
import TagModal from './TagModal.js';


export default function InfoSection({ infoOpen, selMember, setSelMember }) {

  const [modalOpen, setModal] = useState(false);
  const [allTags, setTags] = useState([]);
  const [selTags, setSelTags] = useState([]);

  const selectedTags = allTags.filter(t => selTags.some(x => x === t.id));

  const retrieveTags = async () => {
    const resp = await getAllTags();
    const tags = addColorClasses(resp.data);
    setTags(tags);
  }

  useEffect(() => {
    retrieveTags();
  }, []);

  useEffect(() => {
    if(selMember) {
      setSelTags(selMember.tags.map(t => t.id))
    }
  }, [selMember]);

  const style = {
    width: infoOpen ? '400px' : '0px',
    margin: infoOpen ? '30px 60px 60px 15px' : '30px 0px 60px 0px'
  }

  const coloredTags = selMember !== null ? addColorClasses(selMember.tags) : [];
  const availTags = allTags.filter(t => !selectedTags.some(x => x.id === t.id));

  const handleRemoveTag = (tagID) => async() => {
    if(window.confirm("Are you sure you'd like to remove this tag?")) {
      removeTag(selMember.id, tagID)
      const member = selMember;
      member.tags = selMember.tags.filter((tag) => tag.id !== tagID);
      setSelMember(member)
    }
  }

  const handleOpenModal = () => { setModal(true) };
  const handleCloseModal = () => { setModal(false) };

  const memberName = selMember !== null ? `${selMember.first_name} ${selMember.last_name}` : ''

  return(
    <Paper className="info-section" style={style}>
      {
        infoOpen && selMember !== null && (
          <div>
            <Typography className="info-title" variant="h5">{memberName}</Typography>
            <div className="tag-title-section">
              <Typography className="tag-title" variant="subtitle1">Tags</Typography>
              <Button
                className="add-tag-btn"
                variant="outlined"
                color="primary"
                onClick={handleOpenModal}
              >Edit</Button>
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
      <TagModal
        open={modalOpen}
        closeModal={handleCloseModal}
        memberName={memberName}
        selectedTags={selectedTags}
        availTags={availTags}
        selTags={selTags}
        setSelTags={setSelTags}
        currentTags={coloredTags}
        memberID={selMember ? selMember.id : -1}
      />
    </Paper>
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
