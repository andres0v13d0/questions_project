import { FaEnvelope, FaPhone, FaViber, FaGooglePlusG, FaFacebookSquare, FaFacebookMessenger, FaTwitter, FaSkype } from 'react-icons/fa';
import "../App.css";

function Header() {
    return (
        <header className="site-header">
            <div className="top-header">
                <div className="container">
                    <div className="top-header-left">
                        <div className="top-header-block mail">
                            <a href="mailto:info@educationpro.com" itemProp="email">
                                <FaEnvelope id='mail-ico'/> info@educationpro.com
                            </a>
                        </div>
                        <div className="top-header-block phone">
                            <a href="tel:+9779813639131" itemProp="telephone">
                                <FaPhone  id='phone-ico'/> +977 9813639131
                            </a>
                        </div>
                    </div>
                    <div className="top-header-right">
                        <div className="social-block">
                            <ul className="social-list">
                                <li><a href="#"><FaViber /></a></li>
                                <li><a href="#"><FaGooglePlusG /></a></li>
                                <li><a href="#"><FaFacebookSquare /></a></li>
                                <li><a href="#"><FaFacebookMessenger /></a></li>
                                <li><a href="#"><FaTwitter /></a></li>
                                <li><a href="#"><FaSkype id='skype'/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
  }
  
  export default Header;