import styled from 'styled-components'

export const AiContainer = styled.div`
    position: fixed;
    right: 0;
    padding : 20px;
    background: #CDE8F7;
    border-radius: 10px 0 0 10px;
    border: solid 0.5px lightgrey;
    @media screen and (max-width: 900px) {
        display: flex;
        position: static;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        padding: 0;
        height: 150px;
        background: none;
        border: none;
    }
`

export const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #CDE8F7;
    margin: 20px auto;
    width: 500px;
    border-radius: 20px;
    padding: 20px 0;
    border: solid 0.5px lightgrey;
    @media screen and (max-width: 520px) {
        width: 320px;
    }
`

export const CamButton = styled.button`
    margin: 0 auto;
    padding: 10px 30px;
    border-radius: 10px;
    border: none;
    background-color: #3F82A2;
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