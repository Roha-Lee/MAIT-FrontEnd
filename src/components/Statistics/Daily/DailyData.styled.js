import styled from 'styled-components'

export const StyledDailyData = styled.div`
    padding: 20px 0;
`

export const StyledTitleContainer = styled.div`
    text-align: left;
`

export const StyledHeader = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    display: flex;
    align-items: center;
    color: #606060;

    span {
        flex: 0 0 auto;
    }

    div {
        flex: 1 1 0;
        margin-left: 24px;
        height: 1px;
        background-color: #606060;
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
