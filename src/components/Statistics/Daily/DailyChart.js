import style from "./DailyChart.module.css";
import { 
    Chart as ChartJS,CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, } from "chart.js";
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels"
ChartJS.register(LinearScale, Tooltip, Legend,ChartDataLabels);

function DailyChart ({data , labels, subjectColors, isZeroShow}){
    
    const subjectTotalData = data?.subjectTotalTime;
    
    let dataInput = [];
    // let totalTime = 0;
    
    
    for(let i = 0 ; i < subjectTotalData?.length ; i++){
        
        const timeStr = subjectTotalData[i].totalTime;
        const hour = parseInt(timeStr.slice(0,2));
        const minute = parseInt(timeStr.slice(3,5));
        if(isZeroShow){
            dataInput.push(parseFloat((hour + minute/60).toFixed(1)));
        }else if(timeStr !== "00:00:00"){
            dataInput.push(parseFloat((hour + minute/60).toFixed(1)));
        }
        // console.log((minute/60).toFixed(1))
        // console.log(parseFloat((hour + minute/60).toFixed(1)))
        // totalTime = totalTime + hour * 60 + minute;
    }
    // console.log(dataInput);
    const dataChart = {
        labels,
        datasets : [
            {
                borderWidth : 0.5,
                data : dataInput,
                backgroundColor : subjectColors,
            }
        ]
    };
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '과목별 학습시간(hr)',
                
            },
            datalabels : {
                display: false,
                // formatter : (value) => {return;},
            },
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                suggestedMax: 8
            }
        },
        maxBarThickness : 40,
        
    
    };
    console.log(dataChart);

    return (
<div className={style.dailychart}>
            <Bar options={options} data={dataChart}/>
        </div>
    );
}

export default DailyChart;