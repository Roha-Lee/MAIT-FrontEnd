import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const SignupContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 700px;
    font-size: 1.5rem;
    border-radius: 15px;
    background: #EBB057;
    text-align: center;
`

export const SignupInput = styled.input`
    margin: 10px;
    padding: 5px;
    border-radius: 30px;
`

export const SignupButton = styled(Button).attrs({ variant: "danger" })`
    margin: 10px;
    width: 200px;
    font-size: 1.5rem;
    border-radius: 10px;
`
