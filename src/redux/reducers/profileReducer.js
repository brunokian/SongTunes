import { SEND_PROFILE_DATA } from '../actions';

const INITIAL_STATE = {
  loginInformation: {
    name: '',
    email: '',
    descricao: '',
    image: '',
  },
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_PROFILE_DATA:
    return {
      ...state,
      loginInformation: action.payload,
    };
  default:
    return state;
  }
};

export default profileReducer;
