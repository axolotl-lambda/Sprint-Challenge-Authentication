import React, { Component } from 'react'
import axios from 'axios'

const initialState = {
  username: '',
  password: '',
  message: ''
}

class Register extends Component {
  state = initialState

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { username, password } = this.state

    axios
      .post(`http://localhost:3300/api/register`, { username, password })
      .then(res => {
        this.setState({ ...initialState, message: res.data })
      })
      .catch(err => {
        this.setState({ ...initialState, message: err.data })
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

export default Register
