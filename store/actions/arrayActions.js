// actions/arrayActions.js
import { ADD_TO_ARRAY } from './types';
import { UPDATE_TO_ARRAY } from './types';

export const addToArray = (item) => ({
  type: ADD_TO_ARRAY,
  payload: item,
});

export const updateToArray = (data, index) => ({
  type: UPDATE_TO_ARRAY,
  payload: { data, index },
})
