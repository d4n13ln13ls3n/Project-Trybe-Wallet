import { SET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
