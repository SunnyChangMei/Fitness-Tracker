import React from 'react';
import { connect } from 'react-redux';

import { buildFetchWorkoutsThunk } from '../store';

import { Analytics } from './Analytics';
import { ListWorkouts } from './ListWorkouts';

import './Main.css';

export class DisconnectedMain extends React.Component {
  componentDidMount() {
    this.props.fetchWorkouts();
  }
  // const { workouts } = props;

  render() {
    return (
      <div id="main">
        <Analytics />
        <ListWorkouts />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkouts: () => dispatch(buildFetchWorkoutsThunk())
  };
};

export const Main = connect(
  null,
  mapDispatchToProps
)(DisconnectedMain);
