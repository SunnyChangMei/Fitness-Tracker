import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import axios from 'axios'

export const initialState = {
  workouts: [],
}

const SET_WORKOUTS = "SET_WORKOUTS"

const setWorkoutsActionCreator = workouts => ({
  type: SET_WORKOUTS,
  workouts
})

export const createFetchWorkoutsThunk = function () {
  return async dispatch => {
    const { data } = await axios.get('/workouts')
    dispatch(setWorkoutsActionCreator(data))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (SET_WORKOUTS): {
      return {
        workouts: [...action.workouts]
      }
    }
    default: {
      return state
    }
  }
}

export const store = createStore(reducer, applyMiddleware(thunk))
