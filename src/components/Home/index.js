import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="p">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the job that fits your ability and potential
        </p>
        <Link className="link" to="/jobs">
          <button
            className="findJobs-btn"
            onClick={onClickFindJobs}
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
