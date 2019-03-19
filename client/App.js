import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { 
  Header,
  Main,
} from './components'

import { store } from './store'

import './App.css'
export const App = () => (
  <Provider store={ store }>
    <div className="App">
      <Header />
      <Main />
    </div>
  </Provider>
)