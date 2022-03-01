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
`

export const BottomFlexBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;
`
export const BottomColor = styled.div`
    width: 880px;
    background-color: #e5f7ff;
    border-radius: 0 0 25px 25px;
    margin: 0 auto;
    height: 50px;
`

export const DropdownContainer = styled.div`
    width: 30%;
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
    font-size: 1.8rem;
    color : darkslateblue;
`

export const TodayDate = styled.span`
    color : #606060;
    width: 30%;
    text-align : center;
`
export const WelcomeComment = styled.span`
    color : #606060;
    width: 30%;
    text-align : center;
`