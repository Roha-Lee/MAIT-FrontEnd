import style from "./ManyDays.module.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import SubjectBarChart from "./SubjectBarChart";
import TodoBarChart from "./TodoBarChart";
import SubjectLineChart from "./SubjectLineChart";


function ManyDays ({startDate,endDate}){
    const [data , setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const yongHourl = "http://192.249.29.5:3001/statistics/period";
    const jongHourl = "http://143.248.196.37:3001/statistics/period";
    const serverUrl = "https://mait.shop/statistics/period"
    const fetchData = async (startDate , endDate) => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            // console.log(startDate,endDate);
            const response = await axios.get(serverUrl,{params : {'startDate' : startDate , 'endDate' : endDate}, headers: {Authorization: `${window.sessionStorage.getItem('accessToken')}`}});
            console.log(response.data);
            setData(response.data)
        }catch(e){
            setError(e);
        }

        setLoading(false);

    };

    // const fakeData = {
    //     'subjectTotalTime' : {
    //         "2022-02-18" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '03:12:32' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '02:54:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '05:22:00' //누적 시간
    //             },
    //         },
    //         "2022-02-19" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '01:56:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '04:21:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '04:32:00' //누적 시간
    //             },
    //         },
    //         "2022-02-20" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '01:56:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '06:02:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '02:11:00' //누적 시간
    //             },
    //         },
    //         "2022-02-21" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '00:56:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '02:12:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '03:45:00' //누적 시간
    //             },
    //         },
    //         "2022-02-22" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '04:12:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '03:23:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '01:34:00' //누적 시간
    //             },
    //         },
    //         "2022-02-23" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '07:12:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '00:12:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '05:52:00' //누적 시간
    //             },
    //         },
    //         "2022-02-24" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '02:53:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '01:32:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '04:16:00' //누적 시간
    //             },
    //         },
    //         "2022-02-25" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '02:45:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '02:54:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '03:13:00' //누적 시간
    //             },
    //         },
    //         "2022-02-26" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '00:56:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '08:02:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '04:32:00' //누적 시간
    //             },
    //         },
    //         "2022-02-27" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '02:34:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '01:23:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '07:26:00' //누적 시간
    //             },
    //         },
    //         "2022-02-28" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '04:26:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '05:23:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '00:00:00' //누적 시간
    //             },
    //         },
    //         "2022-03-01" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '00:00:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '00:00:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '02:13:00' //누적 시간
    //             },
    //         },
    //         "2022-03-02" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '04:23:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '01:23:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '05:12:00' //누적 시간
    //             },
    //         },
    //         "2022-03-03" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '00:56:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '02:27:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '01:54:00' //누적 시간
    //             },
    //         },
    //         "2022-03-04" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '03:23:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '04:23:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '04:23:00' //누적 시간
    //             },
    //         },
    //         "2022-03-05" : {
    //             "Algorithm" : { 
    //                 color : "#a67ebf",
    //                 totalTime : '02:51:00' //누적 시간
    //             },
    //             "OS" : { 
    //                 color : "#bf6d7f",
    //                 totalTime : '01:52:00' //누적 시간
    //             },
    //             "Javascript" : { 
    //                 color : "#6dbf84",
    //                 totalTime : '03:27:00' //누적 시간
    //             },
    //         },
    //     },
    //     'subjectTodo' : {
    //         'Algorithm' : [0.92 , "#a67ebf"],
    //         'OS' : [0.73,"#bf6d7f"],
    //         'Javascript' : [0.82,"#6dbf84"],
    //     }, 
    // }

    // setData(fakeData);

    

    useEffect(()=>{
        // console.log(range, "첫 로딩");
        fetchData(startDate,endDate);
    },[startDate,endDate]);

    return (
        <div className={style.statistics}>
            <div className={style.rangepicker}>
            
            </div>
            
            <div className={style.chartcontainer}>
                <div className={style.uppercontainer}>
                    <div className={style.subjectbar}>
                        <div className={style.subjectbartitlecontainer}>
                            <h1 className={style.subjectbartitle}>Overall Summary</h1>
                        </div>
                        <SubjectBarChart 
                            data = {data}
                            // data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </div>
                    <div className={style.todobar}>
                    <div className={style.todobartitlecontainer}>
                        <h1 className={style.todobartitle}>Achievement Rate</h1>
                    </div>
                        <TodoBarChart 
                            data = {data}
                            // data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </div>
                </div>
                <div className={style.subjectline}>
                    <div className={style.subjectlinecontainer}>
                        <h1 className={style.subjectlinetitle}>Overall Period Data</h1>
                    </div>
                    <SubjectLineChart 
                        startDate = {startDate}
                        endDate = {endDate}
                        data = {data}
                        // data = {fakeData}
                        // click = {click}
                        // setClick = {setClick}
                    />
                </div>
            </div>

            
        </div>
    );
}

export default ManyDays;