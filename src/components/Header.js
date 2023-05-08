// import react and react-router-dom
import { useContext, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import sign out and authentication from firebase
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

// import authentication context and css atyle
import { AuthContext } from '../context/AuthContext';
import styles from './Header.module.css';

const navItems = [
    { label: "All Pets", path: "/pets" },
    { label: "Add a pet", path: "/pets/add", auth: true },
    { label: "Profile", path: "/profile", auth: true },
    { label: "Login", path: "/login", auth: false },
    { label: "Register", path: "/register", auth: false },
  ];

const Header = () => {

    const { dispatch, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    // load handler
    const logoutHandler = async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        dispatch({ type: "LOGOUT" });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }

    return (
    <>
        <div className={styles.banner}>

        <p>If you have encountered any issue or like to share your user experience of using Petmedia, 
            feel free to click contact us or send an email to petmedia@gmail.com. </p>
        
        <p>Petmedia designed by Katherine, Kai, and Ethan from Cornell Tech. </p>

        <div className="container">
            <header className={styles.header}>

            <li>
                <Link className={styles['main-nav-link']} to="/">
                    Home
                </Link>
            </li>

            {/* Main Navigation */}
            <nav className={styles['main-nav-list']}>
                <ul className={styles['main-nav-list']}>
                
                {/* All Pets */}
                <li>
                    <Link className={styles['main-nav-link']} to="/pets">
                        Pets Park
                    </Link>
                </li>

                {/* Login and Register */}
                {!currentUser && (
                    <>
                    <p>
                        <Link className={styles['main-nav-link']} to="/register">
                            Sign Up
                        </Link>
                    </p>
                    
                    <p>
                        <Link className={styles['main-nav-link']} to="/login">
                            Sign In
                        </Link>
                    </p>

                    </>
                )}



                {/* Add a Pet, Profile, Logout */}
                {currentUser && (
                    <>
                    
                    <p>
                        <Link className={styles['main-nav-link']} to="/pets/add">
                            Add pet
                        </Link>
                    </p>
                    
                    <p>
                        <Link className={styles['main-nav-link']} to="/profile">
                            Profile
                        </Link>
                    </p>

                    <p>
                        <Link
                            to="/"
                            className={styles['main-nav-link']}                        
                            onClick={logoutHandler}
                        >
                            Logout
                        </Link>
                    </p>

                    </>
                )}

                </ul>
            </nav>
            </header>
        </div>
    </div>
    </>
    )
}

export default Header;
