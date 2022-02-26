import styled from 'styled-components'

export const AiOn = styled.div`
    display: flex;
    justify-content: center;
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