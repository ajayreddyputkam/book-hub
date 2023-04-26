import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <div className="footer-icons-container">
      <FaGoogle className="home-footer-social-icon" />
      <FaTwitter className="home-footer-social-icon" />
      <FaInstagram className="home-footer-social-icon" />
      <FaYoutube className="home-footer-social-icon" />
    </div>
    <p className="home-contact-us-footer">Contact Us</p>
  </div>
)

export default Footer
