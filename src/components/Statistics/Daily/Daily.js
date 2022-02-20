import TimeHeatmap from "./TimeHeatmap";
import DailyData from "./DailyData";
import style from "./Daily.module.css";
import { useEffect } from "react";
import axios from "axios";

function Daily (){
    
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    
    // const fetchData = async () => {
    //     try {
    //         setError(null);
    //         setData(null);
    //         setLoading(true);
    //         const today = new Date();
    //         const year = today.getFullYear();
    //         const month = String(today.getMonth() + 1).padStart(2,0);
    //         const date = String(today.getDate()).padStart(2,0);
    // 
    //         const response = await axios.get("http://192.249.29.38:3001/statistics",{'today' : `${year}-${month}-${date}`});
    //         setData(response.data);
    //     }catch(e){
    //         setError(e);
    //     }

    //     setLoading(false);

    // };

    // useEffect(()=>{
    //     fetchData();
    // },[]);

    // if(loading){
    //     return (<div>로딩중..</div>);
    // }
    // if(error){
    //     return(<div>{error}</div>);
    // }

    const data = {
        rangeTime : [
            {
                subjectId : 1,
                subjectName : "과목1",
                color : "#8f1717",
                startTime : '2022-02-09 10:32:20',
                endTime : '2022-02-09 10:45:10'
            },
            {
                subjectId : 2,
                subjectName : "과목2",
                color : "#0b6a29",
                startTime : '2022-02-09 11:23:40',
                endTime : '2022-02-09 13:10:02'
            },
            {
                subjectId : 3,
                subjectName : "과목3",
                color : "#441098",
                startTime : '2022-02-09 09:20:00',
                endTime : '2022-02-09 10:15:00'
            },
            {
                subjectId : 1,
                subjectName : "과목1",
                color : "#8f1717",
                startTime : '2022-02-09 18:23:00',
                endTime : '2022-02-09 20:11:00'
            },          
        ],
        subjectTotalTime : [
            {
                subjectId : 1,
                subjectName : "과목1",
                color : "#8f1717",
                totalTime : '03:10:02'
            },
            {
                subjectId : 2,
                subjectName : "과목2",
                color : "#0b6a29",
                totalTime : '01:23:10'
            },
            {
                subjectId : 3,
                subjectName : "과목3",
                color : "#441098",
                totalTime : '06:01:23'
            },
        ] 
    }

    const subjectTotalData = data.subjectTotalTime;
    
    let labels = [];
    let subjectColors = [];
    
    for(let i = 0 ; i < subjectTotalData.length ; i++){
        labels.push(subjectTotalData[i].subjectName);
        subjectColors.push(subjectTotalData[i].color);
    }

    return (
        <div className = {style.daily}>
            <DailyData
                data = {data}
                labels = {labels}
                subjectColors = {subjectColors}
            />
            
            <TimeHeatmap
                data = {data}
                labels = {labels}
                subjectColors = {subjectColors}
            />
        </div>
    );
}

export default Daily;