import {BsSearch} from 'react-icons/bs'

import './index.css'

const SearchComponent = props => {
  const {searchInput, searchForInputValue, changeTheSearchInput} = props

  const changeTheSearchInputText = event => {
    changeTheSearchInput(event.target.value)
  }

  const searchForInputValueText = () => {
    searchForInputValue()
  }

  return (
    <div className="search-bar-container">
      <input
        type="search"
        placeholder="Search"
        value={searchInput}
        className="search-bar"
        onChange={changeTheSearchInputText}
      />
      <button
        type="button"
        testid="searchButton"
        className="search-icon-button"
        onClick={searchForInputValueText}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchComponent
