import styled from 'styled-components'

export const DailyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 30px 0px;
    /* width: 800px; */
    justify-content: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin: 40px auto;
        align-items: center;
    }
    @media screen and (max-width: 520px) {
        margin: 0 auto;
    }
    position: relative;
    width: 100%;
`

export const DailyDataWrapper = styled.div`
    width: 400px;

    @media screen and (max-width: 1024px) {
        width: 100%;
        max-width: 400px;
    }
`

export const TimeHeatmapWrapper = styled.div`
    flex: 0 1 300px;
    padding-left: 80px;

    @media screen and (max-width: 1024px) {
        width: 100%;
        max-width: 400px;
        padding-left: 0;
    }
`
