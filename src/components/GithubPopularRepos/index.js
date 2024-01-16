import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRequestGithubRepos()
  }

  updateActiveTabId = tabId => {
    this.setState(
      {
        activeTabId: tabId,
      },
      this.getRequestGithubRepos,
    )
  }

  getRequestGithubRepos = async () => {
    const {activeTabId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updateReposData = fetchedData.popular_repos.map(eachRepos => ({
        name: eachRepos.name,
        id: eachRepos.id,
        issuesCount: eachRepos.issues_count,
        forksCount: eachRepos.forks_count,
        starsCount: eachRepos.stars_count,
        avatarUrl: eachRepos.avatar_url,
      }))

      this.setState({
        repositoryList: updateReposData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderApiFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="error-massage">Something Went Wrong</h1>
    </div>
  )

  renderInProgressView = () => (
    <div data-testid="loader" className="loading-screen-container">
      <Loader
        type="ThreeDots"
        color="rgb(228, 0, 190)"
        height={80}
        width={80}
      />
    </div>
  )

  renderRepositoryListView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-items-route-container">
        {repositoryList.map(eachRepos => (
          <RepositoryItem ReposDetails={eachRepos} key={eachRepos.id} />
        ))}
      </ul>
    )
  }

  renderLanguageFiltersList = () => {
    const {activeTabId} = this.state
    return (
      <ul className="language-tab-list-route-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            updateActiveTabId={this.updateActiveTabId}
            languageItem={eachLanguage}
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryListView()

      case apiStatusConstants.failure:
        return this.renderApiFailureView()

      case apiStatusConstants.inProgress:
        return this.renderInProgressView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-popular-repository-route-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFiltersList()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
