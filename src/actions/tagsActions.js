import axios from 'axios';

const colorMap = {
  '#f44336': 'cc-red',
  '#9c27b0': 'cc-purple',
  '#2196f3': 'cc-blue',
  '#4caf50': 'cc-green',
  '#ff9800': 'cc-orange'
}

export function storeTags(tags) {
  return {
    type: 'STORE_TAGS',
    payload: tags,
  }
}

export async function getAllTags() {
  const resp = await axios.get('/api/tags');
  resp.data = resp.data.map((tag) => ({ ...tag, colorClass: colorMap[tag.color] }))
  return resp;
}

export function getTags() {
  return async (dispatch) => {
    try {
      const resp = await axios.get('/api/tags');
      resp.data = resp.data.map((tag) => ({ ...tag, colorClass: colorMap[tag.color] }));
      dispatch(storeTags(resp.data));
      return { success: true }
    } catch(e) {
      return { success: false }
    }
  }
}

export function deleteTag(tagID) { return axios.post('/api/tags/delete', { tagID: tagID }) }

export function createTag(tag) { return axios.post('/api/tags/new', { name: tag.name, color: tag.color }) }
