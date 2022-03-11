import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const SignupForm = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    max-width: 400px;
    padding: 10px;
`

export const SignupTitle = styled.h1`
    color: #606060;
    font-size: 2rem;
    margin-bottom: 30px;
`

export const SignupDiv = styled.div`
    margin: 10px 0;
    height: 50px;
    padding: 0 25px;
    border: none;
    border-radius: 15vw;
    font-size: 1.2rem;
    color: #606060;
    background-color: #ffffff;
    display: flex;
    align-items: center;
`

export const SignupIcon = styled.i`
    flex: 0 0 auto;
    font-size: 1.3rem;
    color: #606060;
`

export const SignupInputWrapper = styled.div`
    flex: 1 1 0;
    padding: 0 25px;
    position: relative;
`

export const SignupInput = styled.input`
    width: 100%;
    border: none;
    font-size: 1.2rem;
    background-color: #ffffff;
    color: #606060;

    &:active, &:focus {
        outline: none;
    }
`

export const SignupButton = styled.button`
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
