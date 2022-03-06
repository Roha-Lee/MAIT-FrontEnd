import styled from 'styled-components'

export const ManyDaysStatistics = styled.div`
    flex-basis: 700px;
    margin-top: 30px;
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        flex-basis: 0;
    }
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin: 40px auto;
        align-items: center;
    }
    @media screen and (max-width: 520px) {
        margin: 0 auto;
    }
`

export const ChartContainer = styled.div`
    /* width: 800px; */
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media screen and (max-width: 720px) {
        width: 500px;
    }
    @media screen and (max-width: 520px) {
        width: 300px;
    }

`

export const UpperContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 350px;
    
    @media screen and (max-width: 1024px) {
        margin-bottom: 10px;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }
`

export const SubjectBar = styled.div`
    width: 400px;
    height: 300px;
    @media screen and (max-width: 520px) {
        width: 250px;
    }
`

export const Todobar = styled.div`
    padding-left: 10px;
    width: 400px;
    height: 300px;
    @media screen and (max-width: 520px) {
        width: 250px;
    }
`

export const SubjectLine = styled.div`
    padding-top: 30px;
    width: 800px;
    height: 500px;
    padding-bottom: 80px;
    @media screen and (max-width: 1024px) {
        width: 400px;
        margin-top: 40px;
    }

    @media screen and (max-width: 520px) {
        width: 250px;
    }
`

export const SubjectBarTitleContainer = styled.div`
    text-align: left;
`

export const SubjectBarTitle = styled.h1`
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
        background-color: #606060;
    }
`

export const TodobarTitleContainer = styled.div`
    text-align: left;
`

export const TodobarTitle = styled.h1`
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
        background-color: #606060;
    }
    @media screen and (max-width: 1024px) {
        margin-top: 50px;
    }
`

export const SubjectLineTitleContainer = styled.div`
    text-align: left;
`

export const SubjectLineTitle = styled.h1`
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
        background-color: #606060;
    }
`

