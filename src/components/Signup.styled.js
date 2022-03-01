import { Button } from 'react-bootstrap'
import styled from 'styled-components'
export const SignupTitle = styled.h1`
    color: #606060;
    font-size: 2rem;
    margin-bottom: 30px;
`
export const SignupForm = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const SignupInput = styled.input`
    border: none;
    font-size: 1.2rem;
    background-color: #ffffff;
    color: #606060;
    max-width: 90vw;
    width: 400px;
    padding: 0 25px;
    @media screen and (max-width: 450px) {
        width: 75vw;
        max-width: 75vw;
    }

    :active, :focus{
        outline: none;
    }
`

export const SignupButton = styled.button`
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
    @media screen and (max-width: 450px) {
        width: 95vw;
        max-width: 95vw;
    }
`
export const SignupDiv = styled.div`
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
    @media screen and (max-width: 450px) {
        width: 95vw;
        max-width: 95vw;
    }
`
export const SignupIcon = styled.i`
font-size: 1.3rem;
color: #606060;
`
