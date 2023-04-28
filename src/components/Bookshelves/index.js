import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import BookshelvesTabItems from '../BookshelvesTabItems'
import BooksListPage from '../BooksListPage'
import Footer from '../Footer'
import SearchComponent from '../SearchComponent'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const responseBookStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    activeTabId: bookshelvesList[0].id,
    activeShelfValue: bookshelvesList[0].value,
    booksListFromServer: {},
    searchInput: '',
    bookResponseStatus: responseBookStatus.initial,
    searchInputValue: '',
  }

  componentDidMount() {
    this.getBookShelvesList()
  }

  formatDataBooks = booksList => {
    const formattedData = booksList.map(eachBook => ({
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      id: eachBook.id,
      rating: eachBook.rating,
      readStatus: eachBook.read_status,
      title: eachBook.title,
    }))
    return formattedData
  }

  getBookShelvesList = async () => {
    this.setState({bookResponseStatus: responseBookStatus.inProgress})
    const {activeShelfValue, searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelfValue}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const booksResponse = await fetch(apiUrl, options)
    const booksData = await booksResponse.json()
    if (booksResponse.ok) {
      const formattedBooksData = {
        books: this.formatDataBooks(booksData.books),
        total: booksData.total,
      }
      this.setState({
        booksListFromServer: formattedBooksData,
        bookResponseStatus: responseBookStatus.success,
      })
    } else {
      this.setState({bookResponseStatus: responseBookStatus.failure})
    }
  }

  changeActiveTab = (id, value) => {
    this.setState(
      {activeTabId: id, activeShelfValue: value},
      this.getBookShelvesList,
    )
  }

  changeTheSearchInput = value => {
    this.setState({searchInput: value})
  }

  searchForInputValue = () => {
    const {searchInput} = this.state
    this.setState({searchInputValue: searchInput}, this.getBookShelvesList)
  }

  tryAgainBookList = () => {
    this.getBookShelvesList()
  }

  renderBooksListPage = () => {
    const {booksListFromServer, searchInputValue} = this.state

    if (booksListFromServer.books.length === 0) {
      return (
        <div className="empty-list-book-page-container">
          <img
            src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682605867/book%20hub/Asset_1_1_empty_list_img_p06m9p.png"
            alt="no books"
            className="empty-list-book-page-image"
          />
          <p className="empty-list-book-page-text">
            Your search for {searchInputValue} did not find any matches.
          </p>
        </div>
      )
    }

    return (
      <>
        <ul className="list-display-books-page-container">
          {booksListFromServer.books.map(eachBook => (
            <BooksListPage eachBook={eachBook} key={eachBook.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderFailureBookPage = () => (
    <div className="book-list-page-failure-container">
      <img
        src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682511707/book%20hub/Group_7522_failure_image_n701e6.png"
        alt="failure view"
        className="book-list-page-failure-image"
      />
      <p className="book-list-page-failure-text">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="book-list-page-try-again-button"
        onClick={this.tryAgainBookList}
      >
        Try Again
      </button>
    </div>
  )

  renderBookPageLoadingView = () => (
    <div className="loader-container-book-list-page" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={70} width={70} />
    </div>
  )

  renderParticularView = () => {
    const {bookResponseStatus} = this.state
    switch (bookResponseStatus) {
      case responseBookStatus.success:
        return this.renderBooksListPage()
      case responseBookStatus.failure:
        return this.renderFailureBookPage()
      case responseBookStatus.inProgress:
        return this.renderBookPageLoadingView()

      default:
        return null
    }
  }

  render() {
    const {activeTabId, searchInput} = this.state
    const activeTabObject = bookshelvesList.find(
      eachObject => eachObject.id === activeTabId,
    )
    const booksHeading = activeTabObject.label

    return (
      <div className="bookshelves-main-bg-container">
        <Header />
        <div className="bookshelves-items-main-container">
          <div className="bookshelves-main-inner-container">
            <div className="bookshelves-tab-items-main-container-lg">
              <h1 className="bookshelves-heading">Bookshelves</h1>
              <ul className="bookshelves-tab-list-container">
                {bookshelvesList.map(eachShelf => (
                  <BookshelvesTabItems
                    eachShelf={eachShelf}
                    key={eachShelf.id}
                    isTabActive={eachShelf.id === activeTabId}
                    changeActiveTab={this.changeActiveTab}
                  />
                ))}
              </ul>
            </div>
            <div className="books-list-page-main-container">
              <div className="books-list-page-second-main-container">
                <div className="books-list-page-heading-container">
                  <h1 className="books-list-type-heading">
                    {booksHeading} Books
                  </h1>
                  <SearchComponent
                    changeTheSearchInput={this.changeTheSearchInput}
                    searchForInputValue={this.searchForInputValue}
                    searchInput={searchInput}
                  />
                </div>
                <div className="bookshelves-tab-items-main-container-sm">
                  <h1 className="bookshelves-heading">Bookshelves</h1>
                  <ul className="bookshelves-tab-list-container">
                    {bookshelvesList.map(eachShelf => (
                      <BookshelvesTabItems
                        eachShelf={eachShelf}
                        key={eachShelf.id}
                        isTabActive={eachShelf.id === activeTabId}
                        changeActiveTab={this.changeActiveTab}
                      />
                    ))}
                  </ul>
                </div>
                {this.renderParticularView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
