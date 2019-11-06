import axios from 'axios';

export function getAllTags() { return axios.get('/api/tags'); }

export function deleteTag(tagID) { return axios.post('/api/tags/delete', { tagID: tagID }) }
