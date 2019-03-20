import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { createDeleteExerciseThunk } from '../store'

import './SingleExercise.css'
export const DisconnectedSingleExercise = props => {
  const { id, name, duration, completed, description } = props.exercise
  const { deleteExercise } = props

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
          />
          <i 
            className="fas fa-trash"
            onClick={() => deleteExercise(id) }></i>
        </span>
        <h3>{name}</h3>
        <span>{duration} min</span>
      </div>
      <div>{description}</div>
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteExercise: (id) => dispatch(createDeleteExerciseThunk(id))
})

export const SingleExercise = connect(null, mapDispatchToProps)(DisconnectedSingleExercise)