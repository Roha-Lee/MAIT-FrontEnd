import styled from 'styled-components'

export const AiContainer = styled.div`
    /* display: flex;
    margin: 1rem auto;  
    flex-direction: row;
    justify-content: center; */
    position: fixed;
    bottom: 0;
    right: 0;
    padding : 20px;
    margin: 10px 0;
    background: #CDE8F7;
    border-radius: 10px 0 0 10px;
    color : white;
    border: solid 0.5px lightgrey;
    @media screen and (max-width: 900px) {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: 60px;
        position: fixed;
        left: 0;
        padding: 5px 5px;
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