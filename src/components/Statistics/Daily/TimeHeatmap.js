import style from "./TimeHeatmap.module.css";
import {HeatMapGrid} from "react-grid-heatmap";
import { useState } from "react";

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}





function TimeHeatmap ({data , labels , subjectColors}){
    const [subject , setSubject] = useState(labels[0]);
    const xLabels = new Array(6).fill(0).map((_, i) => `${i}`);
    const yLabels = new Array(25).fill(0).map((_, i) => `${i}h`.padStart(3,0));
    const subjectTotalTime = data.subjectTotalTime;
    let colorRGB;
    subjectTotalTime.map((e)=>{
        if(e.subjectName === subject){
            colorRGB = e.color;
        } 
    });
    const color = hexToRgb(colorRGB);
    const getData = data.rangeTime;

    const inputData = new Array(25).fill(0).map(()=>
        new Array(6).fill(0)
    )

    
    getData.map((value)=>{
        const subjectName = value.subjectName;
        if(subjectName === subject){
            const startH = parseInt(value.startTime.slice(11,13));
            const startM = parseInt(value.startTime.slice(14,16));
            const startX = parseInt(startM / 10);
            const endH = parseInt(value.endTime.slice(11,13));
            const endM = parseInt(value.endTime.slice(14,16));
            const endX = parseInt(endM / 10);
            

            if(startH === endH){
                inputData[startH][startX] = startM - startX * 10;
                inputData[startH][endX] = endM - endX * 10;
                for(let i = startX + 1 ; i < endX ; i++){
                    inputData[startH][i] = 10;
                }
            }
            else{
                inputData[startH][startX] = startM - startX * 10;
                for(let i = startX + 1 ; i < 6 ; i++){
                    inputData[startH][i] = 10;
                }
                for(let y = startH+1 ; y < endH ; y++){
                    for(let x = 0 ; x < 6 ; x++){
                        inputData[y][x] = 10;
                    }
                }
                for(let j = 0 ; j < endX; j++){
                    inputData[endH][j] = 10;
                }
                inputData[endH][endX] = endM - endX * 10;
            }
        }
    })
    console.log(inputData);
    const handleSelect = (e) => {
        setSubject(e.target.value);
    }

    return(
        <div className={style.heatmap}>
            <select onChange={handleSelect}>
                {labels.map((label,i) => <option key={`${i}`} value={label}>{label}</option>)}
            </select>
            <HeatMapGrid
                data={inputData}
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsStyle={(index) => ({
                    display : 'none',
                })}
                yLabelsStyle={() => ({
                    fontSize: '.7rem',
                    color: '#777'
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(${color.r}, ${color.g}, ${color.b}, ${ratio*0.8})`,
                    border : `${ratio === 0 ? "solid 0.5px" : ""}`,
                    borderRadius : 0,
                    borderColor : `rgb(${color.r}, ${color.g}, ${color.b}, 0.1)`
                })}
                cellHeight="1.5rem"
                square
            />
        </div>
    );
}

export default TimeHeatmap; 