import './About.css';
import profilePic from '../../assets/Profile-About-Pic.jpeg';

function About() {
    return (
        <div className="about-page">
            <div className='about'><strong>ABOUT</strong></div>
            <div className='about-content'>
                <img src={profilePic} alt="profile" />
                <div className='about-text'>
                    <h1>👋 Hey there</h1>    
                    <p>
                    I'm Rudraksh, a dedicated software developer with a passion for Web Development. I excel in creating seamless user experiences and robust backend solutions. With a strong problem-solving mindset, I thrive on crafting elegant code that drives meaningful impact. Continuously exploring new tools and techniques, I stay at the forefront of the ever-evolving tech landscape.






                    </p>

                    <p>
                    📫 Open to collaborations and exciting projects, I'm eager to connect with fellow developers and tech enthusiasts. Let's build something amazing together!
                    <p>
                        Happy coding!!!! 🖥️
                    </p>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;