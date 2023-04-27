import './index.css'

const BookshelvesTabItems = props => {
  const {eachShelf, isTabActive, changeActiveTab} = props
  const {id, value, label} = eachShelf

  const activeTabStyle = isTabActive ? 'selected-tab-background' : ''

  const changeTheTab = () => {
    changeActiveTab(id, value)
  }

  return (
    <li className="bookshelf-list-item-tab">
      <button
        type="button"
        className={`bookshelf-tab-item-button ${activeTabStyle}`}
        onClick={changeTheTab}
      >
        {label}
      </button>
    </li>
  )
}

export default BookshelvesTabItems
