import styled, { keyframes } from 'styled-components';

export const RankingContainer = styled.div`
    display:flex;
    width: 100%;
    padding: 50px 0 0 0;
    flex-direction : column;
    align-items: center;
    color: #606060;
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
// animation: slideInDown;
//     animation-duration: .6s; 

const slideDownIn = keyframes`
    0% {
        top : 0px;
    }
    100% {
        top : -200px;
    }
`

export const RankCircleContainer = styled.div`
    background-color: transparent;
    width: 200px;
    height: 200px;
    perspective: 1000px;
    margin-bottom: 28px;
    position: relative;
    animation : ${slideDownIn} .6s reverse;
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
margin-top: 20px;
`
export const MedalImage = styled.img`
${props=>props.type==='rankCircle'? 
`position: absolute;
top: -52px;
left: calc(50% - 32px);`: 
null}
`

const slideRightIn = keyframes`
    0% {
        left : 0px;
    }
    100% {
        left : 400px;
    }
`

export const RankTableContainer = styled.div`
width: 100%;
height: 55vh; 
overflow: auto;
position : relative;
animation : ${slideRightIn} .6s reverse;
`
// animation: slideInRight;
// animation-duration: .6s; 

export const StyledTable = styled.table`
border-collapse: separate;
border-radius: 10px;
border-spacing: 0;
width: 100%;
box-shadow: 0 0 1px #606060;
`

export const StyledTh = styled.th`
background-color: #606060;
color: white;
font-weight: normal;
border-bottom: 1px solid #606060;
line-height: 1.5;
padding: 0.75em;
text-align: center;
:first-child {
    border-top-left-radius: 15px;
}
:last-child {
    border-top-right-radius: 15px;
}
`
  
export const StyledTd = styled.td`
line-height: 1.5;
padding: 0.75em;
text-align: center;
background-color: white;
:first-child {
    font-family: 'IBMPlexSansKR-Bold';
}
@media (max-width: 520px) {
    tbody &{
        border-radius: none;
        text-align: left;
    }
    display: block;
    border: none;
    padding-left: 50%;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    &:before {
        content: attr(data-label);
        display: inline-block;
        font-family: 'IBMPlexSansKR-Bold';
        line-height: 1.5;
        margin-left: -100%;
        width: 100%;
    }
    
}
`
// :hover ${StyledTd}{
//     background-color: #5FB973;
// }

export const StyledTr = styled.tr`
:nth-child(even) ${StyledTd} {
    background-color: ${ props=>props.myRank===true ? "#5FB973":"#FFFFFF"};
}
:nth-child(odd) ${StyledTd} {
    background-color: ${ props=>props.myRank===true ? "#5FB973":"#E0E0DF"};
}
:last-child ${StyledTd}:first-child{
    border-bottom-left-radius: 10px;
}
:last-child ${StyledTd}:last-child{
    border-bottom-right-radius: 10px;
}
@media (max-width: 520px) {
    thead &{
      position: absolute;
      top: -9999rem;
      left: -9999rem;
    }
    tbody &{
        border-radius: none;
        text-align: left;
    }
    display: block;
    :last-child ${StyledTd}:first-child{
        border-bottom-left-radius: 0;
    }
    :last-child ${StyledTd}:last-child{
        border-bottom-right-radius: 0;
    }
        
}
`

export const ButtonContainer = styled.div `  
width: 100%;
display: flex;
padding: 0 20px 5px 0;
justify-content: flex-end;
gap: 10px;
height: 2rem;
`

export const StyledButton = styled.span `
    border: none;
    color: #606060;
    cursor: pointer;
    box-sizing: border-box;
    :hover {
        border-bottom: 2px solid #606060;
    }
    
`