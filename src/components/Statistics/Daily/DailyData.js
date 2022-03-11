import DailyChart from "./DailyChart";
import {connect} from "react-redux";
import {StyledDailyData, StyledHeader, StyledTitleContainer, StyledTotalTimes} from './DailyData.styled'
function DailyData ({data , labels, subjectColors, isZeroShow}){
    // console.log("im here");
    const subjectTotalData = data?.subjectTotalTime;


    // let dataInput = [];
    let totalTime = 0;


    for(let i = 0 ; i < subjectTotalData?.length ; i++){
        const timeStr = subjectTotalData[i].totalTime;
        const hour = parseInt(timeStr.slice(0,2));
        const minute = parseInt(timeStr.slice(3,5)) + parseInt(timeStr.slice(6,8))/60;
        // dataInput.push(hour + (minute/60).toFixed(1));
        totalTime = totalTime + hour * 60 + minute;
    }

    const totalHour = Math.floor(totalTime/60);
    const totalMinute = Math.round(totalTime-totalHour*60);

    return (
        <StyledDailyData>
            <StyledTitleContainer>
                <StyledHeader><span>총 학습시간</span><div /></StyledHeader>
            </StyledTitleContainer>
            <StyledTotalTimes>{`${totalHour}시간 ${totalMinute}분`}</StyledTotalTimes>
            <StyledTitleContainer>
                <StyledHeader><span>과목별 학습시간</span><div /></StyledHeader>
            </StyledTitleContainer>

            <DailyChart data={data} labels={labels} subjectColors={subjectColors} isZeroShow={isZeroShow}/>

        </StyledDailyData>
    );
}

function mapStateToProps(state){
    return{
        isZeroShow : state.isZeroShow,
    };
}


export default connect(mapStateToProps) (DailyData);