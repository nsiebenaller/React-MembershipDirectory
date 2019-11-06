import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { getAllMembers } from '../../actions/membersActions.js';
import SearchBar from './SearchBar.js';
//import FilterSection from './FilterSection.js';
import DirectoryTable from './DirectoryTable/DirectoryTable.js';
import InfoSection from './InfoSection/InfoSection.js';
import './Main.css';

function MainPage({ members, getAllMembers, history }) {

  useEffect(() => {
    (async function fetch() {
      await getAllMembers()
    })()
  }, [getAllMembers]);

  const [filter, setFilter] = useState({ fn: () => true });
  const [infoOpen, toggleInfoOpen] = useState(false);

  const redirectToNewMember = () => history.push('/app/new_member');

  return(
    <div className="directory-container">
      <div className="directory-actions">
        <SearchBar setFilter={setFilter} history={history} />
        <Fab
          className="new-member-btn"
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          onClick={redirectToNewMember}
        >
          <Add />
          <div className="new-member-label">New Member</div>
        </Fab>
      </div>
      <div className="directory-display">
        {/*<FilterSection />*/}
        <DirectoryTable members={members.filter(filter.fn)} history={history} infoOpen={infoOpen} toggleInfoOpen={toggleInfoOpen} />
        <InfoSection infoOpen={infoOpen} />
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  members: state.members
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllMembers: () => dispatch(getAllMembers())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
