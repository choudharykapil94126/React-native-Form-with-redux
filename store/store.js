import { createStore } from 'redux';
import arrayReducer from './reducers/arrayReducer';

const store = createStore(arrayReducer);

export default store;