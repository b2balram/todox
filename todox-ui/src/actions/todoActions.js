import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL

export const createTodo = async(todo) => {
    try {
        return await axios.post(serverUrl, todo)
    } catch (err) {
        console.log(err);
    }
}

export const fetchAll = async (todo) => {
    try {
        return await axios.get(serverUrl)
    } catch (err) {
        console.log(err);
    }
}