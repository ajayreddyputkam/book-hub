import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {openHamburger: false}

  openHamburgerMenu = () => {
    this.setState({openHamburger: true})
  }

  closeHamburgerMenu = () => {
    this.setState({openHamburger: false})
  }

  renderHamburgerMenu = (homeItemColorNav, bookshelvesItemColorNav) => (
    <div className="hamburger-main-container-nav">
      <div className="hamburger-items-main-container-nav">
        <div className="hamburger-items-container-nav">
          <ul className="navbar-list-container">
            <Link to="/" className="nav-list-item-link hamburger-link-item-nav">
              <li
                className={`nav-list-item hamburger-list-item-nav ${homeItemColorNav}`}
              >
                Home
              </li>
            </Link>
            <Link
              to="/shelf"
              className="nav-list-item-link hamburger-link-item-nav"
            >
              <li
                className={`nav-list-item hamburger-list-item-nav ${bookshelvesItemColorNav}`}
              >
                Bookshelves
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-button-lg-nav hamburger-logout-button-nav"
            onClick={this.logoutFromAccount}
          >
            Logout
          </button>
        </div>
        <button
          type="button"
          className="cross-icon-button-nav"
          onClick={this.closeHamburgerMenu}
        >
          <img
            src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682420459/book%20hub/Shape_crossicon_rin2vp.svg"
            alt="crossIcon"
            className="cross-icon-nav"
          />
        </button>
      </div>
    </div>
  )

  logoutFromAccount = () => {
    Cookie.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {openHamburger} = this.state

    const {history} = this.props
    const homeItemColorNav =
      history.location.pathname === '/'
        ? 'path-item-colors'
        : 'non-path-item-color'
    const bookshelvesItemColorNav =
      history.location.pathname === '/shelf'
        ? 'path-item-colors'
        : 'non-path-item-color'

    return (
      <>
        <nav className="navbar-main-container">
          <div className="navbar-items-container">
            <Link to="/" className="website-logo-nav-link">
              <img
                src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682336795/book%20hub/Group_7731_logo_ppx5n4.png"
                alt="website logo"
                className="website-logo-nav"
              />
            </Link>
            <div className="navbar-items-list-main-container">
              <ul className="navbar-list-container">
                <Link to="/" className="nav-list-item-link">
                  <li className={`nav-list-item  ${homeItemColorNav}`}>Home</li>
                </Link>
                <Link to="/shelf" className="nav-list-item-link">
                  <li className={`nav-list-item ${bookshelvesItemColorNav}`}>
                    Bookshelves
                  </li>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-button-lg-nav"
                onClick={this.logoutFromAccount}
              >
                Logout
              </button>
            </div>
            <button
              type="button"
              className="hamburger-icon-button-nav-sm"
              onClick={this.openHamburgerMenu}
            >
              <img
                src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682347596/book%20hub/icon_HamIcon_im7kfq.svg"
                alt="hamburger icon"
                className="hamburger-icon-nav-sm"
              />
            </button>
          </div>
        </nav>
        {openHamburger
          ? this.renderHamburgerMenu(homeItemColorNav, bookshelvesItemColorNav)
          : null}
      </>
    )
  }
}

export default withRouter(Header)
