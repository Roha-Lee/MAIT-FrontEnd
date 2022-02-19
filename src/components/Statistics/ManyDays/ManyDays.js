import style from "./ManyDays.module.css"
import React, {useState} from "react";
import { DatePicker, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import axios from "axios";
import SubjectBarChart from "./SubjectBarChart";
import TodoBarChart from "./TodoBarChart";
import SubjectLineChart from "./SubjectLineChart";



function ManyDays (){
    const [range, setRange] = useState([]);
    const [click , setClick] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    let data;
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
            "2022-02-13" : {
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
            "2022-02-14" : {
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
            "2022-02-15" : {
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
        // console.log(typeof range , typeof range[0],range[1])
        setClick(true);
        setStartDate(range[0]);
        setEndDate(range[1]);

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
                        <SubjectBarChart 
                            data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </div>
                    <div className={style.todobar}>
                        <TodoBarChart 
                            data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </div>
                </div>
                <div className={style.subjectline}>
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