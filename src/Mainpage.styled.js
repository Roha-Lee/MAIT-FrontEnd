import styled from 'styled-components'

export const AiContainer = styled.div`
    position: fixed;
    z-index: 9999;
    bottom: 30px;
    right: 30px;
`
// display: flex;
// margin: 1rem auto;  
// flex-direction: row;
// justify-content: center;
export const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E0E0DF;
    margin: 15vh auto 0 auto;
    width: 880px;
    height: 60px;
    border-radius: 25px 25px 0 0;
    @media screen and (max-width: 1024px) {
        width: 680px;   
    }
    @media screen and (max-width: 760px) {
        width: 480px;   
    }
    @media screen and (max-width: 520px) {
        width: 350px;
        height: 50px;   
    }
`

export const BottomFlexBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 5px 0 auto;
    @media screen and (max-width: 760px) {
         flex-direction: column;
    }
`
export const BottomColor = styled.div`
    width: 880px;
    background-color: #e5f7ff;
    border-radius: 0 0 25px 25px;
    margin: 0 auto;
    height: 50px;
    @media screen and (max-width: 1024px) {
        width: 680px;   
    }
    @media screen and (max-width: 760px) {
        width: 480px;   
    }
    @media screen and (max-width: 520px) {
        width: 350px;
    }
`

export const DropdownContainer = styled.div`
    display : flex;
    justify-content : center;
`
export const ColFlex = styled.div`
    display: flex;
    flex-direction: column;
`
export const BottomItems = styled.div`
    margin: 0 20px;
    font-size: 1.8rem;
`

export const Seperator = styled.div`
    font-size: 1.2rem;
    @media screen and (max-width: 760px) {
        display: none;
    }
`

export const WelcomeComment = styled.span`
    color : #606060;
    text-align : center;
    @media screen and (max-width: 1024px) {
        font-size: 0.9rem;   
    }
    @media screen and (max-width: 760px) {
        display: none;
    }
`

export const TodayDate = styled.span`
    color : #606060;
    text-align : center;
    @media screen and (max-width: 1024px) {
        font-size: 0.9rem;   
    }
    @media screen and (max-width: 760px) {
        display: none;
    }
`
export const HelpBtn = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #639ECC;
    display: flex;
    align-items: center;
    /* justify-items: center; */
    justify-content: center;
    color : #fff;
    cursor: help;
    font-size : 1.3rem;
`
