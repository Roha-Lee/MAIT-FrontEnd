import styled from 'styled-components'

export const SubjectTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
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
`

export const Timer_set = styled.span`
    font-size: 5rem;    
    text-shadow: 2px 0 0 #EEE7E1, -2px 0 0 #EEE7E1, 0 2px 0 #EEE7E1, 0 -2px 0 #EEE7E1, 1px 1px #EEE7E1, -1px -1px 0 #EEE7E1, 1px -1px 0 #EEE7E1, -1px 1px 0 #EEE7E1;
    padding: 0 10px;
`

export const TimerButton = styled.div`
    padding: 10px 50px;
    margin-bottom: 20px;
    border-radius: 15px;
    border: none;
    font-size:1.5rem;
    color: white;
    background-color: #606060;
    &:hover {
        background-color: brightness(70%)
    }
`

