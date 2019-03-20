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

export const createFetchWorkoutsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/workouts')
      dispatch(setWorkoutsActionCreator(data))
    } catch (e) {
       console.log('ERROR fetching workouts', e)
    }
  }
}

const REMOVE_EXERCISE = "REMOVE_EXERCISE"

const removeExerciseActionCreator = id => ({
  type: REMOVE_EXERCISE,
  id
})

export const createDeleteExerciseThunk = (id) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/exercises/${id}`)
      dispatch(removeExerciseActionCreator(id))
    } catch (e) {
      console.log(`ERROR deleting exercise with id ${id}`, e)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (SET_WORKOUTS): {
      return {
        workouts: [...action.workouts]
      }
    }
    case (REMOVE_EXERCISE): {
      const nextWorkouts = state.workouts.map(workout => {
        if (workout.exercises.find(exercise => exercise.id === action.id)) {
          return { // gotta remove that exercise from the exercises in this workout
            ...workout,
            exercises: workout.exercises.filter(exercise => exercise.id !== action.id)
          }
        } else { // just leave it alone
          return workout
        }
      })

      return {
        workouts: nextWorkouts
      }
    }
    default: {
      return state
    }
  }
}

export const store = createStore(reducer, applyMiddleware(thunk))
