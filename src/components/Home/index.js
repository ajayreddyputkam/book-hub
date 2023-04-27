import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import TopRatedBooksHome from '../TopRatedBooksHome'
import Footer from '../Footer'

import './index.css'

const responseDataStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRatedBooksList: {}, responseStatusTop: responseDataStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  formatBooksData = books => {
    const formattedDataBooks = books.map(eachBook => ({
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      id: eachBook.id,
      title: eachBook.title,
    }))
    return formattedDataBooks
  }

  getTopRatedBooks = async () => {
    this.setState({responseStatusTop: responseDataStatus.inProgress})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        books: this.formatBooksData(data.books),
        total: data.total,
      }
      this.setState({
        topRatedBooksList: formattedData,
        responseStatusTop: responseDataStatus.success,
      })
    } else {
      this.setState({responseStatusTop: responseDataStatus.failure})
    }
  }

  sendRequestAgain = () => {
    this.getTopRatedBooks()
  }

  render() {
    const {topRatedBooksList, responseStatusTop} = this.state
    return (
      <div className="home-main-bg-container">
        <div className="home-header-main-container">
          <Header />
          <div className="home-items-main-container">
            <div className="home-items-inner-container">
              <h1 className="home-main-heading">
                Find Your Next Favorite Books?
              </h1>
              <p className="home-description">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/shelf" className="find-books-home-link">
                <button type="button" className="find-books-button-home-sm">
                  Find Books
                </button>
              </Link>
              <div className="home-top-rated-books-main-container">
                <div className="top-rated-heading-container-home">
                  <h1 className="home-top-rated-heading">Top Rated Books</h1>
                  <Link to="/shelf" className="find-books-home-link">
                    <button type="button" className="home-find-books-button">
                      Find Books
                    </button>
                  </Link>
                </div>
                <TopRatedBooksHome
                  topRatedBooksList={topRatedBooksList}
                  responseStatusTop={responseStatusTop}
                  sendRequestAgain={this.sendRequestAgain}
                />
              </div>
            </div>
          </div>
        </div>
        {responseStatusTop === responseDataStatus.success ? <Footer /> : null}
      </div>
    )
  }
}

export default Home
