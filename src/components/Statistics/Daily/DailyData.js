import DailyChart from "./DailyChart";
import style from "./DailyData.module.css";
import axios from "axios";

function DailyData ({data , labels, subjectColors, isZeroShow}){
    // console.log("im here");
    const subjectTotalData = data?.subjectTotalTime;
    
    
    // let dataInput = [];
    let totalTime = 0;
    
    
    for(let i = 0 ; i < subjectTotalData?.length ; i++){
        const timeStr = subjectTotalData[i].totalTime;
        const hour = parseInt(timeStr.slice(0,2));
        const minute = parseInt(timeStr.slice(3,5));
        // dataInput.push(hour + (minute/60).toFixed(1));
        totalTime = totalTime + hour * 60 + minute;
    }

    const totalHour = Math.floor(totalTime/60);
    const totalMinute = totalTime-totalHour*60;

    return (
        <div className={style.dailydata}>
            <div className={style.titleContainer}>
                <h1 className={style.dailySummary}>Daily Summary</h1>
            </div>
            <h2>총 학습시간</h2>
            <div className={style.totalTimes}>{`${totalHour}h ${totalMinute}m`}</div>
            <div className={style.titlecontainer}>
                <h1 className={style.dailyDetails}>Daily Details</h1>
            </div>
        
            <DailyChart data={data} labels={labels} subjectColors={subjectColors} isZeroShow={isZeroShow}/>
        
        </div>
    );
}

export default DailyData;