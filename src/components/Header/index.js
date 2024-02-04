import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiMail} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="home-header">
        <Link to="/" className="links">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="home-logo"
          />
        </Link>

        <div className="header-items">
          <li>
            <Link to="/" className="links">
              <h1>Home</h1>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="links">
              <h1>Jobs</h1>
            </Link>
          </li>
        </div>
        <li>
          <button type="button" className="home-button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </div>
      <div className="home-header-sm">
        <Link to="/" className="links">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="home-logo-sm"
          />
        </Link>
        <ul className="header-items-sm">
          <Link to="/" className="links">
            <li>
              <AiFillHome size="28" className="header-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="links">
            <li>
              <HiMail size="28" className="header-icon" />
            </li>
          </Link>

          <li onClick={onLogout}>
            <FiLogOut size="30" className="header-icon" />
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
