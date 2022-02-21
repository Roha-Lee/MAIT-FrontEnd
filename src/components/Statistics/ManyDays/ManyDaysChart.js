import { 
    Chart as ChartJS,CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, 
} from "chart.js";
import { Bar , Line } from 'react-chartjs-2';
import style from "./ManyDaysChart.module.css"

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

function ManyDaysChart ({startDate,endDate,data}) {
    // console.log(startDate , endDate);
    if(startDate !== undefined && endDate !== undefined){
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const startYearDay = new Date(startDate.slice(0,4)+"-01-01");
        const startW = calWeek(startYearDay,startDateObj);
        const startM = startDateObj.getMonth() + 1;
        const startD = startDateObj.getDate();
        const endW = calWeek(startYearDay,endDateObj); 
        const endM = endDateObj.getMonth() + 1;
        const endD = endDateObj.getDate();
        
        const subjectTotalTime = data?.subjectTotalTime;
        const subjectTodo = data?.subjectTodo;
        
        const inputSubjectBarData = [];
        const inputTodoBarData = [];
        const inputLineDataSet = {labels : null, datasets :[]};

        const subjectLabels = [];
        const colorLabels = [];
        const timeLabels = [];

        const subjectIndexColor = {};

        const subjectBarOptions = {
            responsive: true,
            plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '과목별 총 학습시간',
            },
            },
            maintainAspectRatio : false,
        
        };
        const todoBarOptions = {
            responsive: true,
            plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '과목별 Todo 달성률',
            },
            },
            maintainAspectRatio : false,
        
        };
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
            
            const percentTodo = (subjectTodo[subject][0]*100).toFixed(1);
            
            if(percentTodo == 100){
                inputTodoBarData.push(parseInt(percentTodo));
            }else{
                inputTodoBarData.push(parseFloat(percentTodo));
            }
            
            subjectIndexColor[subject] = [i , subjectTodo[subject][1]];
            inputSubjectBarData.push(0);
            
            const dataSetForm ={
                label : subject,
                data : [],
                borerColor : subjectTodo[subject][1],
            }
            inputLineDataSet["datasets"].push(dataSetForm);

            i = i+1;
        }
        // console.log(startW,endW);

        if( endW === startW ){
            for(const studyDate in subjectTotalTime){
                // console.log(startDate);
                timeLabels.push(studyDate);
                const totalList = subjectTotalTime[studyDate];
                console.log(studyDate, totalList);
                for(const subject1 in totalList){
                    const totalTimeStr = totalList[subject1]["totalTime"];
                    const currentIdx = subjectIndexColor[subject1][0];
                    console.log(currentIdx);
                    console.log(inputLineDataSet["datasets"][currentIdx]);
                    const totalTimeFlt = parseFloat((parseInt(totalTimeStr.slice(0,2)) + parseInt(totalTimeStr.slice(3,5))/60).toFixed(1));
                    inputSubjectBarData[currentIdx] = parseFloat((inputSubjectBarData[currentIdx] + totalTimeFlt).toFixed(1)); 
                    inputLineDataSet["datasets"][currentIdx]["data"].push(totalTimeFlt);
                }
            }
            inputLineDataSet["labels"] = timeLabels;


        }
        else if(endW - startW < 10){




        }else{






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
        const dataTodoBarObj = {
            labels : subjectLabels,
            datasets : [
                {
                    borderWidth : 1,
                    data : inputTodoBarData,
                    backgroundColor : colorLabels,
                }
            ]
        };
        console.log(dataTodoBarObj);
        
        // useEffect(()=>{setClick(!click)},[])
        
        return (
            <div >
    
    
                {/* <Bar
                    options={subjectBarOptions}
                    data = {dataSubjectBarObj}
                /> */}
                <Bar
                    options={todoBarOptions}
                    data = {dataTodoBarObj}
                />
                {/* <Line
                    options={subjectLineOptions}
                    data = {inputLineDataSet}
                /> */}
            
            </div>
        );
    }
    else{
        // setClick(!click);
        return null;
    }    
}

export default ManyDaysChart 