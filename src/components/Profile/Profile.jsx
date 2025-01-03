import './Profile.css';
import Avatar from '../../assets/dp.jpeg';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Socials from '../Socials/Socials';
import Typewriter from 'typewriter-effect';

const socials = [
    {
        profileLink: "https://linkedin.com/in/rudraksh-rankawat/",
        logo: faLinkedin,
        color: "blue"
    },
    {
        profileLink: "https://x.com/rankawwat",
        logo: faTwitter,
        color: "black"
    },
    {
        profileLink: "https://github.com/rudraksh-rankawat",
        logo: faGithub,
        color: "black"
    }
];
function Profile() {

    return (
        <div className="profile">
            <div className='profile-avatar'>
                <img src={Avatar} alt="Avatar" />
            </div>
            <div className='name-intro'>
                Hi, I am
            </div>
            <div className='name'>
                Rudraksh Rankawat
            </div>
            <div className='profession'>
                I am a{' '}
                <span style={{marginLeft: '10px'}}>
                    <Typewriter
                        options={{
                            strings: ['Software Engineer', 'Tech Enthusiast', 'Product Builder'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </span>
            </div>
            <div className="social-logos">
                {socials.map((social) => (
                    <Socials profileLink={social.profileLink} logo={social.logo} color={social.color} />
                ))}
            </div>
        </div>
    );
}

export default Profile;