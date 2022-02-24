import styled from 'styled-components'

export const Heatmap = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 80px;
    padding-top: 30px;
`

export const HeatmapGrid = styled.div`
    width: 250px;
    @media screen and (max-width: 520px) {
        width: 125px;
    }
`