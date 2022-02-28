import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels"
ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels);


function SubjectBarChart ({data}){
    
    const subjectTotalTime = data?.subjectTotalTime;
    const subjectColorPair = data?.subjectColorPair;
    // const subjectColorPair = {
    //     "Algorithm" : "#a67ebf",
    //     "OS" : "#bf6d7f",
    //     "Javascript" : "#6dbf84"
    // };
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
                display: false,
                text: '과목별 총 학습시간(hr)',
            },
            datalabels : {
                // display: true,
                formatter : (value) => {
                    if(value !== 0){
                        return Math.round(value) + " hr"
                    }else{
                        return null
                    }
                },
                font : {
                    weight : "bold",
                    size : "15rem"
                },
                color : "#EEE7E1"
            },
        },
        maintainAspectRatio : false,

    
    
    };
    
    // console.log(subjectTodo);

    let i = 0;
    for(const subject in subjectColorPair){
        subjectLabels.push(subject);
        // console.log(subject, subjectTodo[subject]);
        colorLabels.push(subjectColorPair[subject]);
        
        subjectIndexColor[subject] = [i , subjectColorPair[subject]];
        inputSubjectBarData.push(0);
        
        i = i+1;
    }
    // console.log(startW,endW);

    
    for(const studyDate in subjectTotalTime){
        // console.log(startDate);
        timeLabels.push(studyDate);
        const totalList = subjectTotalTime[studyDate];
        // console.log(studyDate, totalList);
        for(const subject1 in subjectColorPair){
            if(totalList[subject1] !== undefined){
                const totalTimeStr = totalList[subject1]["totalTime"];
                const currentIdx = subjectIndexColor[subject1][0];
                const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
            }
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