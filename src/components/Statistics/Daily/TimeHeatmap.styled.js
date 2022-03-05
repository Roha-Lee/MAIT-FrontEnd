import styled from "styled-components";

export const StyledHeatmap = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1024px) {
        align-items: flex-start;
    }
    @media screen and (max-width: 520px) {
        width: 70%;
    }
`

export const StyledHeatmapTitle = styled.span`
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    color: grey;
    margin: 20px;
    margin-top: 0px;
    width: 220px;

    &:after {
        content: ' ';
        display: inline;
        position: absolute;
        top: 50%;
        width: 175px;
        border-bottom: 1.5px solid grey;
        margin-inline-start: 22px;
        @media screen and (max-width: 1024px) {
            display: none;
        }
    }
`

export const StyledHeatmapgrid = styled.div`
    width: 250px;
    margin-top: 20px;
    margin-left: 80px;
    @media screen and (max-width: 520px) {
            margin-left: 20px;
        }
`
export const StyledSelect = styled.select`
    width: 100px;
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow: hidden;
    margin-left: 227px;
    margin-bottom: 5px;
    cursor : pointer;
    @media screen and (max-width: 520px) {
        margin-left: 170px;
        }
`

