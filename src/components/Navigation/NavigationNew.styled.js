import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const NavBar = styled.div`
    background-color: #1f5156;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 20;
`  
export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    max-width: 1100px;
`

export const MainContainer = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:rgba(0,0,0,0.3);
`
  
export const NavLogo = styled.div`
color: #f5b921;
align-items: center;
margin-left: 20px;
cursor: pointer;
text-decoration: none;
flex-grow: 1;
`
export const NavMenu = styled.div`
display: flex;
list-style: none;
text-align: center;
margin-right: 2rem;
@media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid #fff;
    position: absolute;
    top: 80px;
    left: -110%;
    opacity: 1;
    transition: all 0.5s ease;
    &.active {
        background: #1f5156;
        left: 0px;
        opacity: 1;
        transition: all 0.5s ease;
        z-index: 1;
    }
}
` 
  
export const NavLink = styled.div`
color: #fff;
text-decoration: none;
padding: 0.5rem 1rem;
height: 100%;
border-bottom: 3px solid transparent;
@media screen and (max-width: 760px) {   
    padding: 1.5rem;
    width: 100%;
    display: table;
 
}
`
export const NavItem = styled.div`
line-height: 40px;
margin-right: 1rem;
&:after {
    content: "";
    display: block;
    height: 3px;
    width: 0;
    background: transparent;
    transition: width 0.7s ease, background-color 0.5s ease;
}
&:hover:after {
    width: 100%;
    background: #ffdd40;
}
&.active {
    color: #ffdd40;
    border: 1px solid #ffdd40;
    @media screen and (max-width: 760px) {
        color: #ffdd40;
        border: none;
    }
} 

`  
export const NavIcon = styled.div`
    display: none;
@media screen and (max-width: 760px) {   
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #ffdd40;  
}
    
`
