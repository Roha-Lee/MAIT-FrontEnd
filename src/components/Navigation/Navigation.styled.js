import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeadNavigate = styled.header`
    width: 100%;
    height: 70px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    background-color: #6F8D7A;
    position:relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`
export const NavigationContents = styled.div`
    flex-basis: 700px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const NavigationBlank = styled.div`
    flex-grow: 1;
`

export const LoginContainer = styled.div`
    display: flex;
`

export const StyledLinkHome = styled(Link)`
    
    text-decoration: none;
    color: #EEE7E1;
    font-size: 3rem;
    
    &:focus, &:visited, &:link, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
    }
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #EEE7E1;
    font-size: 1.2rem;
    padding: 15px 25px;
    &:focus, &:visited, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
        background: #587061;
        border-radius: 15px;
    }
`