import 'bootstrap/dist/css/bootstrap.min.css'
import {CamTimerContainer, CamContainer, CamBoxRank_1, CamBoxRank_2, FlexBox} from './Camstudy.styled'

function Camstudy() {

    return (
        <>
        <CamContainer>
            <CamTimerContainer>
                timer 정보 표시란
            </CamTimerContainer>
            <FlexBox>
                <CamBoxRank_1>랭킹 1<video scr="https://youtu.be/mkggXE5e2yk" autoPlay></video></CamBoxRank_1>
                <CamBoxRank_2>랭킹 그외<video scr="https://youtu.be/mkggXE5e2yk" autoPlay></video></CamBoxRank_2>
            </FlexBox>
        </CamContainer>
        </>
    )
}
 
export default Camstudy;