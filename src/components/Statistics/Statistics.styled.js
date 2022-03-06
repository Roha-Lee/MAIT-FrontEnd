import styled from "styled-components";

export const TapContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0 15px;

    @media screen and (max-width: 720px) {
        padding: 0 5px 0 15px;
    }
`

export const TabBox = styled.div`
    margin: 15px 10px 0 0;
    height: 45px;
    width: 110px;
    border-radius: 15px 15px 0 0;
    text-align : center;
    padding-top : 10px;
    color : #606060;

    @media screen and (max-width: 720px) {
        width: inherit;
        flex: 1 1 0;
    }
    cursor: pointer;
    
`

export const BlankBox = styled.div`
    flex: 1 1 0;
    @media screen and (max-width: 720px) {
        display: none;
    }
`

export const StatisticsContainer = styled.div`
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 880px;
    background-color: white;
    padding: 0 40px 40px;
    
    overflow: hidden;
    @media screen and (max-width: 1024px) {
        width: 680px;
    }

    @media screen and (max-width: 720px) {
        width: 480px;
    }

    @media screen and (max-width: 520px) {
        width: 320px;
    }
`

export const BottomColor = styled.div`
    width: 880px;
    background-color: #e5f7ff;
    border-radius: 0 0 25px 25px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content : flex-end;
    align-items : center;
    
    @media screen and (max-width: 1024px) {
        width: 680px;
    }

    @media screen and (max-width: 720px) {
        width: 480px;
    }

    @media screen and (max-width: 520px) {
        width: 320px;
    }
    
`

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E0E0DF;
    margin: 5vh auto 0 auto;
    width: 880px;
    height: 60px;
    border-radius: 25px 25px 0 0;

    @media screen and (max-width: 1024px) {
        width: 680px;
    }

    @media screen and (max-width: 720px) {
        width: 480px;
    }
    @media screen and (max-width: 520px) {
        width: 320px;
    }
`

export const TabName = styled.span`
    margin-top: 5px;
`

export const StyledStatistics = styled.div`
    width: 100%;

`
export const StyledStatisticsDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* width: 800px; */
`
export const SmallSize = styled.div`
    display: none;
    background-color: white;
    
    @media screen and (max-width: 720px) {
        display: block;
        width: 480px;
        margin: 0 auto;
    }
    @media screen and (max-width: 520px) {
        width: 320px;
    }
`
export const BigSize = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 720px) {
        display: none;
    }
`

export const CaptureBtn = styled.div`
    background-color: #E0E0DF;
    width: fit-content;
    color : #606060;
    padding-left : 0.3rem;
    padding-right : 0.3rem;
    border-radius : 1rem;
    margin-right : 1.5rem;
    height : 70%;
    display: flex;
    align-items : center;
    cursor : pointer;
`
