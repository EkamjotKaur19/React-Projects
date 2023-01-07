import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = () => {
  
  return axios.get(baseUrl);

}

const getOne = (id) => {
  const request=  axios.get(`${baseUrl}/${id}`);
  console.log(request)
  return request.then(response => response.data)
}



const expObj= { getAll, getOne};
export default expObj;