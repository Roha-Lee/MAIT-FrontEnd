import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const SignupForm = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    font-size: 1.5rem;
    border-radius: 15px;
    text-align: center;
    background: #EBB057;
    padding: 40px;
`

export const SignupInput = styled.input`
    margin: 10px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    &:focus {
        background-color: #444444;
        color: white;
    }
`

export const SignupButton = styled(Button).attrs({ variant: "danger" })`
    margin: 10px;
    width: 250px;
    font-size: 1.5rem;
    border-radius: 10px;
`
