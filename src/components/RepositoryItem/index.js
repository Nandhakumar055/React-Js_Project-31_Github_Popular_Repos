import './index.css'

const RepositoryItem = props => {
  const {ReposDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = ReposDetails

  return (
    <li className="repos-items">
      <img className="repos-logo-image" src={avatarUrl} alt={name} />
      <h1 className="repos-heading">{name}</h1>
      <div className="repos-other-details-item">
        <div className="repos-other-details">
          <img
            className="repos-other-details-image"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="repos-other-details-users-count">{starsCount} stars</p>
        </div>
        <div className="repos-other-details">
          <img
            className="repos-other-details-image"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="repos-other-details-users-count">{forksCount} forks</p>
        </div>
        <div className="repos-other-details">
          <img
            className="repos-other-details-image"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="repos-other-details-users-count">
            {issuesCount} open issues
          </p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
