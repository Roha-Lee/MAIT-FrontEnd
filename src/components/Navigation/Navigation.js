import React from 'react';
import style from './Navigation.module.css'

class Navigation extends React.Component {
    render() {
        return (
            <header className={style.navigation}>
                <div className={style.logo}>EMIT</div>
                <div className={style.navigationButton}>Sign up</div>
                <div className={style.navigationButton}>Sign in</div>
            </header>
        );
    }
}
export default Navigation;