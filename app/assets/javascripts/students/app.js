import React from 'react'
import { RouteHandler, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'

import StudentDashboard from './components/StudentDashboard'

class App extends React.Component {
  render() {
    return (
      <RouteHandler {...this.props} />
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/dashboard' component={App}>
      <IndexRoute component={StudentDashboard} />
    </Route>
  </Router>
), document.getElementById('main_container'))
