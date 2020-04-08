import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import './TagModal.css';
import { addTag, removeTag, getAllMembers } from '../../../actions/membersActions.js';

function TagModal({ open, closeModal, getAllMembers, memberName, selectedTags, availTags, setSelTags, selTags, currentTags, memberID }) {

  const addSelTag = (id) => () => setSelTags(selTags.concat([id]));
  const removeSelTag = (id) => () => setSelTags(selTags.filter(x => x !== id));

  const handleUpdateTags = async () => {
    const removeableTags = currentTags.filter(t => availTags.some(a => a.id === t.id));
    const removed = [];
    removeableTags.forEach((t) => {
      removed.push(removeTag(memberID, t.id));
    });

    const addableTags = selectedTags.filter(t => !currentTags.some(a => a.id === t));
    const added = [];
    addableTags.forEach((t) => {
      added.push(addTag(memberID, t.id));
    })

    await Promise.all(removed);
    await Promise.all(added);
    getAllMembers();
    closeModal();
  };

  return(
    <Dialog open={open} onClose={closeModal} className="tags-modal">
      <DialogTitle>Add tag(s) to {memberName}</DialogTitle>
      <DialogContent>
        <DialogContentText>Selected Tags:</DialogContentText>
        <div className="tag-section">
          {
            selectedTags.map((tag, idx) => (
              <Chip
                label={tag.name}
                key={`tag-avail-chip-${idx}`}
                classes={{ root: tag.colorClass }}
                onClick={removeSelTag(tag.id)}
              />
            ))
          }
          { selectedTags.length === 0 && <div className="tags-modal-none">none</div> }
        </div>
        <hr />
        <DialogContentText>Available Tags:</DialogContentText>
        <div className="tag-section">
          {
            availTags.map((tag, idx) => (
              <Chip
                label={tag.name}
                key={`tag-avail-chip-${idx}`}
                classes={{ root: tag.colorClass }}
                onClick={addSelTag(tag.id)}
              />
            ))
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>cancel</Button>
        <Button onClick={handleUpdateTags} variant="outlined">save</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllMembers: () => dispatch(getAllMembers())
})

export default connect(mapStateToProps, mapDispatchToProps)(TagModal)
