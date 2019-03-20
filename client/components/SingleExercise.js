import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { createDeleteExerciseThunk, createSetExerciseCompletionThunk } from '../store'

import './SingleExercise.css'
export const DisconnectedSingleExercise = props => {
  const { id, name, duration, completed, description } = props.exercise
  const { deleteExercise, setExerciseCompletion } = props

  return (
    <Fragment>
      <div className="exercise-name">
        <span className="actions">
          <i
            id={`exercise-${id}`}
            className={
              completed
                ? 'toggle-complete fas fa-check-circle'
                : 'toggle-complete far fa-circle'
            }
            onClick={() => setExerciseCompletion(id, !completed) }
          />
          <i 
            className="fas fa-trash"
            onClick={() => deleteExercise(id) } />
        </span>
        <h3>{name}</h3>
        <span>{duration} min</span>
      </div>
      <div>{description}</div>
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteExercise: (id) => dispatch(createDeleteExerciseThunk(id)),
  setExerciseCompletion: (id, completed) => dispatch(createSetExerciseCompletionThunk(id, completed))
})

export const SingleExercise = connect(null, mapDispatchToProps)(DisconnectedSingleExercise)