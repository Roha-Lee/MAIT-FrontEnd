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

function calWeek(startYearDay,targetDate){

    // console.log(startYearDay,targetDate,(targetDate - startYearDay),oneYear);
    const week = parseInt((targetDate - startYearDay)/(86400000*7))+1;
    // console.log(week)
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
        const subjectTotalTime = data?.subjectTotalTime;
        const subjectTodo = data?.subjectTodo;
        
        const inputLineDataSet = {labels : null, datasets :[]};
    
        const subjectLabels = [];
        const colorLabels = [];
    
        const subjectIndexColor = {};

        let chartTitle ;

        if(endW === startW){
            chartTitle = "일자별 학습시간(hr)";
        }
        else if (endW - startW < 10){
            chartTitle = "주차별 학습시간(hr)";
        }else{
            chartTitle = "월별 학습시간(hr)";
        }

        const subjectLineOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: chartTitle,
                },
                datalabels : {
                    display: false,
                    // formatter : (value) => {return;},
                },
            },
            maintainAspectRatio : false,
            borderJoinStyle : "round",
        };
        // console.log(subjectTodo);
        // console.log(startW,ㄴendW);
    
        if( endW - startW < 3){
            const timeLabels = [];
            inputLineDataSet["datasets"].push({
                label : "Total",
                data : Array.from({length:endD-startD+1},()=>0),
                borderColor : "#000000",
                backgroundColor : "#000000",
                borderDash : [10,10],
                tension : 0.2,
            })

            let i = 1;
            for(const subject in subjectTodo){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectTodo[subject][1]);
                
                
                subjectIndexColor[subject] = [i , subjectTodo[subject][1]];

                const dataSetForm ={
                    label : subject,
                    data : [],
                    borderColor : subjectTodo[subject][1],
                    backgroundColor : subjectTodo[subject][1],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                i = i+1;
            }

            let totalIndex = 0;
            for(const studyDate in subjectTotalTime){
                // console.log(startDate);
                timeLabels.push(studyDate.slice(5,10));
                const totalList = subjectTotalTime[studyDate];
                // console.log(studyDate, totalList);
                let sumTime = 0;
                for(const subject1 in totalList){
                    const totalTimeStr = totalList[subject1]["totalTime"];
                    const currentIdx = subjectIndexColor[subject1][0];
                    // console.log(currentIdx);
                    // console.log(inputLineDataSet["datasets"][currentIdx]);
                    const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    // inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
                    inputLineDataSet["datasets"][currentIdx]["data"].push(totalTimeFlt);
                    sumTime = sumTime + totalTimeFlt;
                }
                inputLineDataSet["datasets"][0]["data"][totalIndex] = sumTime;
                totalIndex = totalIndex + 1; 
            }
            inputLineDataSet["labels"] = timeLabels;
    
    
        }
        else if(endW - startW < 10){
            const timeLabels = [];
            
            inputLineDataSet["datasets"].push({
                label : "Total",
                data : Array.from({length:endW-startW+1},()=>0),
                borderColor : "#000000",
                backgroundColor : "#000000",
                borderDash : [10,10],
                tension : 0.2,
            })
            let x = 1;
            for(const subject in subjectTodo){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectTodo[subject][1]);
                
                
                subjectIndexColor[subject] = [x , subjectTodo[subject][1]];

                const dataSetForm ={
                    label : subject,
                    data : Array.from({length : endW-startW+1}, ()=> 0),
                    borderColor : subjectTodo[subject][1],
                    backgroundColor : subjectTodo[subject][1],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                x = x+1;
            }
            
            let curruntW = startW;
            let i = 0;
            timeLabels.push("ww"+curruntW);
            let sumTime = 0;
            for(const studyDate in subjectTotalTime){
                if(calWeek(startYearDay,new Date(studyDate)) !== curruntW){
                    curruntW = calWeek(startYearDay ,new Date(studyDate));
                    timeLabels.push("ww"+curruntW);
                    inputLineDataSet["datasets"][0]["data"][i] = sumTime;
                    i = i+1;
                    sumTime = 0;
                }
                const totalList = subjectTotalTime[studyDate];
                for(const subject in totalList){
                    const totalTimeStr = totalList[subject]["totalTime"];
                    const currentIdx = subjectIndexColor[subject][0];
                    const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    inputLineDataSet["datasets"][currentIdx]["data"][i] = inputLineDataSet["datasets"][currentIdx]["data"][i] + totalTimeFlt;
                    sumTime = sumTime + totalTimeFlt; 
                }
            }
            inputLineDataSet["datasets"][0]["data"][i] = sumTime;
            inputLineDataSet["labels"] = timeLabels;
        }else{
            const timeLabels = [];
            const monthPair = {
                1 : "Jan",
                2 : "Feb",
                3 : "Mar",
                4 : "Apr",
                5 : "May",
                6 : "Jun",
                7 : "Jul",
                8 : "Aug",
                9 : "Sep",
                10 : "Oct",
                11 : "Nov",
                12 : "Dec",
            }
            
            inputLineDataSet["datasets"].push({
                label : "Total",
                data : Array.from({length:endM-startM+1},()=>0),
                borderColor : "#000000",
                backgroundColor : "#000000",
                borderDash : [10,10],
                tension : 0.2,
            })
            let x = 1;
            for(const subject in subjectTodo){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectTodo[subject][1]);               
                subjectIndexColor[subject] = [x , subjectTodo[subject][1]];

                const dataSetForm ={
                    label : subject,
                    data : Array.from({length : endM-startM+1}, ()=> 0),
                    borderColor : subjectTodo[subject][1],
                    backgroundColor : subjectTodo[subject][1],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                x = x+1;
            }
            let curruntM = startM;
            let i = 0;
            timeLabels.push(monthPair[curruntM]);
            let sumTime = 0;
            for(const studyDate in subjectTotalTime){
                if(calWeek(new Date(studyDate).getMonth()+1) !== curruntM){
                    curruntM = new Date(studyDate).getMonth()+1;
                    timeLabels.push(monthPair[curruntM]);
                    inputLineDataSet["datasets"][0]["data"][i] = sumTime;
                    i = i+1;
                    sumTime = 0;
                }
                const totalList = subjectTotalTime[studyDate];
                for(const subject in totalList){
                    const totalTimeStr = totalList[subject]["totalTime"];
                    const currentIdx = subjectIndexColor[subject][0];
                    const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    inputLineDataSet["datasets"][currentIdx]["data"][i] = inputLineDataSet["datasets"][currentIdx]["data"][i] + totalTimeFlt;
                    sumTime = sumTime + totalTimeFlt; 
                }
            }
            inputLineDataSet["datasets"][0]["data"][i] = sumTime;
            inputLineDataSet["labels"] = timeLabels;
        }

        // }
        // console.log(inputLineDataSet);



    return (
        <Line
            data = {inputLineDataSet}
            options={subjectLineOptions}
        />


    );
}

export default SubjectLineChart;