import Profile from "../../components/Profile";
import './Homepage.css';
import '../../components/Socials'

function HomePage() {
    return (
      <div className="home">
        <div className="profile-holder">
          <Profile />
        </div>
      </div>
    );
  }


export default HomePage;