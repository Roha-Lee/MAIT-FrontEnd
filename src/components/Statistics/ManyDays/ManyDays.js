import React, {useEffect, useState} from "react";
import axios from "axios";
import SubjectBarChart from "./SubjectBarChart";
import TodoBarChart from "./TodoBarChart";
import SubjectLineChart from "./SubjectLineChart";
import {connect} from "react-redux";
import { ManyDaysStatistics, ChartContainer, UpperContainer, SubjectBar, Todobar, SubjectLine, SubjectBarTitleContainer, SubjectBarTitle , TodobarTitleContainer, TodobarTitle, SubjectLineTitle} from './ManyDays.styled'
import { changeLogin } from "../../../store";

function ManyDays ({startDate,endDate,setIsLogin}){
    const [data , setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/statistics/period`;
    const fetchData = async (startDate , endDate) => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const response = await axios.get(serverUrl,{params : {'startDate' : startDate , 'endDate' : endDate}, headers: {Authorization: `${window.sessionStorage.getItem('accessToken')}`}});
            // console.log(response.data);
            setData(response.data);
            setIsLogin(true);
        }catch(e){
            setError(e);
            setIsLogin(false);
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
    //         "2022-03-01" : {
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
        <ManyDaysStatistics>
            <ChartContainer>
                <UpperContainer>
                    <SubjectBar>
                        <SubjectBarTitleContainer>
                            <SubjectBarTitle><span>과목별 학습시간</span><div /></SubjectBarTitle>
                        </SubjectBarTitleContainer>
                        <SubjectBarChart 
                            data = {data}
                            // data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </SubjectBar>
                    <Todobar>
                    <TodobarTitleContainer>
                        <TodobarTitle><span>할 일 달성률</span><div/></TodobarTitle>
                    </TodobarTitleContainer>
                        <TodoBarChart 
                            data = {data}
                            // data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                    </Todobar>
                    </UpperContainer>
                    <SubjectLine>
                        <div>
                            <SubjectLineTitle><span>일자별 학습시간</span><div/></SubjectLineTitle>
                        </div>
                        <SubjectLineChart 
                            startDate = {startDate}
                            endDate = {endDate}
                            data = {data}
                            // data = {fakeData}
                            // click = {click}
                            // setClick = {setClick}
                        />
                        </SubjectLine>
                    </ChartContainer>
        </ManyDaysStatistics>
    );
}

function mapStateToProps(state){
    return{
        startDate : state.startDate,
        endDate : state.endDate,
        isLogin : state.isLogin,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setIsLogin : isLogin => dispatch(changeLogin(isLogin))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ManyDays);