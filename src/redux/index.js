import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import profileReducer from './reducers/profileReducer';

const store = createStore(profileReducer, composeWithDevTools());

export default store;
