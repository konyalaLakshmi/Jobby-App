import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <ul className="list-container">
        <li className="logo-container">
          <Link to="/" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="links-container">
          <Link to="/" className="link">
            <h1 className="h1">Home</h1>
          </Link>
          <Link to="/jobs" className="link">
            <h1 className="h1">Jobs</h1>
          </Link>
        </li>
        <li className="btn-container">
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
