import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsList: [],
    similarList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const api = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(api, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = this.getFormattedData(data.job_details)

      const updatedSimilarList = data.similar_jobs.map(each =>
        this.getFormattedSkillData(each),
      )

      this.setState({
        similarList: updatedSimilarList,
        jobItemDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemFailure = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemSuccess = () => {
    const {jobItemDetailsList, similarList} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobItemDetailsList

    return (
      <div>
        <div className="job-card-view">
          <div className="logo-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobs-logo"
            />
            <div className="title-card">
              <p className="job-title">{title}</p>
              <div className="rating-card">
                <AiFillStar size="18" color="gold" />
                <p className="rating-des">{rating}</p>
              </div>
            </div>
          </div>
          <div className="loc-package-details">
            <div className="loc-employ">
              <HiLocationMarker className="loc-logo" size="18" />
              <p className="location-text">{location}</p>
              <HiMail className="loc-logo" size="18" />
              <p>{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hor-line" />
          <div className="description-card">
            <h1>Description </h1>
            <a href={companyWebsiteUrl} className="visit">
              Visit{' '}
              <span>
                <FaExternalLinkAlt />
              </span>
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skillsCard">
            {skills.map(each => (
              <li key={each.name} className="skills">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-logo"
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="life-at-company">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs </h1>
        <ul className="similar-items">
          {similarList.map(each => (
            <li className="similar-each-card" key={each.id}>
              <div className="logo-cont">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="jobs-logo"
                />
                <div className="title-card">
                  <h1 className="job-title">{each.title}</h1>
                  <div className="rating-card">
                    <AiFillStar size="18" color="gold" />
                    <p className="rating-des">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="similar-job-des">Description</h1>
              <p>{each.jobDescription}</p>
              <div className="loc-employ">
                <HiLocationMarker className="loc-logo" size="18" />
                <p className="location-text">{each.location}</p>
                <HiMail className="loc-logo" size="18" />
                <p>{each.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemSuccess()
      case apiStatusConstants.failure:
        return this.renderJobItemFailure()
      case apiStatusConstants.inprogress:
        return this.renderJobItemLoading()
      default:
        return 'null'
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-view-bg">{this.renderJobItemDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
