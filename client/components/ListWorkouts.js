import React from 'react';
import { connect } from 'react-redux';

import { SingleWorkout } from './SingleWorkout';

import './ListWorkouts.css';

export const DisconnectedListWorkouts = props => {
  const { workouts } = props;
  return (
    <div id="workouts">
      {workouts.map(workout => (
        <SingleWorkout key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     workouts: state.workouts
//   };
// };
const mapStateToProps = state => ({
  workouts: state.workouts
});

export const ListWorkouts = connect(mapStateToProps)(DisconnectedListWorkouts);
