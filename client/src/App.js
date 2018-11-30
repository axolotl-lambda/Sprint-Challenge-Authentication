import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Switch, Route, NavLink } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

class App extends Component {
  state = { loggedIn: false, jokes: [] }

  authenticate = () => {
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: token
      }
    }

    if (token) {
      axios
        .get(`http://localhost:3300/api/jokes`, options)
        .then(res => this.setState({ loggedIn: true, jokes: res.data }))
        .catch(err => console.log(err))
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false, jokes: [] })
    this.props.history.push('/')
  }

  componentDidMount() {
    this.authenticate()
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location

    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate()
    }
  }

  render() {
    const { loggedIn, jokes } = this.state
    const { logout } = this

    if (loggedIn) {
      return (
        <div>
          <button onClick={logout}>logout</button>
          <ul>
            {jokes.map(({ setup, punchline }) => (
              <li>
                <p>SETUP: {setup}</p>
                <p>PUNCHLINE: {punchline}</p>
              </li>
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
