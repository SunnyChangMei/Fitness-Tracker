import React from 'react';
import { connect } from 'react-redux';

import './Analytics.css';

export const DisconnectedAnalytics = ({
  minuteExercised,
  favoriteExercise,
  percentCompleted
}) => (
  <div id="analytics">
    <div className="box">
      <h2 className="box-header">Analytics</h2>
      <div className="box-content">
        <table className="analytics-table">
          <tbody>
            <tr className="analytics-table-row">
              <td className="analytics-name">Total Minutes Exercised:</td>
              <td id="total-exercised">{minuteExercised}</td>
            </tr>
            <tr className="analytics-table-row">
              <td className="analytics-name">Favorite Exercise:</td>
              <td>{favoriteExercise}</td>
            </tr>
            <tr className="analytics-table-row">
              <td className="analytics-name">Percentage Completed:</td>
              <td id="percentage-completed">{percentCompleted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const collectExercisesFromWorkouts = workouts => {
  return workouts.reduce(
    (exercises, workout) => [...exercises, ...workout.exercises],
    []
  );
};

const countMinutesSpentExercising = exercises => {
  return exercises.reduce((minutes, exercise) => {
    if (exercise.completed) return minutes + exercise.duration;
    return minutes;
  }, 0);
};

const calculateFavoriteExercise = exercises => {
  const countObj = {};
  let maxCount = 0;
  let currentVictor = null;
  
  exercises.forEach(exercise => {
    countObj[exercise.name] = countObj[exercise.name]
      ? countObj[exercise.name] + 1
      : 1;

    if (countObj[exercise.name] > maxCount) {
      maxCount = countObj[exercise.name];
      currentVictor = exercise.name;
    }
  });
  return currentVictor;
};

const calculatePercentCompleted = exercises => {
  if (exercises.length) {
    return Math.round(
      (100 * exercises.filter(exercise => exercise.completed).length) /
        exercises.length,
      2
    );
  }
  return 100;
};

const mapStateToProps = state => {
  const exercises = collectExercisesFromWorkouts(state.workouts);

  return {
    minuteExercised: countMinutesSpentExercising(exercises),
    favoriteExercise: calculateFavoriteExercise(exercises),
    percentCompleted: calculatePercentCompleted(exercises)
  };
};

export const Analytics = connect(
  mapStateToProps,
  null
)(DisconnectedAnalytics);
