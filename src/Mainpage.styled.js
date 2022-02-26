import styled from 'styled-components'

export const AiContainer = styled.div`
    display: flex;
    margin: 1rem auto;  
    flex-direction: row;
    justify-content: center;
`

export const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EBB057;
    margin: 20px auto;
    width: 500px;
    border-radius: 20px;
    padding: 20px 0;
    @media screen and (max-width: 520px) {
        width: 320px;
    }
`

export const CamButton = styled.button`
    margin: 0 auto;
    padding: 10px 30px;
    border-radius: 10px;
    border: none;
    background-color: #6693B2;
    color: #EEE7E1;
    font-size: 1.2rem;
`

export const FlexBox = styled.div`
    display: flex;
`

export const DropdownContainer = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row-reverse;
`
export const StyledFooter = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
`