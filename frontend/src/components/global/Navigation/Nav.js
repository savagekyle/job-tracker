import './Nav.css';

function Nav() {
  return (
    <nav className="jt-nav">
        <div className="container wrapper">
            <div>
                <strong>Job Tracker</strong>
            </div>
            <div>
                <a href="/how-to">How To</a>
                <a href="/my-jobs">My Jobs</a>
                <a href="/our-goal">Our Goal</a>
            </div>
            <a href="/register">
              Register
            </a>
        </div>      
    </nav>
  );
}

export default Nav;