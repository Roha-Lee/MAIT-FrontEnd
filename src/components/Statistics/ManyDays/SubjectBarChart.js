import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


function SubjectBarChart ({data}){

    // const fakeData = {
    //     'subjectTotalTime' : {
    //         "2022-02-13" : {
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
    //         "2022-02-14" : {
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
    //         "2022-02-15" : {
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
    //     },
    //     'subjectTodo' : {
    //         'Algorithm' : [0.92 , "#a67ebf"],
    //         'OS' : [0.73,"#bf6d7f"],
    //         'Javascript' : [0.82,"#6dbf84"],
    //     }, 
    // }

    
    const subjectTotalTime = data.subjectTotalTime;
    const subjectTodo = data.subjectTodo;
    // const subjectTotalTime = fakeData.subjectTotalTime;
    // const subjectTodo = fakeData.subjectTodo;
    
    const inputSubjectBarData = [];

    const subjectLabels = [];
    const colorLabels = [];
    const timeLabels = [];

    const subjectIndexColor = {};

    const subjectBarOptions = {
        responsive: true,
        plugins: {
        legend: {
            display: true,
        },
        title: {
            display: true,
            text: '과목별 총 학습시간(hr)',
        },
        },
        maintainAspectRatio : false,
    
    };
    
    // console.log(subjectTodo);

    let i = 0;
    for(const subject in subjectTodo){
        subjectLabels.push(subject);
        // console.log(subject, subjectTodo[subject]);
        colorLabels.push(subjectTodo[subject][1]);
        
        subjectIndexColor[subject] = [i , subjectTodo[subject][1]];
        inputSubjectBarData.push(0);
        
        i = i+1;
    }
    // console.log(startW,endW);

    
    for(const studyDate in subjectTotalTime){
        // console.log(startDate);
        timeLabels.push(studyDate);
        const totalList = subjectTotalTime[studyDate];
        // console.log(studyDate, totalList);
        for(const subject1 in totalList){
            const totalTimeStr = totalList[subject1]["totalTime"];
            const currentIdx = subjectIndexColor[subject1][0];
            const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
            inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
        }
    }


    const dataSubjectBarObj = {
        labels : subjectLabels,
        datasets : [
            {
                borderWidth : 1,
                data : inputSubjectBarData,
                backgroundColor : colorLabels,
            }
        ]
    };
    



    return (

        <Pie
            data = {dataSubjectBarObj}
            options = {subjectBarOptions}
        />

    );
}

export default SubjectBarChart