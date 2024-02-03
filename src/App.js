import './App.css'

// These are the lists used in the application. You can move them to any component needed.
import {Switch, Redirect, Route} from 'react-router-dom'

import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'

import AllJobs from './components/AllJobs'

import AboutJob from './components/AboutJob'

import NotFound from './components/NotFound'

import LoginForm from './components/LoginForm'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute path="/" component={Home} />
    <ProtectedRoute path="/jobs" component={AllJobs} />
    <ProtectedRoute path="/jobs/:id" component={AboutJob} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
