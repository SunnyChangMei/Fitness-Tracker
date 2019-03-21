import React from 'react'
import { SingleExercise } from './SingleExercise'

import './SingleWorkout.css'
export const SingleWorkout = props => {
  const { name, exercises } = props.workout
  return (
    <div className="box">
      <div className="box-header">
        <h2>{name}</h2>
        <i className="edit-workout fas fa-edit" />
      </div>
      <div className="box-content">
        <ul className="exercise-list">
          {exercises.map(exercise => (
            <li key={exercise.id}>
              <SingleExercise exercise={exercise} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
