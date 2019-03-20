import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createFetchWorkoutsThunk } from '../store'

import { Analytics } from './Analytics'
import { ListWorkouts } from './ListWorkouts'

import './Main.css'
export class DisconnectedMain extends Component {
  componentDidMount() {
    this.props.fetchWorkouts()
  }

  render() {
    return (
      <div id="main">
        <Analytics />
        <ListWorkouts />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWorkouts: () => dispatch(createFetchWorkoutsThunk())
})

export const Main = connect(null, mapDispatchToProps)(DisconnectedMain)