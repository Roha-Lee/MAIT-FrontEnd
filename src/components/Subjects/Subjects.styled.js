import styled from 'styled-components'

export const SubjectsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding: 11px;
    width: 100%;
    background-color: #F0CE9A;
`

export const Subjects = styled.div`
    align-items: center;
    background-color: #EEE7E1;
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
`

export const Subject = styled.button`
    margin: 0 .5rem;
    padding: 0.5rem 1rem;
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

export const subjectManager = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 5px;
    width: 400px;
`

export const AddButton = styled.button`
    font-size: 1rem;
    font-weight: 400;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 10px;
    padding: 10px 10px;
    margin: 0 10px;
`

export const Active =  styled.div`
    background-color: #EBB057;
`

export const TabBox = styled.div`
    margin: 15px 10px 0 0;
    background: white;
    height: 50px;
    width: 100px;
    border-radius: 15px 15px 0 0;
`

export const FlexBox = styled.div`
    display: flex;
`

export const SubjectBox = styled.div`
    display: flex;
    width: 700px;
`

export const ButtonBox = styled.div`
    display: flex;
`