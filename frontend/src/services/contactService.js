import axios from 'axios'

const API_URL = 'http://localhost:3000' // Your backend URL

export async function getContacts() {
  const res = await axios.get(`${API_URL}/contacts`)
  return res.data.result
}

export async function addContact(contact) {
  const res = await axios.post(`${API_URL}/contacts`, contact)
  return res.data.result
}

export async function updateContact(id, contact) {
  return axios.put(`${API_URL}/contacts/${id}`, contact)
}

export async function deleteContact(id) {
  return axios.delete(`${API_URL}/contacts/${id}`)
}
