import styled from 'styled-components'

export const SubjectsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding: 11px;
    width: 100%;
    background-color: #B2CDD9;
`

export const StyledSubjects = styled.div`
    align-items: center;
    background-color: #EEE7E1;
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
`

export const Subject = styled.button`
    margin: 0 .5rem;
    padding: 0.5rem 1rem;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    width: auto;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;

    &:hover {
        filter: brightness(70%);
    }
    &:-webkit-scrollbar {
        height: 8px;
    }
    &:-webkit-scrollbar-thumb {
        background-color: #EEE7E1; /*스크롤바의 색상*/    
        border: 1px solid grey;
    }
    
`

export const SubjectManager = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 5px;
    width: 400px;
`

export const AddButton = styled.button`
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 0 10px;
`

export const Active =  styled.div`
    background-color: #EBB057;
`

export const GreyBox = styled.div`
    margin: 70px auto 0 auto;
    height: 50px;
    width: 680px;
    background: #E0E0DF;
    display: flex;
    justify-content: space-evenly;
`

export const TabBox = styled.div`
    margin-top: 11px;
    background: white;
    height: 40px;
    width: 65px;
    border-radius: 5px 5px 0 0;
`