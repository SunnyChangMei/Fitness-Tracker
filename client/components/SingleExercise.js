import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { deleteExerciseThunk, updateExerciseThunk } from '../store';
import './SingleExercise.css';
// remove export SingleExercise, use export default at the end
export const DisconnectedSingleExercise = props => {
  const { deleteExercise, updateExercise } = props;
  const { id, name, duration, completed, description } = props.exercise;

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
            onClick={() => {
              updateExercise(id, !completed);
            }}
          />
          <i
            className="fas fa-trash delete"
            onClick={() => {
              deleteExercise(id);
            }}
          />
        </span>
        <h3>{name}</h3>
        <span>{duration} min</span>
      </div>
      <div>{description}</div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteExercise: id => dispatch(deleteExerciseThunk(id)),
  updateExercise: (id, completed) =>
    dispatch(updateExerciseThunk(id, completed))
});

export const SingleExercise = connect(
  null,
  mapDispatchToProps
)(DisconnectedSingleExercise);
