import styled from 'styled-components'

export const SubjectTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
`
export const TimerContainer = styled.div`
    padding: 20px;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Timer_set = styled.span`
    font-size: 5rem;    
    text-shadow: 2px 0 0 #EEE7E1, -2px 0 0 #EEE7E1, 0 2px 0 #EEE7E1, 0 -2px 0 #EEE7E1, 1px 1px #EEE7E1, -1px -1px 0 #EEE7E1, 1px -1px 0 #EEE7E1, -1px 1px 0 #EEE7E1;
    padding: 0 10px;
    @media screen and (max-width: 520px) {
        font-size: 2.5rem;
    }
`

export const TimerButton = styled.div`
    padding: 10px 50px;
    border-radius: 15px;
    border: none;
    font-size:1.5rem;
    color: #EEE7E1;
    background-color: #B23930;
    &:hover {
        background-color: brightness(70%)
    }
`

