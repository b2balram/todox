import { getSessionToken } from '@descope/react-sdk';
import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${getSessionToken()}`;
  return req;
});

export const createTodo = async(todo) => {
    try {
        return await API.post("", todo)
    } catch (err) {
        console.log(err);
    }
}

export const updateTodo = async(todo) => {
    try {
        return await API.put(`/${todo._id}`, todo)
    } catch (err) {
        console.log(err);
    }
}

export const cancelTodo = async(todo) => {
    try {
    return await API.put(`/${todo._id}`, {...todo, status: 2})
    } catch (err) {
        console.log(err);
    }
}

export const deleteTodo = async(todo) => {
  try {
  return await API.delete(`/${todo._id}`)
  } catch (err) {
      console.log(err);
  }
}

export const fetchAll = async (todo) => {
    try {
        return await API.get("")
    } catch (err) {
        console.log(err);
    }
}