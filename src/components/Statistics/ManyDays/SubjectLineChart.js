import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const oneYear = new Date("2022-12-31") - new Date("2022-01-01");

function calWeek(startYearDay,targetDate){
    
    const week = parseInt((targetDate - startYearDay)/oneYear)+1;
    if(targetDate.getDay() < startYearDay.getDay()){
        return week + 1;
    }
    else{
        return week;
    }
}


function SubjectLineChart ({data,startDate,endDate}){

    // if(startDate !== null && endDate !== null){
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
        const startYearDay = new Date(startDate.slice(0,4)+"-01-01");
        const startW = calWeek(startYearDay,startDateObj);
        const startM = startDateObj.getMonth() + 1;
        const startD = startDateObj.getDate();
        const endW = calWeek(startYearDay,endDateObj); 
        const endM = endDateObj.getMonth() + 1;
        const endD = endDateObj.getDate();
        
        // const subjectTotalTime = fakeData.subjectTotalTime;
        // const subjectTodo = fakeData.subjectTodo;
        const subjectTotalTime = data.subjectTotalTime;
        const subjectTodo = data.subjectTodo;
        
        const inputLineDataSet = {labels : null, datasets :[]};
    
        const subjectLabels = [];
        const colorLabels = [];
        const timeLabels = [];
    
        const subjectIndexColor = {};
    
        const subjectLineOptions = {
            responsive: true,
            plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '일자별 학습시간',
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

            const dataSetForm ={
                label : subject,
                data : [],
                borderColor : subjectTodo[subject][1],
            }
            inputLineDataSet["datasets"].push(dataSetForm);
    
            i = i+1;
        }
        // console.log(startW,endW);
    
        if( endW === startW ){
            for(const studyDate in subjectTotalTime){
                // console.log(startDate);
                timeLabels.push(studyDate.slice(5,10));
                const totalList = subjectTotalTime[studyDate];
                console.log(studyDate, totalList);
                for(const subject1 in totalList){
                    const totalTimeStr = totalList[subject1]["totalTime"];
                    const currentIdx = subjectIndexColor[subject1][0];
                    // console.log(currentIdx);
                    // console.log(inputLineDataSet["datasets"][currentIdx]);
                    const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    // inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
                    inputLineDataSet["datasets"][currentIdx]["data"].push(totalTimeFlt);
                }
            }
            inputLineDataSet["labels"] = timeLabels;
    
    
        }
        else if(endW - startW < 10){
    
    
    
    
        }else{
    
    
    
    
    
    
        }
   
        // }




    return (
        <Line
            data = {inputLineDataSet}
            options={subjectLineOptions}
        />


    );
}

export default SubjectLineChart;