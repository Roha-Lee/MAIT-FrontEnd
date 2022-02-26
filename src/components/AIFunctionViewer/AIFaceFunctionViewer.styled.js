import styled from 'styled-components'

export const AiOn = styled.div`
    display: flex;
    justify-content: center;
    background-color: #CDE8F7;
    position: ${props => props.floatVideo ? 'fixed' : 'static'};
    bottom: ${props => props.floatVideo ? '10px' : 'initial'};
    left: ${props => props.floatVideo ? '10px' : 'initial'};
    padding: ${props => props.floatVideo ? '10px' : 'initial'};
    border: ${props => props.floatVideo ? 'solid 0.3px lightgray' : 'initial'};
    border-radius: ${props => props.floatVideo ? '0 10px 10px 0' : 'initial'};
    z-index: 9;
`

export const SrcCanvas = styled.canvas`
    display: none;
`

export const DstCanvas = styled.canvas`
    display: none;
`

export const ImgFace = styled.img`
    width: 150px;
    height: 150px;
    display: none;
    @media screen and (max-width: 900px) {
        width: 50px;
        height: 50px;
    }
`