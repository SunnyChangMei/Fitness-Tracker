import React from 'react'
import { connect } from 'react-redux'

import { SingleWorkout } from './SingleWorkout';

import './ListWorkouts.css'
export const DisconnectedListWorkouts = ({ workouts }) => { // deconstruct workouts from passed in props
  return (
    <div id="workouts">
      {workouts.map(workout => (
        <SingleWorkout key={workout.id} workout={workout} />
      ))}
    </div>
  )
}

const mapStateToProps = state => ({ // you could do the same here, too
  workouts: state.workouts
})

export const ListWorkouts = connect(mapStateToProps)(DisconnectedListWorkouts)