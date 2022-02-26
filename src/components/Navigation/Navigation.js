
import React from 'react';
import { Link } from 'react-router-dom';
import {HeadNavigate, NavigationBlank, NavigationContents, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome, StyledA} from './Navigation.styled'

function Navigation () {
    return (
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div><StyledLinkHome to="/"><strong>M.AI.T</strong></StyledLinkHome></div>
                <LoginContainer>
                    <div><StyledLink to="/Signup">Sign up</StyledLink></div>
                    <div><StyledLink to="/Login">Sign In</StyledLink></div>
                    <div><StyledLink to="/Statistics">Statistics</StyledLink></div>
                    <div><StyledA onClick = {() => {window.open("/camstudy")}}>Cam Study</StyledA></div>
                </LoginContainer>
            </NavigationContents>
            <NavigationBlank/>
        </HeadNavigate>
    );

}
export default Navigation;