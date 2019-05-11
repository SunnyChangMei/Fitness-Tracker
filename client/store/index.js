import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import axios from 'axios';

// ACTION TYPE
const SET_WORKOUTS = 'SET_WORKOUTS';

// ACTION CREATOR MUST EXPORT

export const setWorkoutActionCreator = workouts => ({
  type: SET_WORKOUTS,
  workouts
});
/**
 * Here's the plan: Once the Main component mounts, we dispatch our thunk creator. It'll make a GET request to /api/workouts. Once it receives a response, it dispatches the SET_WORKOUTS action with the data it received.
 */
export const buildFetchWorkoutsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/workouts');
      dispatch(setWorkoutActionCreator(data));
    } catch (e) {
      console.log('ERROR fetching workouts', e);
    }
  };
};

//  set initialState
const initialState = {
  workouts: []
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return { workouts: action.workouts };

    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);
