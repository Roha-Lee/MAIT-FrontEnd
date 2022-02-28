import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top:65px;
  left: -105px;
  width: 350px;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  background-color: rgba(96, 96, 96, 0.8);
  padding: 5px 10px 0;
  color: white;
  text-align: center;
  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;
    cursor: pointer;
    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
}
`;

export const HeadNavigate = styled.header`
    width: 100%;
    height: 70px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    background-color: #639ECC;
    position:relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`
export const NavigationContents = styled.div`
    flex-basis: 700px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const NavigationBlank = styled.div`
    flex-grow: 1;
`

export const LoginContainer = styled.div`
    display: flex;
`

export const StyledLinkHome = styled(Link)`
    
    text-decoration: none;
    color: #EEE7E1;
    font-size: 3rem;
    
    &:focus, &:visited, &:link, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
    }
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #EEE7E1;
    font-size: 1.2rem;
    padding: 15px 25px;
    &:focus, &:visited, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
        background: #4f7ea3;
        border-radius: 15px;
    }
`


export const StyledDiv = styled.div`
    text-decoration: none;
    color: #EEE7E1;
    font-size: 1.2rem;
    padding: 15px 25px;
    &:focus, &:visited, &:active,&:hover {
        text-decoration: none;
        color: #EEE7E1;
        background: #4f7ea3;
        border-radius: 15px;
    }
`

//728 부터 적용되는 미디어 쿼리 작성
// @media screen and (max-width: 768px) {

// }