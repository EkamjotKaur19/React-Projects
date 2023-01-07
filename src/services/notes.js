import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUserNotes = (userId) =>{
  return axios.get(baseUrl);
}

const getAll = () => {
  console.log('hy')
  
  return axios.get(baseUrl);

}

const getOne = (id ) => {
  return axios.get(`${baseUrl}/${id}`)
}

const create = async newObject => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const delNote = (id, note) => {
  return axios.delete(`${baseUrl}/${id}`, {data : note});
}

const expObj= { getUserNotes, getAll, getOne, create, update, delNote, setToken };
export default expObj;