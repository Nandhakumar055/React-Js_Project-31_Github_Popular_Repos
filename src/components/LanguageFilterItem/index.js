import './index.css'

const LanguageFilterItem = props => {
  const {updateActiveTabId, languageItem, isActive} = props
  const {id, language} = languageItem

  const ActiveTabStyle = isActive
    ? 'language-active-tab-item'
    : 'language-tab-item'

  const onClickLanguageTab = () => {
    updateActiveTabId(id)
  }

  return (
    <button
      className="language-button"
      type="button"
      onClick={onClickLanguageTab}
    >
      <li className={ActiveTabStyle}>{language}</li>
    </button>
  )
}

export default LanguageFilterItem
