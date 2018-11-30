import React, { Component } from 'react'
import { withRouter, Switch, Route, NavLink } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

class App extends Component {
  state = { loggedIn: false, jokes: [] }

  logout = () => console.log('log out')

  render() {
    const { loggedIn, jokes } = this.state
    const { logout } = this

    if (loggedIn) {
      return (
        <div>
          <button onClick={logout}>logout</button>
          <ul>
            {jokes.map(joke => (
              <li>{joke}</li>
            ))}
          </ul>
        </div>
      )
    } else {
      return (
        <div className="App">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </nav>
          <section>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />

              <Route
                exact
                path="/"
                render={() => <p>hi! please register or log in</p>}
              />
            </Switch>
          </section>
        </div>
      )
    }
  }
}

export default withRouter(App)
