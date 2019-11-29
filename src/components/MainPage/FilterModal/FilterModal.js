import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Button,
} from '@material-ui/core';

import { getAllTags } from '../../../actions/tagsActions.js';
import './FilterModal.css';

export default function FilterModal({ isOpen, setOpen, setTagFilter }) {

  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setTags] = useState([]);


  useEffect(() => {
    (async () => {
      const { data } = await getAllTags();
      setAllTags(data);
    })()
  }, []);

  const closeModal = () => setOpen(false);
  const handleFilter = () => setTagFilter((member) => member.tags.some(t => selectedTags.includes(t.id)));
  const selectTag = (tagID) => () => setTags(selectedTags.includes(tagID) ? selectedTags.filter(t => t !== tagID) : selectedTags.concat([tagID]));

  return(
    <Dialog open={isOpen} onClose={closeModal} className="filter-modal">
      <DialogTitle>Filter Members</DialogTitle>
      <DialogContent>
        <DialogContentText>Select Tags: ({selectedTags.length} selected)</DialogContentText>
        <div className={'tags-container'}>
        {
          allTags.map((tag, idx) => (
            <Chip
              label={tag.name}
              key={`tag-${idx}`}
              classes={{ root: (selectedTags.includes(tag.id)) ? (tag.colorClass) : ('') }}
              onClick={selectTag(tag.id)}
            />
          ))
        }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>cancel</Button>
        <Button onClick={handleFilter} variant="outlined">filter</Button>
      </DialogActions>
    </Dialog>
  )
}
