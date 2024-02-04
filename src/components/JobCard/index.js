import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'

import './index.css'

const JobCard = props => {
  const {each} = props

  return (
    <ul>
      <Link to={`/jobs/${each.id}`} className="links">
        <div className="jobs-view-bg">
          <div className="logo-cont">
            <img
              src={each.companyLogoUrl}
              alt="company logo"
              className="jobs-logo"
            />
            <div className="title-card">
              <p className="job-title">{each.title}</p>
              <div className="rating-card">
                <AiFillStar size="18" color="gold" />
                <p className="rating-des">{each.rating}</p>
              </div>
            </div>
          </div>
          <div className="loc-package-details">
            <div className="loc-employ">
              <HiLocationMarker className="loc-logo" size="18" />
              <p className="location-text">{each.location}</p>
              <HiMail className="loc-logo" size="18" />
              <p>{each.employmentType}</p>
            </div>
            <p className="package">{each.packagePerAnnum}</p>
          </div>
          <hr className="hor-line" />
          <h1 className="desc-heading">Description</h1>
          <p className="job-description">{each.jobDescription}</p>
        </div>
      </Link>
    </ul>
  )
}

export default JobCard
