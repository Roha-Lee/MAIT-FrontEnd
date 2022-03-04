import styled from 'styled-components'

export const StyledDailyData = styled.div`
    padding: 10px 0 0 0;
    height: 800px;
    @media screen and (max-width: 520px) {
        padding-bottom: 20px;
        height: 100%;
    }
`

export const StyledTitleContainer = styled.div`
    text-align: left;
`

export const StyledDailySummery = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    color: grey;
    
    &:after {
        content: ' ';
        display: block;
        position: absolute; 
        top: 50%; 
        width: 215px; 
        border-bottom: 1.5px solid grey;
        left: auto;
        right: -250px;
        @media screen and (max-width: 1024px) {
            display: none;
        } 
    }
`

export const StyledTotalTimes = styled.div`
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    color: #606060;
    margin: 80px 0;
    height: 80px;
`

export const StyledDailyDetails = styled.span`
    font-size:2rem;
    font-weight: bold;
    position:relative;
    display:inline-block;
    color: grey;
    margin-bottom: 30px;
    
    &:after {
        content: ' ';
        display: block;
        position: absolute; 
        top: 50%; 
        width: 160px; 
        border-bottom:1.5px solid grey;
        left: auto;
        right: -193px; 
        @media screen and (max-width: 1024px) {
            display: none;
        }
    }
`

