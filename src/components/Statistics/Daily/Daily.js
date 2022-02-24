import TimeHeatmap from "./TimeHeatmap";
import DailyData from "./DailyData";
import style from "./Daily.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import { Switch } from "antd";
import moment from "moment";
// axios.defaults.headers.common['Authorization'] = `${window.localStorage.getItem('accessToken')}`

const today = new Date().toJSON().slice(0,10);
const todayY = today.slice(0,4);
const todayM = today.slice(5,7);
const todayD = today.slice(8,10);
// const fakedata = {
//     rangeTime : [
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 00:32:00',
//             endTime : '2022-02-09 00:32:20'
//         }, 
        // {
        //     subjectId : 3,
        //     subjectName : "Javascript",
        //     color : "#6dbf84",
        //     startTime : '2022-02-09 02:18:00',
        //     endTime : '2022-02-09 03:47:00'
        // }, 
        // {
        //     subjectId : 3,
        //     subjectName : "Javascript",
        //     color : "#6dbf84",
        //     startTime : '2022-02-09 09:21:00',
        //     endTime : '2022-02-09 10:16:00'
        // },
        // {
        //     subjectId : 1,
        //     subjectName : "Algorithm",
        //     color : "#a67ebf",
        //     startTime : '2022-02-09 10:35:20',
        //     endTime : '2022-02-09 11:39:10'
        // },
        // {
        //     subjectId : 2,
        //     subjectName : "OS",
        //     color : "#bf6d7f",
        //     startTime : '2022-02-09 11:41:40',
        //     endTime : '2022-02-09 13:12:02'
        // },
        // {
        //     subjectId : 2,
        //     subjectName : "OS",
        //     color : "#bf6d7f",
        //     startTime : '2022-02-09 14:35:40',
        //     endTime : '2022-02-09 15:22:02'
        // },
        // {
        //     subjectId : 3,
        //     subjectName : "Javascript",
        //     color : "#6dbf84",
        //     startTime : '2022-02-09 16:46:00',
        //     endTime : '2022-02-09 17:41:00'
        // },
        // {
        //     subjectId : 1,
        //     subjectName : "Algorithm",
        //     color : "#a67ebf",
        //     startTime : '2022-02-09 18:01:00',
        //     endTime : '2022-02-09 20:04:00'
        // },          
        // {
        //     subjectId : 1,
        //     subjectName : "Algorithm",
        //     color : "#a67ebf",
        //     startTime : '2022-02-09 21:52:00',
        //     endTime : '2022-02-09 22:07:00'
        // },
        // {
        //     subjectId : 3,
        //     subjectName : "Javascript",
        //     color : "#6dbf84",
        //     startTime : '2022-02-09 22:12:00',
        //     endTime : '2022-02-09 23:04:00'
        // },          
        // {
        //     subjectId : 3,
        //     subjectName : "Javascript",
        //     color : "#6dbf84",
        //     startTime : '2022-02-09 22:17:00',
        //     endTime : '2022-02-10 00:00:00'
        // },          
//     ],
//     subjectTotalTime : [
//         {
//             subjectId : 1,
//             subjectName : "Algorithm",
//             color : "#a67ebf",
//             totalTime : '03:10:02'
//         },
//         {
//             subjectId : 2,
//             subjectName : "OS",
//             color : "#bf6d7f",
//             totalTime : '01:23:10'
//         },
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             totalTime : '06:01:23'
//         },
//     ] 
// }


function Daily (){
    const [selectDate , setSelectDate] = useState(today);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isZeroShow , setIsZeroShow] = useState(false);
    const yongHourl = "http://192.249.29.5:3001/statistics/daily";
    const jongHourl = "http://143.248.196.37:3001/statistics/daily";
    const serverUrl = "https://mait.shop/statistics/daily"
    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            // console.log("fetch date",selectDate);
            
            const response = await axios.get(serverUrl, 
                {
                    params : {'today' : selectDate}, 
                    headers: {Authorization: `${window.localStorage.getItem('accessToken')}`}
                });
            console.log(response.data);
            setData(response.data);
        }catch(e){
            setError(e);
        }

        setLoading(false);

    };

    useEffect(()=>{
        fetchData();
    },[selectDate]);

    // if(loading){
    //     return (<div>로딩중..</div>);
    // }
    // if(error){
    //     return(<div>{error}</div>);
    // }

    function onChange(date, dateString){
        // console.log(date,dateString);
        // if(parseInt(dateString.slice(0,4)) > todayY){
        //     alert("기간을 다시 선택해 주세요!");
        // }else if(parseInt(dateString.slice(5,7)) > todayM){
        //     alert("기간을 다시 선택해 주세요!");
        // }else if(parseInt(dateString.slice(8,10)) > todayD){
        //     alert("기간을 다시 선택해 주세요!");
        // }else{
            setSelectDate(dateString);
        // }

        
    }
    function onChangeToggle(checked){
        // console.log("switch to",checked);
        setIsZeroShow(!checked);
    }
    

    const subjectTotalData = data?.subjectTotalTime;
    // const subjectTotalData = fakedata?.subjectTotalTime;
    
    let labels = [];
    let subjectColors = [];
    console.log(subjectTotalData);
    
    for(let i = 0 ; i < subjectTotalData?.length ; i++){
        if(isZeroShow){
            labels.push(subjectTotalData[i].subjectName);
            subjectColors.push(subjectTotalData[i].color);
        }else if(subjectTotalData[i].totalTime !== "00:00:00"){
            labels.push(subjectTotalData[i].subjectName);
            subjectColors.push(subjectTotalData[i].color);
        }
    }
    console.log(labels,subjectColors)
    return (
        <div className = {style.daily}>
            <div>
            <DatePicker onChange={onChange} defaultValue={moment(today,`YYYY-MM-DD`)}/>
            <Switch defaultChecked checkedChildren="학습" unCheckedChildren="전체" onChange={onChangeToggle} style={{marginLeft : "15px"}}/>
            <DailyData
                data = {data}
                // data = {fakedata}
                labels = {labels}
                subjectColors = {subjectColors}
                isZeroShow = {isZeroShow}
            />
            </div>
            <TimeHeatmap
                data = {data}
                // data = {fakedata}
                labels = {labels}
                subjectColors = {subjectColors}
                isZeroShow = {isZeroShow}
            />
        </div>
    );
}

export default Daily;