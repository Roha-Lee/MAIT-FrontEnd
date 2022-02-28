import DailyChart from "./DailyChart";
import style from "./DailyData.module.css";
import {connect} from "react-redux";

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
        <div className={style.dailydata}>
            <div className={style.titleContainer}>
                <h1 className={style.dailySummary}>일간 총 학습시간</h1>
            </div>
            <div className={style.totalTimes}>{`${totalHour}h ${totalMinute}m`}</div>
            <div className={style.titlecontainer}>
                <span className={style.dailyDetails}>과목별 학습시간</span>
            </div>
        
            <DailyChart data={data} labels={labels} subjectColors={subjectColors} isZeroShow={isZeroShow}/>
        
        </div>
    );
}

function mapStateToProps(state){
    return{
        isZeroShow : state.isZeroShow,
    };
}


export default connect(mapStateToProps) (DailyData);