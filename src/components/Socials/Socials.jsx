import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Socials.css'

function Socials({profileLink, logo, color}) {
    return (
        <>
            <div className={`social-logo ${color ? color : "black"}`}>
                {/* linkedin logo with white without fill */}
                <a href={profileLink} target='_blank'>
                    <FontAwesomeIcon className='logo' icon={logo} size="2x" />
                    {/* <img className='logo' src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="linkedin" target="_blank" /> */}
                </a>

            </div>
        </>
    )
}


export default Socials;