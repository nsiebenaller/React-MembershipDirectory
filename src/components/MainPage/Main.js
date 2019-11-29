import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getAllMembers } from '../../actions/membersActions.js';
import { getTags } from '../../actions/tagsActions.js';
import ActionBar from './ActionBar/ActionBar.js';
import DirectoryTable from './DirectoryTable/DirectoryTable.js';
import InfoSection from './InfoSection/InfoSection.js';
import FilterModal from './FilterModal/FilterModal.js';
import './Main.css';

function MainPage({ members, getAllMembers, getTags, history }) {

  useEffect(() => {
    (() => {
      getTags();
      getAllMembers();
    })()
  }, [getTags, getAllMembers]);

  const [state, setVal] = useState({
    filterFn: () => true,
    tagFilter: () => true,
    selectedMember: null,
    isFilterModalOpen: false
  })
  const { filterFn, tagFilter, selectedMember, isFilterModalOpen } = state;
  const setFilter = (filterFn) => setVal({ ...state, filterFn });
  const setTagFilter = (tagFilter) => setVal({ ...state, isFilterModalOpen: false, tagFilter });
  const setSelectedMember = (selectedMember) => setVal({ ...state, selectedMember });
  const setFilterModal = (isOpen) => setVal({ ...state, isFilterModalOpen: isOpen });

  const infoOpen = selectedMember !== null;
  const redirectToNewMember = () => history.push('/app/new_member');
  const openFilterModal = () => setFilterModal(true);
  const membersToRender = members.filter(filterFn).filter(tagFilter);

  return(
    <div className="directory-container">
      <ActionBar
        setFilter={setFilter}
        redirectToNewMember={redirectToNewMember}
        openFilterModal={openFilterModal}
      />
      <div className="directory-display">
        <DirectoryTable
          members={membersToRender}
          history={history}
          infoOpen={infoOpen}
          setSelMember={setSelectedMember}
          selMember={selectedMember}
        />
        <InfoSection
          infoOpen={infoOpen}
          selMember={selectedMember}
          setSelMember={selectedMember}
        />
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        setOpen={setFilterModal}
        setTagFilter={setTagFilter}
      />
    </div>
  )
};

const mapStateToProps = (state) => ({
  members: state.members
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllMembers: () => dispatch(getAllMembers()),
  getTags: () => dispatch(getTags()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
