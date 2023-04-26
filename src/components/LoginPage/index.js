import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', responseStatus: true, errorMsg: ''}

  noteTheUsername = event => {
    this.setState({username: event.target.value})
  }

  noteThePassword = event => {
    this.setState({password: event.target.value})
  }

  successView = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  checkTheUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const userResponse = await fetch(url, options)
    const data = await userResponse.json()
    if (userResponse.ok) {
      this.successView(data.jwt_token)
    } else {
      this.setState({responseStatus: false, errorMsg: data.error_msg})
    }
  }

  render() {
    const {responseStatus, errorMsg} = this.state

    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const renderErrorMsg = () => <p className="error-msg-login">{errorMsg}</p>

    return (
      <div className="login-page-bg-container">
        <img
          src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682336816/book%20hub/Rectangle_1467_1_sf1bor.png"
          alt="website login"
          className="login-page-image-lg"
        />
        <img
          src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682336777/book%20hub/Ellipse_99_1sm_jrgq0n.png"
          alt="website login"
          className="login-page-image-sm"
        />
        <div className="login-page-form-main-container">
          <form
            className="login-page-form-container"
            onSubmit={this.checkTheUserDetails}
          >
            <img
              src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682336795/book%20hub/Group_7731_logo_ppx5n4.png"
              alt="login website logo"
              className="login-page-website-logo"
            />
            <div className="login-page-username-input-container">
              <label
                htmlFor="usernameInput"
                className="login-page-username-label"
              >
                Username*
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                id="usernameInput"
                className="username-input-login-page"
                onChange={this.noteTheUsername}
              />
            </div>
            <div className="login-page-password-input-container">
              <label
                htmlFor="passwordInput"
                className="login-page-password-label"
              >
                Password*
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                id="passwordInput"
                className="password-input-login-page"
                onChange={this.noteThePassword}
              />
            </div>
            {responseStatus ? null : renderErrorMsg()}
            <button type="submit" className="login-page-login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
