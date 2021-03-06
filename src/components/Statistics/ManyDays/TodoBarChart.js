import { 
    Chart as ChartJS,CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, 
} from "chart.js";
import { Bar} from 'react-chartjs-2';


function TodoBarChart ({data}){

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
        

        // const subjectTodo = fakeData.subjectTodo;
        const subjectTodo = data?.subjectTodo;
        const subjectColorPair = data?.subjectColorPair;
        
        const inputTodoBarData = [];
    
        const subjectLabels = [];
        const colorLabels = [];
    
        const todoBarOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    labels : {
                        filter : (legendItem , data) => data.datasets[0].data[legendItem.index] != 0
                    },
                },
                title: {
                    display: false,
                    text: '과목별 Todo 달성률(%)',
                },
                datalabels : {
                    display: false,
                    // formatter : (value) => {return;},
                },
            },
            maintainAspectRatio : false,
            scales: {
                y: {
                    suggestedMax: 100
                }
            },
            maxBarThickness : 40,
        };
        
        let i = 0;
        for(const subject in subjectTodo){
            subjectLabels.push(subject);
            // console.log(subject, subjectTodo[subject]);
            colorLabels.push(subjectColorPair[subject]);
            
            const percentTodo = (subjectTodo[subject]*100).toFixed(1);
            
            if(percentTodo == 100){
                inputTodoBarData.push(parseInt(percentTodo));
            }else{
                inputTodoBarData.push(parseFloat(percentTodo));
            }
            
        }
        // console.log(startW,endW);
        
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
        // }




    return (
        <Bar
            data = {dataTodoBarObj}
            options={todoBarOptions}
        />


    );
}

export default TodoBarChart;