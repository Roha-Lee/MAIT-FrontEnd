import TimeHeatmap from "./TimeHeatmap";
import DailyData from "./DailyData";
import { useEffect, useState } from "react";
import axios from "axios";
import {connect} from "react-redux";
import { DailyContainer } from './Daily.styled'
import { changeLogin } from "../../../store";


// const fakedata = {
//     rangeTime : [
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 00:32:00',
//             endTime : '2022-02-09 00:32:20'
//         }, 
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 02:18:00',
//             endTime : '2022-02-09 02:19:00'
//         }, 
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 09:21:00',
//             endTime : '2022-02-09 10:16:00'
//         },
//         {
//             subjectId : 1,
//             subjectName : "Algorithm",
//             color : "#a67ebf",
//             startTime : '2022-02-09 10:35:20',
//             endTime : '2022-02-09 11:39:10'
//         },
//         {
//             subjectId : 2,
//             subjectName : "OS",
//             color : "#bf6d7f",
//             startTime : '2022-02-09 11:41:40',
//             endTime : '2022-02-09 13:12:02'
//         },
//         {
//             subjectId : 2,
//             subjectName : "OS",
//             color : "#bf6d7f",
//             startTime : '2022-02-09 14:35:40',
//             endTime : '2022-02-09 15:22:02'
//         },
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 16:46:00',
//             endTime : '2022-02-09 17:41:00'
//         },
//         {
//             subjectId : 1,
//             subjectName : "Algorithm",
//             color : "#a67ebf",
//             startTime : '2022-02-09 18:01:00',
//             endTime : '2022-02-09 20:04:00'
//         },          
//         {
//             subjectId : 1,
//             subjectName : "Algorithm",
//             color : "#a67ebf",
//             startTime : '2022-02-09 21:52:00',
//             endTime : '2022-02-09 22:07:00'
//         },
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 22:12:00',
//             endTime : '2022-02-09 23:04:00'
//         },          
//         {
//             subjectId : 3,
//             subjectName : "Javascript",
//             color : "#6dbf84",
//             startTime : '2022-02-09 22:17:00',
//             endTime : '2022-02-10 00:00:00'
//         },          
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


function Daily ({dailyDate, isZeroShow, isLogin, setIsLogin}){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/statistics/daily`
    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            // console.log("fetch date",selectDate);
            
            const response = await axios.get(serverUrl, 
                {
                    params : {'today' : dailyDate}, 
                    headers: {Authorization: `${window.sessionStorage.getItem('accessToken')}`}
                });
            // console.log(response.data);
            setData(response.data);
            setIsLogin(true);
        }catch(e){
            setError(e);
            setIsLogin(false);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchData();
    },[dailyDate]);

    // if(loading){
    //     return (<div>로딩중..</div>);
    // }
    // if(error){
    //     return(<div>{error}</div>);
    // }

    
    
    // 테스트용 
    const subjectTotalData = data?.subjectTotalTime;
    // const subjectTotalData = fakedata?.subjectTotalTime;
    
    let labels = [];
    let subjectColors = [];
    // console.log(subjectTotalData);
    
    for(let i = 0 ; i < subjectTotalData?.length ; i++){
        if(isZeroShow){
            labels.push(subjectTotalData[i].subjectName);
            subjectColors.push(subjectTotalData[i].color);
        }else if(subjectTotalData[i].totalTime !== "00:00:00"){
            labels.push(subjectTotalData[i].subjectName);
            subjectColors.push(subjectTotalData[i].color);
        }
    }
    // console.log(labels,subjectColors)
    return (
        <DailyContainer>
            <div>
                <DailyData
                    data = {data}
                    // data = {fakedata}
                    labels = {labels}
                    subjectColors = {subjectColors}
                />
            </div>
            <div>
                <TimeHeatmap
                    data = {data}
                    // data = {fakedata}
                    labels = {labels}
                    subjectColors = {subjectColors}
                />
            </div>
        </DailyContainer>
    );
}

function mapStateToProps(state){
    return{
        dailyDate : state.dailyDate,
        isZeroShow : state.isZeroShow,
        isLogin : state.isLogin,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setIsLogin : isLogin => dispatch(changeLogin(isLogin))
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (Daily);