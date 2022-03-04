import styled from 'styled-components';

export const RankingContainer = styled.div`
    display:flex;
    width: 700px;
    margin: 100px auto;
    flex-direction : column;
`

export const BlankComment = styled.span`
    font-size: 30px;
    color: #606060;
    text-align: center;
    margin : auto;
    padding-top : 40px;
`

export const RankCircle = styled.div`
    position: relative;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
`

export const RankCircleContainer = styled.div`
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
    :hover .rank-circle{
        transform: rotateY(180deg);
    }
`
export const FrontFace = styled.div`
position: absolute;
width: 100%;
height: 100%;
border-radius: 50%;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
background-color: #bbb;
    color: black;
`

export const BackFace = styled.div`
position: absolute;
width: 100%;
height: 100%;
border-radius: 50%;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
background-color: #2980b9;
color: white;
transform: rotateY(180deg);
`
