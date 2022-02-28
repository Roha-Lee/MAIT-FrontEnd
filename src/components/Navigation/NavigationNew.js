
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, MainContainer, NavContainer, NavMenu, NavIcon, NavLink ,NavItem } from './NavigationNew.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"

function Navigation() {
    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);
    
    return (
      <div>
       {click ? 
        <MainContainer onClick={() => Close()}>
            <NavBar onClick={e => e.stopPropagation()}>
                <NavContainer>
                    <NavLink exact to="/" className="nav-logo">
                        M.AI.T
                    </NavLink>
                <NavMenu className={click ? "active" : ""}>
                    <NavItem>
                    <NavLink
                        exact
                        to="/"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Home
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/about"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        About
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/blog"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Blog
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/contact"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Contact Us
                    </NavLink>
                    </NavItem>
                </NavMenu>
                <NavIcon onClick={handleClick}>
                    <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                </NavIcon>
                </NavContainer>
            </NavBar>
        </MainContainer> : 
       <>
       <NavBar onClick={e => e.stopPropagation()}>
                <NavContainer>
                    <NavLink exact to="/" className="nav-logo">
                        M.AI.T
                    </NavLink>
                <NavMenu className={click ? "active" : ""}>
                    <NavItem>
                    <NavLink
                        exact
                        to="/"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Home
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/about"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        About
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/blog"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Blog
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        exact
                        to="/contact"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                    >
                        Contact Us
                    </NavLink>
                    </NavItem>
                </NavMenu>
                <NavIcon onClick={handleClick}>
                    <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                </NavIcon>
                </NavContainer>
            </NavBar>
       </>} 
        
      </ div>
    );
  }
  


function mapStateToProps(state){
    return{
        isLogin : state.isLogin,
        currentStudyTimeId : state.currentStudyTimeId,
        timerOn : state.timerOn,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setIsLogin : isLogin => dispatch(changeLogin(isLogin)),
        setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id))
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (Navigation);