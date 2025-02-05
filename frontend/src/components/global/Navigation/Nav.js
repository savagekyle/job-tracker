import './Nav.css';
import { logoutUser } from "../../../authService";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Nav() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user on login/logout
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      setUser(null); // Clear user state on logout
      window.location.href = "/";
    } else {
      console.error(response.error);
    }
  };

  return (
    <nav className="jt-nav">
        <div className="container wrapper">
            <div>
                <a href="/">
                  <strong>Job Tracker</strong>
                </a>
            </div>
            <div>
                <a href="/how-to">How To</a>
                <a href="/my-jobs">My Jobs</a>
                <a href="/our-goal">Our Goal</a>
            </div>
            {user ? (
                <a className="register" href='/' onClick={handleLogout}>
                  Logout
                </a>
                ) : (
                  <a className="register" href="/register">
                    Register
                  </a>
                )
            }
        </div>      
    </nav>
  );
}

export default Nav;