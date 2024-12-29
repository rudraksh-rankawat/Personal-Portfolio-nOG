import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div id="nav-heading">
               Rudraksh Rankawat
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                {/* <a href="">Skills</a>
                <a href="">Projects</a>
                <a href="">Experience</a>
                <a href="">Blogs</a> */}
                <a href="/contact">Contact</a>
                {/* <a href="">Resume</a> */}
            </div>
        </nav>
    );
}

export default Navbar;