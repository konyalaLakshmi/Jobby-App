import './index.css'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', errorOccurred: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({errorMsg: err, errorOccurred: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, errorOccurred} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      ;<Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitFirm}>
          <div className="form-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            className="input"
            id="username"
            onChange={this.onChangeUserName}
            value={username}
            placeholder="Username"
          />
          <br />
          <br />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            className="input"
            id="password"
            onChange={this.onChangePassword}
            value={password}
            placeholder="Password"
          />
          <br />
          <br />
          <button type="submit" className="b">
            Login
          </button>
          {errorOccurred && <p className="p">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
