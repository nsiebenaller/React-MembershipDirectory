import axios from 'axios';

export function storeMembers(members) {
  return {
    type: 'STORE_MEMBERS',
    payload: members
  }
}

export function storeSelectedMember(member) {
  return {
    type: 'SELECTED_MEMBER',
    payload: member
  }
}

export function getAllMembers() {
  return async (dispatch) => {
    try {
      const resp = await axios.get('/api/members')
      const members = resp.data.map(member => cleanMember(member));
      dispatch(storeMembers(members))
      return { success: true }
    }
    catch(e) {
      return { success: false }
    }
  }
}

function cleanMember(member) {
  return {
    id: member.id,
    first_name: member.first_name || '',
    last_name: member.last_name || '',
    address: member.address || '',
    city: member.city || '',
    state: member.state || '',
    zip: member.zip || '',
    home_phone: member.home_phone || '',
    cell_phone: member.cell_phone || '',
    email: member.email || '',
    membership_date: member.membership_date || '',
    status: member.status || '',
    birth_day: member.birth_day || '',
    birth_month: member.birth_month || '',
    birth_fullyear: member.birth_fullyear || '',
  }
}

export function create(member) {
  return async (dispatch) => {
    const reply = await axios.post('/api/members/new', member);
    dispatch(getAllMembers())
    return reply
  }
}

export function update(member) {
  return async (dispatch) => {
    const reply = await axios.post('/api/members/update', member);
    dispatch(getAllMembers())
    return reply
  }
}
