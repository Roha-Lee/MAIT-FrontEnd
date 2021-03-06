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
`

export const subjectManager = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 5px;
    width: 400px;
`

export const SubjectControlButton = styled.button`
    font-size: 1rem;
    font-weight: 400;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 18px;
    padding: 0 0 1px 0;
    margin: 15px 10px 0;
    background-color: ${props => props.type === 'add' ? "#F07623" : "#5FB973"};
    ${props => props.type === 'add' && props.noSubject ? `
    animation: bounce;
    animation-duration: 1s;
    `: null}
    @media screen and (max-width: 520px) {
        width: 30px;
        height: 30px;
        margin: 10px 10px 0;
    }
`

export const Active =  styled.div`
    background-color: #EBB057;
`

export const TabBox = styled.div`
    margin: 15px 10px 0 0;
    ${props => `background-color: ${props.isSelected? "#FFFFFF" :"#BFBFBF"};`}
    height: 45px;
    width: 110px;
    border-radius: 15px 15px 0 0;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 520px) {
        height: 35px;
    }
`

export const FlexBox = styled.div`
    display: flex;
    width: 100%;
`

export const SubjectBox = styled.div`
    display: flex;
    flex: 1 1 0;
    margin: 0 15px;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 1;

    :hover{
        overflow-x: auto;
    }
    ::-webkit-scrollbar
    {
        height: 10px;
        background-color: #FFFFFF;
    }
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #E0E0DF;
    }
    @media screen and (max-width: 760px) {
        width: 300px;
    }
    @media screen and (max-width: 520px) {
        width: 200px;
    }
`

export const ButtonBox = styled.div`
    display: flex;
`

export const SubjectColorCircle = styled.div`
    width: 18px;
    height: 18px;
    ${props => `background-color: #${props.subjectColor};`}
    border-radius: 9px;
    margin:5px 5px 0;
`

export const SubjectName = styled.span`
    width: 60px;
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    margin-top: 5px;
    color: #606060;
`