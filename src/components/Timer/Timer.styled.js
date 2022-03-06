import styled from 'styled-components'

export const SubjectTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    @media screen and (max-width: 1024px) {
        margin-top: 18px;
        font-size: 1.4rem;
    }
    @media screen and (max-width: 720px) {
        margin-top: 16px;
        font-size: 1.3rem;
    }
`
export const TimerContainer = styled.div`
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 880px;
    background-color: white;
    padding: 40px;
    @media screen and (max-width: 1024px) {
        padding: 0;
        width: 680px;
        height: 290px;  
    }
    @media screen and (max-width: 760px) {
        padding: 0;
        width: 480px;
        height: 200px;   
    }
    @media screen and (max-width: 520px) {
        width: 350px;
        height: 200px;     
    }
`

export const Timer_set = styled.span`
    font-size: 5rem;    
    padding: 0 10px;
    @media screen and (max-width: 1024px) {
        font-size: 4rem;
    }
    @media screen and (max-width: 760px) {
        font-size: 3rem;
    }
`

export const TimerButton = styled.div`
    padding: 10px 50px;
    margin-bottom: 20px;
    border-radius: 15px;
    border: none;
    font-size:1.5rem;
    color: white;
    background-color: #606060;
    cursor: pointer;
    width: 25%;
    display: flex;
    text-align : center;
    justify-content : center;
    &:hover {
        background-color: brightness(70%)
    }
    @media screen and (max-width: 1024px) {
        margin-bottom: 16px;
        font-size: 1.4rem;
    }
    @media screen and (max-width: 760px) {
        margin-bottom: 16px;
        font-size: 1.2rem;
    }
`;

export const NoSubjectMessage = styled.span`
    font-size: 30px;
    padding: 10vh 0;
    color: #606060;
    text-align: center;
    @media screen and (max-width: 760px) {
        font-size: 24px;
    }
    @media screen and (max-width: 520px) {
        font-size: 20px;
    }
`;