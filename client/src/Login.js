import React, { Component } from 'react'
import axios from 'axios'

const initialState = {
  username: '',
  password: '',
  message: ''
}

class Login extends Component {
  state = initialState

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios
      .post(`http://localhost:3300/api/login`, this.state.user)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({ ...this.state, message: err })
      })
  }

  render() {
    const { username, password, message } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {message && <h4>{message}</h4>}
      </div>
    )
  }
}

export default Login
