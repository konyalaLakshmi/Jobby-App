import './index.css'

import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="h">Page Not Found</h1>
      <p className="p">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
