import React from 'react'

import { Analytics } from './Analytics'
import { ListWorkouts } from './ListWorkouts'

import './Main.css'
export const Main = () => {
  return (
    <div id="main">
      <Analytics />
      <ListWorkouts />
    </div>
  )
}