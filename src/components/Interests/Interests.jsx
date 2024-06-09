import { faJava, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faChartSimple, faCode, faCodeCompare, faFileCode, faNetworkWired } from '@fortawesome/free-solid-svg-icons'; // Import the faCode icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Interests.css';

const interests = [
    {
        icon: faFileCode,
        title: "Software Engineering"
    },
    {
        icon: faReact,
        title: "Web Development"
    },
    {
        icon: faJava,
        title: "Java"
    },
    {
        icon: faCodeCompare,
        title: "Git"
    },
    {
        icon: faCode,
        title: "Competitive Programming"
    },
    {
        icon: faPython,
        title: "Python"
    },
    {
        icon: faChartSimple,
        title: "Probability & Statistics"
    },
    {
        icon: faNetworkWired,
        title: "Network Engineering"
    }
    
]

function InterestsCard({icon, title}) {
    return (
        <div className='interest-card'>
            <FontAwesomeIcon icon={icon} className='logo' size="2x" />
            <span className='interest-title'>{title}</span>
        </div>
    );
}

function Interests() {
    return (
        <div className="interest-page">
            <div className='interest'><strong>INTEREST</strong></div>
            <div className='interest-content'>
                {interests.map((interest) => (
                    <InterestsCard icon={interest.icon} title={interest.title} />
                ))}
            </div>
        </div>
    );
}

export default Interests;