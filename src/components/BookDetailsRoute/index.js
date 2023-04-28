import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const responseBookDetailsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetailsRoute extends Component {
  state = {
    bookDetailsList: {},
    bookDetailsStatus: responseBookDetailsStatus.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  formatDetailsData = detailsData => {
    const formattingData = {
      aboutAuthor: detailsData.about_author,
      aboutBook: detailsData.about_book,
      authorName: detailsData.author_name,
      coverPic: detailsData.cover_pic,
      id: detailsData.id,
      rating: detailsData.rating,
      readStatus: detailsData.read_status,
      title: detailsData.title,
    }
    return formattingData
  }

  getBookDetails = async () => {
    this.setState({bookDetailsStatus: responseBookDetailsStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const bookDetailsResponse = await fetch(apiUrl, options)
    const responseData = await bookDetailsResponse.json()
    if (bookDetailsResponse.ok) {
      const formattedDataDetails = {
        bookDetails: this.formatDetailsData(responseData.book_details),
      }
      this.setState({
        bookDetailsList: formattedDataDetails,
        bookDetailsStatus: responseBookDetailsStatus.success,
      })
    } else {
      this.setState({bookDetailsStatus: responseBookDetailsStatus.failure})
    }
  }

  renderBookDetailsView = () => {
    const {bookDetailsList} = this.state
    const {bookDetails} = bookDetailsList
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails

    return (
      <div className="book-details-page-info-main-container">
        <div className="book-details-page-info-card">
          <div className="book-details-page-book-info-container">
            <img
              src={coverPic}
              alt={title}
              className="book-details-page-cover-pic"
            />
            <div className="book-details-page-title-author-info-container">
              <h1 className="book-details-page-title">{title}</h1>
              <p className="book-details-page-author-name">{authorName}</p>
              <div className="book-details-page-rating-container">
                <p className="book-details-page-rating-text">Avg Rating</p>
                <BsFillStarFill className="book-details-page-rating-icon" />
                <p className="book-details-page-rating">{rating}</p>
              </div>
              <p className="book-details-page-status">
                Status:{' '}
                <span className="book-details-page-status-span">
                  {readStatus}
                </span>
              </p>
            </div>
          </div>
          <hr className="book-details-page-hr-line" />
          <div className="book-details-page-about-author-title-container">
            <h1 className="book-details-page-about-author-heading">
              About Author
            </h1>
            <p className="book-details-page-author-description">
              {aboutAuthor}
            </p>
            <h1 className="book-details-page-about-book-heading">About Book</h1>
            <p className="book-details-page-book-description">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  tryAgainForBookDetails = () => {
    this.getBookDetails()
  }

  renderBookDetailsFailureView = () => (
    <div className="book-details-failure-view-container">
      <img
        src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682511707/book%20hub/Group_7522_failure_image_n701e6.png"
        alt="failure view"
        className="book-details-failure-view-image"
      />
      <p className="book-details-failure-view-text">
        Something went wrong, Please try again.
      </p>
      <button
        className="book-details-failure-view-button"
        type="button"
        onClick={this.tryAgainForBookDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsLoader = () => (
    <div className="book-details-page-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={70} width={70} />
    </div>
  )

  renderParticularView = () => {
    const {bookDetailsStatus} = this.state

    switch (bookDetailsStatus) {
      case responseBookDetailsStatus.success:
        return this.renderBookDetailsView()
      case responseBookDetailsStatus.failure:
        return this.renderBookDetailsFailureView()
      case responseBookDetailsStatus.inProgress:
        return this.renderBookDetailsLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-page-main-container">
        <Header />
        <div className="book-details-page-info-container">
          {this.renderParticularView()}
        </div>
      </div>
    )
  }
}

export default BookDetailsRoute
