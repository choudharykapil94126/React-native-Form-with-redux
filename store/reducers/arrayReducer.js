// reducers/arrayReducer.js
import { ADD_TO_ARRAY, UPDATE_TO_ARRAY } from '../actions/types';

const initialState = {
  array: [],
};

const arrayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ARRAY:
      return {
        ...state,
        array: [...state.array, action.payload],
      };
      case UPDATE_TO_ARRAY:
        const { data, index } = action.payload;
        const updatedArray = [...state.array]; // Create a copy of the array
        updatedArray[index] = data; // Update the value at the specified index
        console.log("reducer->>>>>>>>")

        return {
          ...state,
          array: updatedArray

        };
      default:
        return state;
  }
};

export default arrayReducer;