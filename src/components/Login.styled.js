import { Link } from 'react-router-dom'
import styled from 'styled-components'
import KaKaoLogin from 'react-kakao-login'

export const LoginTitle = styled.h1`
    color: #606060;
    font-size: 2rem;
    margin-bottom: 30px;
`

export const LoginForm = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: 400px;
    padding: 10px;
    width: 100%;
`

export const LoginInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0;
    height: 50px;
    border: none;
    border-radius: 15vw;
    font-size: 1.2rem;
    background-color: #ffffff;
    padding: 0 25px;
`

export const LoginIcon = styled.i`
    flex: 0 0 auto;
    font-size: 1.3rem;
    color: #606060;
`

export const LoginInputWrapper = styled.div`
    flex: 1 1 0;
    padding: 0 25px;
    position: relative;
`

export const LoginInput = styled.input`
    border: none;
    font-size: 1.2rem;
    background-color: #ffffff;
    color: #606060;
    width: 100%;

    &:active, &:focus{
        outline: none;
    }
`

export const LoginButton = styled.button`
    display: block;
    width: 100%;
    padding: 10px 25px;
    margin-top: 40px;
    font-size: 1.3rem;
    border-radius: 10vh;
    background-color: #606060;
    color: #FFFFFF;
    border: none;
`

export const SocialLoginButton = styled(KaKaoLogin)`
    width: 50px !important;
    height: 50px !important;
    border-radius: 25px !important;
    border: none !important;
    margin: 20px !important;
    background-color: yellow;
`

export const SignUpGuide = styled.div`
    font-size: 1rem;
    color: #606060;
`

export const StyledLink = styled(Link)`
    margin-left: 10px;
`
