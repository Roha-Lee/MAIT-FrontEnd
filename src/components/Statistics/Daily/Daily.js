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
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 00:32:00',
                endTime : '2022-02-09 01:47:00'
            }, 
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 02:18:00',
                endTime : '2022-02-09 03:47:00'
            }, 
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 09:21:00',
                endTime : '2022-02-09 10:16:00'
            },
            {
                subjectId : 1,
                subjectName : "Algorithm",
                color : "#a67ebf",
                startTime : '2022-02-09 10:35:20',
                endTime : '2022-02-09 11:39:10'
            },
            {
                subjectId : 2,
                subjectName : "OS",
                color : "#bf6d7f",
                startTime : '2022-02-09 11:41:40',
                endTime : '2022-02-09 13:12:02'
            },
            {
                subjectId : 2,
                subjectName : "OS",
                color : "#bf6d7f",
                startTime : '2022-02-09 14:35:40',
                endTime : '2022-02-09 15:22:02'
            },
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 16:46:00',
                endTime : '2022-02-09 17:41:00'
            },
            {
                subjectId : 1,
                subjectName : "Algorithm",
                color : "#a67ebf",
                startTime : '2022-02-09 18:01:00',
                endTime : '2022-02-09 20:04:00'
            },          
            {
                subjectId : 1,
                subjectName : "Algorithm",
                color : "#a67ebf",
                startTime : '2022-02-09 21:52:00',
                endTime : '2022-02-09 22:07:00'
            },
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 22:12:00',
                endTime : '2022-02-09 23:04:00'
            },          
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
                startTime : '2022-02-09 23:17:00',
                endTime : '2022-02-09 24:00:00'
            },          
        ],
        subjectTotalTime : [
            {
                subjectId : 1,
                subjectName : "Algorithm",
                color : "#a67ebf",
                totalTime : '03:10:02'
            },
            {
                subjectId : 2,
                subjectName : "OS",
                color : "#bf6d7f",
                totalTime : '01:23:10'
            },
            {
                subjectId : 3,
                subjectName : "Javascript",
                color : "#6dbf84",
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