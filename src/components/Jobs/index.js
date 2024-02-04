import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import ProfileData from '../ProfileData'

import JobCard from '../JobCard'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, salaryRange} = this.state

    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderEmploymentType = () => (
    <div>
      <h1 className="employment">Type of Employment</h1>
      {employmentTypesList.map(each => {
        const onChangeEmploymentType = () => {
          const type = each.employmentTypeId
          const {employmentType} = this.state
          let updatedList = employmentType
          if (employmentType.includes(type)) {
            updatedList = employmentType.filter(eachType => eachType !== type)
          } else {
            updatedList = [...updatedList, type]
          }
          this.setState({employmentType: updatedList}, this.getJobDetails)
        }
        return (
          <li
            className="each-employ"
            onChange={onChangeEmploymentType}
            key={each.employmentTypeId}
          >
            <input
              type="checkbox"
              className="user-input"
              id={each.employmentTypeId}
            />
            <label htmlFor={each.employmentTypeId} className="label-input">
              {each.label}
            </label>
          </li>
        )
      })}
    </div>
  )

  renderSalaryType = () => {
    const {SalaryRange} = this.state
    return (
      <div>
        <h1 className="employment">Salary Range</h1>
        {salaryRangesList.map(each => {
          const onChangeSalary = () => {
            const salary = each.salaryRangeId
            this.setState({salaryRange: salary}, this.getJobDetails)
          }

          const isChecked = each.salaryRangeId === SalaryRange
          return (
            <li className="each-employ" key={each.salaryRangeId}>
              <input
                type="radio"
                className="user-input"
                onChange={onChangeSalary}
                checked={isChecked}
                id={each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId} className="label-input">
                {each.label}
              </label>
            </li>
          )
        })}
      </div>
    )
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobDetails)
    console.log(event.target.value)
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      console.log('key entered')
      this.setState({searchInput: ''})
    }
  }

  onClickSearchIcon = () => {
    this.setState({searchInput: ''}, this.getJobDetails)
  }

  renderJobsFailureView = () => (
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
        onClick={() => this.getJobDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length > 0) {
      return jobsList.map(each => <JobCard each={each} key={each.id} />)
    }
    return (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderJobsDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return 'null'
    }
  }

  render() {
    const {searchInput} = this.state

    const jwToken = Cookies.get('jwt_token')
    if (jwToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="job-div-1">
            <div className="job-search-input-sm">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearchInput}
                onKeyDown={this.onKeyDown}
                value={searchInput}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                aria-label="Save"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileData />
            <hr className="line-break" />
            {this.renderEmploymentType()}
            <hr className="line-break" />
            {this.renderSalaryType()}
          </div>
          <div className="job-div-2">
            <div className="job-search-input">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearchInput}
                onKeyDown={this.onKeyDown}
                value={searchInput}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                aria-label="Save"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderJobsDetailsList()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
