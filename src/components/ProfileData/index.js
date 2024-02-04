import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class ProfileData extends Component {
  state = {getProfileData: ' ', profileStatus: profileStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: profileStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        getProfileData: updatedProfileData,
        profileStatus: profileStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: profileStatusConstants.failure})
    }
  }

  renderProfileView = () => {
    const {getProfileData} = this.state
    const {name, shortBio, profileImageUrl} = getProfileData

    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="profile-failure-view">
      <button type="button" className="profile-retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case profileStatusConstants.success:
        return this.renderProfileView()
      case profileStatusConstants.failure:
        return this.renderProfileFailure()
      case profileStatusConstants.inProgress:
        return this.renderProfileLoading()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileDetails()}</div>
  }
}

export default ProfileData
