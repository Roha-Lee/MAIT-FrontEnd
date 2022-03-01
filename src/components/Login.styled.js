import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
export const LoginTitle = styled.h1`
    color: #606060;
    font-size: 2rem;
    margin-bottom: 30px;
`
export const LoginForm = styled.form`
    position: absolute;
    left: 50%;
    top: 45vh;
    transform: translate(-50%,-50%);
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const LoginDiv = styled.div`
    margin: 10px;
    height: 50px;
    max-width: 90vw;
    width: 400px;
    padding: 0 25px;
    border: none;
    border-radius: 15vw;
    font-size: 1.2rem;
    color: #606060;
    background-color: #ffffff;
    display: flex; 
    align-items: center;
`
export const LoginIcon = styled.i`
font-size: 1.4rem;
color: #606060;
`
export const LoginInput = styled.input`
    border: none;
    font-size: 1.2rem;
    background-color: #ffffff;
    color: #606060;
    max-width: 90vw;
    width: 400px;
    padding: 0 25px;
    :active, :focus{
        outline: none;
    }
`

export const LoginButton = styled.button`
    margin: 10px;
    max-width: 90vw;
    width: 400px;
    padding: 10px 25px;
    margin-top: 40px;
    font-size: 1.3rem;
    border-radius: 10vh;
    background-color: #606060;
    color: #FFFFFF;
    border: none;
`
export const SocialLoginButton = styled.button`
    width: 50px;
    height: 50px; 
    border-radius: 25px;
    border: none;
    margin: 20px;
    background-color: yellow;
`
export const SignUpGuide = styled.span`
    font-size: 1rem;
    color: #606060;
`;

export const StyledLink = styled(Link)`
margin-left: 10px;
`