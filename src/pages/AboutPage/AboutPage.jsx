import About from '../../components/About';
import Education from '../../components/Education';
import Interests from '../../components/Interests';
import './AboutPage.css';

function AboutPage() {
    return (
        <div className='about-page'>
            <About />
            <Interests />
            <Education />
        </div>
    );
}

export default AboutPage;