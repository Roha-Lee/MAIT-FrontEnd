import style from "./ManyDays.module.css"
import React, {useState} from "react";
import { DatePicker, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import axios from "axios";
import SubjectBarChart from "./SubjectBarChart";
import TodoBarChart from "./TodoBarChart";
import SubjectLineChart from "./SubjectLineChart";

const todayY = parseInt(new Date().toJSON().slice(0,4));
const todayM = parseInt(new Date().toJSON().slice(5,7));
const todayD = parseInt(new Date().toJSON().slice(8,10));

function ManyDays (){
    const [range, setRange] = useState([]);
    const [click , setClick] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data , setDate] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    
    // const fetchData = async (startDate , endDate) => {
    //     try {
    //         setError(null);
    //         setData(null);
    //         setLoading(true);
    
    //         const response = await axios.get("http://192.249.29.38:3001/statistics",{'startDate' : startDate , 'endDate' : endDate});
    //         data = response.data
    //     }catch(e){
    //         setError(e);
    //     }

    //     setLoading(false);

    // };

    const fakeData = {
        'subjectTotalTime' : {
            "2022-02-18" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '03:12:32' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '02:54:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '05:22:00' //누적 시간
                },
            },
            "2022-02-19" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '01:56:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '04:21:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '04:32:00' //누적 시간
                },
            },
            "2022-02-20" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '01:56:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '06:02:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '02:11:00' //누적 시간
                },
            },
            "2022-02-21" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '00:56:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '02:12:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '03:45:00' //누적 시간
                },
            },
            "2022-02-22" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '04:12:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '03:23:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '01:34:00' //누적 시간
                },
            },
            "2022-02-23" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '07:12:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '00:12:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '05:52:00' //누적 시간
                },
            },
            "2022-02-24" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '02:53:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '01:32:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '04:16:00' //누적 시간
                },
            },
            "2022-02-25" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '02:45:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '02:54:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '03:13:00' //누적 시간
                },
            },
            "2022-02-26" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '00:56:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '08:02:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '04:32:00' //누적 시간
                },
            },
            "2022-02-27" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '02:34:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '01:23:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '07:26:00' //누적 시간
                },
            },
            "2022-02-28" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '04:26:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '05:23:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '00:00:00' //누적 시간
                },
            },
            "2022-03-01" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '00:00:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '00:00:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '02:13:00' //누적 시간
                },
            },
            "2022-03-02" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '04:23:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '01:23:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '05:12:00' //누적 시간
                },
            },
            "2022-03-03" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '00:56:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '02:27:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '01:54:00' //누적 시간
                },
            },
            "2022-03-04" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '03:23:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '04:23:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '04:23:00' //누적 시간
                },
            },
            "2022-03-05" : {
                "Algorithm" : { 
                    color : "#a67ebf",
                    totalTime : '02:51:00' //누적 시간
                },
                "OS" : { 
                    color : "#bf6d7f",
                    totalTime : '01:52:00' //누적 시간
                },
                "Javascript" : { 
                    color : "#6dbf84",
                    totalTime : '03:27:00' //누적 시간
                },
            },
        },
        'subjectTodo' : {
            'Algorithm' : [0.92 , "#a67ebf"],
            'OS' : [0.73,"#bf6d7f"],
            'Javascript' : [0.82,"#6dbf84"],
        }, 
    }

    // setData(fakeData);

    const onChange = (value, dateString) => {
        setRange(dateString)
    }

    const onOk = () => {

        if(parseInt(range[1].slice(0,4)) > todayY){
            alert("기간을 다시 선택해 주세요!");
        }else if(parseInt(range[1].slice(5,7)) > todayM){
            alert("기간을 다시 선택해 주세요!");
        }else if(parseInt(range[1].slice(8,10)) > todayD){
            alert("기간을 다시 선택해 주세요!");
        }else{
            setClick(true);
            setStartDate(range[0]);
            setEndDate(range[1]);
            // console.log(,endDate);
            // fetchData(range[0],range[1]);
        }
        // console.log(typeof range , typeof range[0],range[1])
        
        // fetchData(range[0],range[1]);
        
    }

    return (
        <div className={style.statistics}>
            <div className={style.rangepicker}>
            <RangePicker onChange={onChange}/>
            <Tooltip title="search">
                <Button 
                    onClick={onOk}
                    type="primary" 
                    shape="circle" 
                    icon={<SearchOutlined />} 
                    size="large" 
                />
            </Tooltip>
            </div>
            {click ?
            <div className={style.chartcontainer}>
                <div className={style.uppercontainer}>
                    <div className={style.subjectbar}>
                        <div className={style.subjectbartitlecontainer}>
                            <h1 className={style.subjectbartitle}>Overall Summary</h1>
                        </div>
                        <SubjectBarChart 
                            data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </div>
                    <div className={style.todobar}>
                    <div className={style.todobartitlecontainer}>
                        <h1 className={style.todobartitle}>Achievement Rate</h1>
                    </div>
                        <TodoBarChart 
                            data = {fakeData}
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
                        data = {fakeData}
                        // click = {click}
                        // setClick = {setClick}
                    />
                </div>
            </div>
            : null}

            
        </div>
    );
}

export default ManyDays;