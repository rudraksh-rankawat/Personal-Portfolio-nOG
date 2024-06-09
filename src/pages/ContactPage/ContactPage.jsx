import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ContactPage.css'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Socials from '../../components/Socials/Socials';
import { faGithub, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function ContactPage() {
    return (
        <div className='contact-page'>
            <div className='contact-details'>
                <h1>Let's discuss something <span style={{color: '#d53f8c'}}>hot</span> together</h1>
                <div className='contact-information'>
                    <div className="email">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <a href="mailto:rankawatrudraksh@gmail.com">rankawatrudraksh@gmail.com</a>
                    </div>
                    <div className="location">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Bengaluru, India</span>
                    </div>
                </div>
                <div className="socials">
                    <Socials logo={faLinkedin} profileLink='linkedin.com/in/rudraksh-rankawat/' />
                    <Socials logo={faGithub} profileLink='https://github.com/rudraksh-rankawat' />
                    <Socials logo={faTwitter} profileLink='https://x.com/rainy_rudra/' />
                </div>
            </div>
            <div className='contact-form'>
                <h2> Just drop a message</h2>
                <form>
                    <input type="text" placeholder='Name' />
                    <input type="email" placeholder='Email' />
                    <textarea placeholder='Message' />
                    <button type='submit'><FontAwesomeIcon icon={faTelegram} /> Send</button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;