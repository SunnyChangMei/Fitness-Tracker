import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

// ACTION TYPE
const SET_WORKOUTS = 'SET_WORKOUTS';
const DELETE_EXERCISE = 'DELETE_EXERCISE';
const UPDATE_EXERCISE = 'UPDATE_EXERCISE';

// ACTION CREATOR no need to export because they use in thunk axios fetch
const setWorkoutActionCreator = workouts => ({
  type: SET_WORKOUTS,
  workouts
});

// don't use deleteExerciseActionCreator, make it simple
const deleteExercise = id => ({
  type: DELETE_EXERCISE,
  id
});

const updateExerciseActionCreator = (id, completed) => ({
  type: UPDATE_EXERCISE,
  id,
  completed
});
/**
 * Here's the plan: Once the Main component mounts, we dispatch our thunk creator. It'll make a GET request to /api/workouts. Once it receives a response, it dispatches the SET_WORKOUTS action with the data it received.
 */
export const buildFetchWorkoutsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/workouts');
      dispatch(setWorkoutActionCreator(data));
    } catch (err) {
      console.log('ERROR fetching workouts', err);
    }
  };
};

export const deleteExerciseThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/exercises/${id}`);
      dispatch(deleteExercise(id));
    } catch (err) {
      return console.log('Error! id not found', err);
    }
  };
};

export const updateExerciseThunk = (id, completed) => {
  return async dispatch => {
    try {
      await axios.patch(`/api/exercises/${id}`, {
        // must match route.patch : updatedFields req.body
        updatedFields: { completed }
      });
      dispatch(updateExerciseActionCreator(id, completed));
    } catch (err) {
      console.log('Error, cannot update.', err);
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
    case SET_WORKOUTS: {
      return {
        workouts: [...action.workouts]
      };
    }

    case DELETE_EXERCISE: {
      const nextWorkouts = state.workouts.map(workout => {
        if (workout.exercises.find(exercise => exercise.id === action.id)) {
          return {
            ...workout,
            exercises: workout.exercises.filter(
              exercise => exercise.id !== action.id
            )
          };
        } else {
          return workout;
        }
      });

      return {
        workouts: nextWorkouts
      };
    }

    case UPDATE_EXERCISE: {
      const nextWorkouts = state.workouts.map(workout => {
        if (workout.exercises.find(exercise => exercise.id === action.id)) {
          return {
            // gotta update the completion status of that one exercise
            ...workout,
            exercises: workout.exercises.map(exercise => {
              if (exercise.id === action.id) {
                return { ...exercise, completed: action.completed };
              } else {
                return exercise;
              }
            })
          };
        } else {
          // just leave it alone
          return workout;
        }
      });

      return {
        workouts: nextWorkouts
      };
    }

    default: {
      return state;
    }
  }
};

// CREATE STORE
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);
