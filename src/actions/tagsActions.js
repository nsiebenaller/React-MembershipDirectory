import axios from 'axios';

export async function getAllTags() {
  const resp = await axios.get('/api/tags');
  const colorMap = {
    '#f44336': 'cc-red',
    '#9c27b0': 'cc-purple',
    '#2196f3': 'cc-blue',
    '#4caf50': 'cc-green',
    '#ff9800': 'cc-orange'
  }
  resp.data = resp.data.map((tag) => ({ ...tag, colorClass: colorMap[tag.color] }))
  return resp;
}

export function deleteTag(tagID) { return axios.post('/api/tags/delete', { tagID: tagID }) }

export function createTag(tag) { return axios.post('/api/tags/new', { name: tag.name, color: tag.color }) }
