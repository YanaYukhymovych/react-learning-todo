import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import ListCreator from './pages/ListCreator/ListCreator'
import MainPage from './pages/MainPage/MainPage'


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/listcreator/:id" component={ListCreator}/>

        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  )
}