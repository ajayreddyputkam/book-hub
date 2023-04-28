import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      src="https://res.cloudinary.com/dgfrvvyjg/image/upload/v1682679831/book%20hub/Group_7484_notfound_image_rzacso.png"
      alt="not found"
      className="not-found-page-image"
    />
    <h1 className="not-found-page-heading">Page Not Found</h1>
    <p className="not-found-page-text">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="not-found-link">
      <button type="button" className="not-found-page-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
