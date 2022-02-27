import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeadNavigate = styled.div`
    width: 100%;
    height: 70px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    background-color: #639ECC;
    position:relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    @media screen and (max-width: 520px) {
        height: 150px;
    }
`
export const NavigationContents = styled.div`
    flex-basis: 700px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 520px) {
        flex-direction: column;
    }
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
    margin: 0 3px;
    &:focus, &:visited, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
        background-color: #2c5b71;
        border-radius: 15px;
    }
    @media screen and (max-width: 375px) {
        font-size: 1rem;
    }
`

export const StyledA = styled.a`
    text-decoration: none;
    color: #EEE7E1;
    font-size: 1.2rem;
    padding: 15px 25px;
    margin: 0 3px;
    &:focus, &:visited, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
        background-color: #2c5b71;
        border-radius: 15px;
    }
    @media screen and (max-width: 375px) {
        font-size: 1rem;
    }
`