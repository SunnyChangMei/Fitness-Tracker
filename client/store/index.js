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

export const buildFetchWorkoutsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/workouts')
      dispatch(setWorkoutsActionCreator(data))
    } catch (err) {
       console.log('ERROR fetching workouts', err)
    }
  }
}

const REMOVE_EXERCISE = "REMOVE_EXERCISE"

const removeExerciseActionCreator = id => ({
  type: REMOVE_EXERCISE,
  id
})

export const buildDeleteExerciseThunk = (id) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/exercises/${id}`)
      dispatch(removeExerciseActionCreator(id))
    } catch (err) {
      console.log(`ERROR deleting exercise with id ${id}`, err)
    }
  }
}

const UPDATE_EXERCISE_COMPLETION = "UPDATE_EXERCISE_COMPLETION"

const updateExerciseCompletionActionCreator = (id, completed) => ({
  type: UPDATE_EXERCISE_COMPLETION,
  id,
  completed
})

export const buildUpdateExerciseCompletionThunk = (id, completed) => {
  return async dispatch => {
    try {
      await axios.patch(`/api/exercises/${id}`, { updatedFields: { completed } })
      dispatch(updateExerciseCompletionActionCreator(id, completed))
    } catch (err) {
      console.log(`ERROR setting completion to ${completion} on exercise with id ${id}`, err)
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
    case (UPDATE_EXERCISE_COMPLETION): {
      const nextWorkouts = state.workouts.map(workout => {
        if (workout.exercises.find(exercise => exercise.id === action.id)) {
          return { // gotta update the completion status of that one exercise
            ...workout,
            exercises: workout.exercises.map(exercise => {
              if (exercise.id === action.id) {
                return { ...exercise, completed: action.completed }
              } else {
                return exercise
              }
            })
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
