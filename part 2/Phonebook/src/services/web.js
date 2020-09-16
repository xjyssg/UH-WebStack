import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const deleteRecord = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => console.log("delete!!", response))
}

export default {getAll, create, deleteRecord}