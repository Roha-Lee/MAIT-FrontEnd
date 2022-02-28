
import React from 'react';
import {HeadNavigate, NavigationBlank, NavigationContents, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome} from './LobbyNavigation.styled'

function Navigation () {
    return (
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div><StyledLinkHome to="/camstudyLobby" onClick={() => window.close()}><strong>M.AI.T</strong></StyledLinkHome></div>
            </NavigationContents>
            <NavigationBlank/>
        </HeadNavigate>
    );

}
export default Navigation;