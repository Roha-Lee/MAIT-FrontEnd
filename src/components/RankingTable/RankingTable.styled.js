import styled from 'styled-components';

export const RankingContainer = styled.div`
    display:flex;
    width: 100%;
    margin: 100px auto;
    flex-direction : column;
    align-items: center;
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
    width: 200px;
    height: 200px;
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
display: flex;
flex-direction: column;
justify-content: center;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
background-color: #E0E0DF;
color: #606060;
`

export const BackFace = styled.div`
position: absolute;
width: 100%;
height: 100%;
border-radius: 50%;
display: flex;
flex-direction: column;
justify-content: center;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
background-color: #606060;
color: white;
transform: rotateY(180deg);
`

export const CircleTitle = styled.span`
display: block;
font-size: ${props => props.type==="back"?"1.5rem":"1.3rem"};
`


export const MyPercentText = styled.span`
font-size: 4rem;
display: block;
::after {
    content: "%";
    font-size: 2rem;
    margin-left: 1rem;
}
`

export const MyRankContainer = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
`

export const MyRankText = styled.span`
display: block;
font-size: 4rem;
`

export const TotalPersonText = styled.span`
display: block;
font-size: 2rem;
padding-bottom: 0.8rem;
`

export const FrontContents = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
`
export const MedalImage = styled.img`
position: absolute;
top: -32px;
left: calc(50% - 32px);
`