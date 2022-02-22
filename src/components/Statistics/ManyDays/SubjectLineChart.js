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

    // console.log(startYearDay,targetDate,(targetDate - startYearDay));
    const week = parseInt((targetDate - startYearDay)/(86400000*7))+1;
    // console.log(week)
    if(targetDate?.getDay() < startYearDay?.getDay()){
        return week + 1;
    }
    else{
        return week;
    }
}


function SubjectLineChart ({data,startDate,endDate}){

    // if(startDate !== null && endDate !== null){
        const startDateObj = new Date(startDate);
        const startDateObjCopy = new Date(startDate)
        const endDateObj = new Date(endDate);
    
        const startYearDay = new Date(startDate.slice(0,4)+"-01-01");
        const startW = calWeek(startYearDay,startDateObj);
        const startY = startDateObj.getFullYear();
        const startM = startDateObj.getMonth() + 1;
        const startD = startDateObj.getDate();
        const endW = calWeek(startYearDay,endDateObj);
        const endY = endDateObj.getFullYear(); 
        const endM = endDateObj.getMonth() + 1;
        const endD = endDateObj.getDate();
        const periodD = parseInt((endDateObj-startDateObj)/86400000)+1;
        const periodM = startY === endY ? endM - startM + 1 : (endY - startY - 1)*12 + (13-startM) +(endM);
        // console.log(periodD);
        const dateList = [startDate];
        let iterateDate = startDate;
        
        for (let iD = 0; iD < periodD-1;iD++){
            const iterateDateObj = new Date(startDateObjCopy.setDate(startDateObjCopy.getDate()+1));
            dateList.push(String(iterateDateObj.getFullYear())+"-"+String(iterateDateObj.getMonth()+1).padStart(2,"0")+"-"+String(iterateDateObj.getDate()).padStart(2,"0"));
            iterateDate = String(iterateDateObj.getFullYear())+"-"+String(iterateDateObj.getMonth()+1).padStart(2,"0")+"-"+String(iterateDateObj.getDate()).padStart(2,"0");
        }
        // console.log(dateList);
        // const subjectTotalTime = fakeData.subjectTotalTime;
        const subjectTotalTime = data?.subjectTotalTime;
        // console.log(subjectTotalTime);
        // console.log(subjectTotalTime);
        // const subjectTodo = data?.subjectTodo;
        const subjectColorPair = data?.subjectColorPair;
        // const subjectColorPair = {
        //     "Algorithm" : "#a67ebf",
        //     "OS" : "#bf6d7f",
        //     "Javascript" : "#6dbf84"
        // };
        
        const inputLineDataSet = {labels : null, datasets :[]};
    
        const subjectLabels = [];
        const colorLabels = [];
    
        const subjectIndexColor = {};

        let chartTitle ;

        if(endW - startW < 3){
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
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 1
                }
            },
        };
        // console.log(subjectTodo);
        // console.log(startW,ㄴendW);
    
        if( endW - startW < 3){
            // const timeLabels = [];
            inputLineDataSet["datasets"].push({
                label : "Total",
                data : Array.from({length:periodD},()=>0),
                borderColor : "#000000",
                backgroundColor : "#000000",
                borderDash : [10,10],
                tension : 0.2,
            })

            let i = 1;
            for(const subject in subjectColorPair){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectColorPair[subject]);
                
                
                subjectIndexColor[subject] = [i , subjectColorPair[subject]];

                const dataSetForm ={
                    label : subject,
                    data : Array.from({length:periodD},()=>0),
                    borderColor : subjectColorPair[subject],
                    backgroundColor : subjectColorPair[subject],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                i = i+1;
            }

            let totalIndex = 0;
            for(let p=0 ; p < dateList.length ;p++){
                const studyDate = dateList[p]
                // console.log(startDate);
                // timeLabels.push(studyDate.slice(5,10));
                const totalList = subjectTotalTime !== undefined ? subjectTotalTime[studyDate] : undefined;
                // console.log(studyDate, totalList);
                let sumTime = 0;
                for(const subject1 in subjectColorPair){
                    let totalTimeFlt;
                    if(totalList !== undefined && subject1 in totalList){
                        const totalTimeStr = totalList[subject1]["totalTime"];
                        const currentIdx = subjectIndexColor[subject1][0];
                        // console.log(currentIdx);
                        // console.log(inputLineDataSet["datasets"][currentIdx]);
                        totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                        // inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
                        inputLineDataSet["datasets"][currentIdx]["data"][p] = totalTimeFlt;

                    }else{
                        totalTimeFlt = 0.0;
                    }

                    sumTime = sumTime + totalTimeFlt;
                }
                inputLineDataSet["datasets"][0]["data"][totalIndex] = sumTime;
                totalIndex = totalIndex + 1; 
            }
            inputLineDataSet["labels"] = dateList.map(k=>k.slice(5,10));
    
    
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
            for(const subject in subjectColorPair){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectColorPair[subject]);
                
                
                subjectIndexColor[subject] = [x , subjectColorPair[subject]];

                const dataSetForm ={
                    label : subject,
                    data : Array.from({length : endW-startW+1}, ()=> 0),
                    borderColor : subjectColorPair[subject],
                    backgroundColor : subjectColorPair[subject],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                x = x+1;
            }
            
            let curruntW = startW;
            let i = 0;
            timeLabels.push("ww"+curruntW);
            let sumTime = 0;
            for(let q = 0 ; q < dateList.length ; q++){
                const studyDate = dateList[q];
                // console.log(studyDate);
                if(calWeek(startYearDay,new Date(studyDate)) !== curruntW){
                    curruntW = calWeek(startYearDay ,new Date(studyDate));
                    timeLabels.push("ww"+curruntW);
                    inputLineDataSet["datasets"][0]["data"][i] = sumTime;
                    i = i+1;
                    sumTime = 0;
                }
                // const totalList = subjectTotalTime[studyDate];
                const totalList = subjectTotalTime !== undefined ? subjectTotalTime[studyDate] : undefined;
                for(const subject in subjectColorPair){
                    const currentIdx = subjectIndexColor[subject][0];
                    let totalTimeFlt;
                    if(totalList !== undefined && subject in totalList){
                        const totalTimeStr = totalList[subject]["totalTime"];
                        totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    }else{
                        totalTimeFlt = 0;
                    }
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
                data : Array.from({length:periodM},()=>0),
                borderColor : "#000000",
                backgroundColor : "#000000",
                borderDash : [10,10],
                tension : 0.2,
            })
            let x = 1;
            for(const subject in subjectColorPair){
                subjectLabels.push(subject);
                // console.log(subject, subjectTodo[subject]);
                colorLabels.push(subjectColorPair[subject]);               
                subjectIndexColor[subject] = [x , subjectColorPair[subject]];

                const dataSetForm ={
                    label : subject,
                    data : Array.from({length : periodM}, ()=> 0),
                    borderColor : subjectColorPair[subject],
                    backgroundColor : subjectColorPair[subject],
                    tension : 0.2,
                }
                inputLineDataSet["datasets"].push(dataSetForm);
        
                x = x+1;
            }
            let curruntM = startM;
            let i = 0;
            timeLabels.push(monthPair[curruntM]);
            let sumTime = 0;
            for(let r=0 ; r < dateList.length ; r++){
                const studyDate = dateList[r];
                // console.log(studyDate.getMonth()+1);
                if(new Date(studyDate).getMonth()+1 !== curruntM){
                    if(curruntM === 12){
                        curruntM = 1;
                    }else{
                        curruntM += 1
                    }
                    // curruntM = new Date(studyDate).getMonth()+1;
                    timeLabels.push(monthPair[curruntM]);
                    // console.log(sumTime);
                    inputLineDataSet["datasets"][0]["data"][i] = sumTime;
                    i = i+1;
                    sumTime = 0;
                }
                // const totalList = subjectTotalTime[studyDate];
                const totalList = subjectTotalTime !== undefined ? subjectTotalTime[studyDate] : undefined;
                for(const subject in subjectColorPair){
                    const currentIdx = subjectIndexColor[subject][0];
                    // console.log(totalList);
                    let totalTimeFlt;
                    if(totalList !== undefined && subject in totalList){
                        const totalTimeStr = totalList[subject]["totalTime"];
                        // console.log(totalTimeStr, "idx : ",currentIdx , i);
                        totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                        console.log(totalTimeFlt);
                    }else{
                        totalTimeFlt = 0;
                    }
                    inputLineDataSet["datasets"][currentIdx]["data"][i] = inputLineDataSet["datasets"][currentIdx]["data"][i] + totalTimeFlt;
                    sumTime = sumTime + totalTimeFlt; 
                }
            }
            inputLineDataSet["datasets"][0]["data"][i] = sumTime;
            inputLineDataSet["labels"] = timeLabels;
        }

        // }
        console.log(inputLineDataSet);



    return (
        <Line
            data = {inputLineDataSet}
            options={subjectLineOptions}
        />


    );
}

export default SubjectLineChart;