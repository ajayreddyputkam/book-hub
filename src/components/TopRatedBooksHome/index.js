import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 500,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const responseDataStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const TopRatedBooksHome = props => {
  const {topRatedBooksList, sendRequestAgain, responseStatusTop} = props

  const renderBooksPage = () => (
    <div className="slick-container">
      <Slider {...settings}>
        {topRatedBooksList.books.map(eachBook => {
          const {id, authorName, title, coverPic} = eachBook
          return (
            <Link
              to={`/books/${id}`}
              key={id}
              className="link-top-rated-home-container"
            >
              <div className="top-rated-book-item-container">
                <img
                  src={coverPic}
                  alt={eachBook.title}
                  className="top-rated-item-image"
                />
                <h1 className="top-rated-book-title-home">{title}</h1>
                <p className="top-rated-book-author-home">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
    </div>
  )

  const resendRequestTopServer = () => {
    sendRequestAgain()
  }

  const renderFailureView = () => (
    <div className="top-rated-home-failure-container">
      <img
        src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682511707/book%20hub/Group_7522_failure_image_n701e6.png"
        alt="failure view"
        className="top-rated-image-failure"
      />
      <p className="top-rated-failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="top-rated-try-again-button-failure"
        onClick={resendRequestTopServer}
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div testid="loader" className="loader-top-rated-home-container">
      <Loader type="TailSpin" color="#0284C7" height={70} width={70} />
    </div>
  )

  const displayParticularPage = () => {
    switch (responseStatusTop) {
      case responseDataStatus.success:
        return renderBooksPage()
      case responseDataStatus.failure:
        return renderFailureView()
      case responseDataStatus.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <div className="top-rated-book-main-container">
      {displayParticularPage()}
    </div>
  )
}

export default TopRatedBooksHome
