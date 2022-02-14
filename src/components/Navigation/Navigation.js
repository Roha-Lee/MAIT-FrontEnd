import React from 'react';
import style from './Navigation.module.css'

class Navigation extends React.Component {
    render() {
        return (
            <header className={style.navigation}>
                <div className={style.blank}></div>
                <div className={style.navigationContents}>
                    <div className={style.logo}>EMIT</div>
                    <div className={style.loginContainer}>
                        <div className={style.navigationButton}>Sign up</div>
                        <div className={style.navigationButton}>Sign in</div>
                    </div>
                </div>
                <div className={style.blank}></div>
            </header>
        );
    }
}
export default Navigation;