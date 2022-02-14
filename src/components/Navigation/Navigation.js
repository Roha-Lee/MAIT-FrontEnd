import React from 'react';
import style from './Navigation.module.css';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <header className={style.navigation}>
                <div className={style.blank}></div>
                <div className={style.navigationContents}>
                    <div className={style.logo}><Link to="/">EMIT</Link></div>
                    <div className={style.loginContainer}>
                        <div className={style.navigationButton}><Link to="/Signup">Sign up</Link></div>
                        <div className={style.navigationButton}><Link to="/Login">Sign In</Link></div>
                        <div className={style.navigationButton}><Link to="/Statistics">Statistics</Link></div>
                    </div>
                </div>
                <div className={style.blank}></div>
            </header>
        );
    }
}
export default Navigation;