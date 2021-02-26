import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_SAVE_REQUEST,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from '../actions/types';

const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const userSaveReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_SAVE_REQUEST:
      return { loading: true };
    case USER_SAVE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


const userDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export {
  userListReducer, userSaveReducer, userDeleteReducer
};