import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const TodoInputContainer = styled.div`
    margin-top: 24px;
    text-align: right;
    @media screen and (max-width: 520px) {
        width: 300px;
    }
`

export const FormButton = styled(Button).attrs({ variant: "success" })`
    padding: .375rem 1.4rem;
`
