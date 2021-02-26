import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_SAVE_REQUEST,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
} from "./types"
import axios from "axios"

const url = 'https://reqres.in/api/users/'

const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const { data } = await axios.get(url)
    dispatch({ type: USER_LIST_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message })
  }
}

const saveUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SAVE_REQUEST, payload: user });
    if (!user.id) {
      const { data } = await axios.post(url, user);
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        url + user.id,
        user
      );
      dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: USER_SAVE_FAIL, payload: error.message });
  }
};

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { data } = await axios.delete(`${url}${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data.data, success: true });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
};

export { listUsers, saveUser, deleteUser }