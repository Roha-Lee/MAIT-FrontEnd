import styled from "styled-components";

export const StyledHeatmap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    @media screen and (max-width: 1024px) {
        align-items: flex-start;
    }
`

export const StyledHeader = styled.h1`
    width: 100%;
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
        background-color: #606060;;
    }
`


export const StyledHeatmapTitle = styled.span`
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    color: #606060;
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

export const StyledHeatmapContent = styled.div`
    text-align: right;

    @media screen and (max-width: 1024px) {
        margin: 0 auto;
    }
`

export const StyledSelect = styled.select`
    width: 100px;
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow: hidden;
    margin-bottom: 5px;
`


export const StyledHeatmapgrid = styled.div`
    width: 250px;
    margin-top: 20px;
`