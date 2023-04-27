import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BooksListPage = props => {
  const {eachBook} = props
  const {authorName, coverPic, id, rating, readStatus, title} = eachBook

  return (
    <Link to={`/books/${id}`} className="book-page-list-link">
      <li className="book-page-list-item">
        <img src={coverPic} alt={title} className="book-page-cover-pic-image" />
        <div className="book-list-title-author-details-container">
          <h1 className="book-list-page-title">{title}</h1>
          <p className="book-list-page-author-name">{authorName}</p>
          <div className="book-list-page-rating-container">
            <p className="book-list-page-rating-text">Avg Rating</p>
            <BsFillStarFill className="book-list-page-rating-icon" />
            <p className="book-list-page-rating-number">{rating}</p>
          </div>
          <p className="book-list-page-read-status">
            Status :{' '}
            <span className="read-status-span-book-page-list">
              {readStatus}
            </span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BooksListPage
