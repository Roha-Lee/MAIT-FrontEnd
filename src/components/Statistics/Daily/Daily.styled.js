import styled from 'styled-components'

export const DailyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 30px 0px;
    /* width: 800px; */
    justify-content: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin: 40px auto;
        align-items: center;
    }
`
