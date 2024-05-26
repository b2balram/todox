import { getSessionToken } from '@descope/react-sdk';
import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL

export const createTodo = async(todo) => {
    const sessionToken = getSessionToken();
    try {
        return await axios.post(serverUrl, todo, {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + sessionToken,
            }
          })
    } catch (err) {
        console.log(err);
    }
}

export const updateTodo = async(todo) => {
    const sessionToken = getSessionToken();
    try {
        return await axios.put(`${serverUrl}/${todo._id}`, todo, {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + sessionToken,
            }
          })
    } catch (err) {
        console.log(err);
    }
}

export const fetchAll = async (todo) => {
    const sessionToken = getSessionToken();

    try {
        return await axios.get(serverUrl, {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + sessionToken,
            }
          })
    } catch (err) {
        console.log(err);
    }
}