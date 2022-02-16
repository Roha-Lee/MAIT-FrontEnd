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
    const [subject , setSubject] = useState("전체");
    const xLabels = new Array(6).fill(0).map((_, i) => `${i}`);
    const yLabels = new Array(25).fill(0).map((_, i) => `${i}h`.padStart(3,0));
    const subjectTotalTime = data.subjectTotalTime;
    const colorRGB = {};
    const totalInputData = {};
    const timeColorYX = {};
    const getData = data.rangeTime;

    subjectTotalTime.map((e)=>{
        colorRGB[e.subjectName] = hexToRgb(e.color); 
    });


    const inputData = new Array(25).fill(0).map(()=>
        new Array(6).fill(0)
    )

    
    getData.map((value)=>{
        const subjectName = value.subjectName;
        
        const startH = parseInt(value.startTime.slice(11,13));
        const startM = parseInt(value.startTime.slice(14,16));
        const startX = parseInt(startM / 10);
        const endH = parseInt(value.endTime.slice(11,13));
        const endM = parseInt(value.endTime.slice(14,16));
        const endX = parseInt(endM / 10);
        

        if(startH === endH){
            if(inputData[startH][startX] < startM - startX * 10){
                inputData[startH][startX] = startM - startX * 10;
                timeColorYX[String(startH)+String(startX)] = subjectName;
            }
            if(inputData[endH][endX] < endM - endX * 10){
                inputData[endH][endX] = endM - endX * 10;
                timeColorYX[String(endH)+String(endX)] = subjectName;
            }
            for(let i = startX + 1 ; i < endX ; i++){
                inputData[startH][i] = 10;
                timeColorYX[String(startH)+String(i)] = subjectName;
            }
        }
        else{
            if(inputData[startH][startX] < startM - startX * 10){
                inputData[startH][startX] = startM - startX * 10;
                timeColorYX[String(startH)+String(startX)] = subjectName;
            }

            for(let i = startX + 1 ; i < 6 ; i++){
                inputData[startH][i] = 10;
                timeColorYX[String(startH)+String(i)] = subjectName;
            }
            for(let y = startH+1 ; y < endH ; y++){
                for(let x = 0 ; x < 6 ; x++){
                    inputData[y][x] = 10;
                    timeColorYX[String(y)+String(x)] = subjectName;
                }
            }
            for(let j = 0 ; j < endX; j++){
                inputData[endH][j] = 10;
                timeColorYX[String(endH)+String(j)] = subjectName;
            }
            if(inputData[endH][endX] < endM - endX * 10){
                inputData[endH][endX] = endM - endX * 10;
                timeColorYX[String(endH)+String(endX)] = subjectName;
            }
        }
        
    })
    
    const handleSelect = (e) => {
        setSubject(e.target.value);
    }

    console.log(inputData);
    console.log(colorRGB);
    console.log(timeColorYX);
    console.log(subject);

    return(
        <div className={style.heatmap}>
            <select onChange={handleSelect}>
                <option key="total" value="전체">전체</option>
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
                // cellRender={(y, x, value) => (
                //     <div title={`Pos(${x}, ${y}) = ${value}`}>{String(y)+String(x)}</div>
                //   )}
                cellStyle={(_y, _x, ratio) => (
                    {
                    background: `${
                        timeColorYX[String(_y)+String(_x)] === subject  || (subject === "전체" && timeColorYX[String(_y)+String(_x)] !== undefined) ? 
                        // "rgb("+colorRGB[subject].r+","+colorRGB[subject].g+","+colorRGB[subject].b+","+ratio+")"
                        "rgb("+colorRGB[timeColorYX[String(_y)+String(_x)]].r+","+colorRGB[timeColorYX[String(_y)+String(_x)]].g+","+colorRGB[timeColorYX[String(_y)+String(_x)]].b+","+ratio+")"
                        :""}`,
                    border : "solid 0.2px",
                    borderRadius : 0,
                    // borderColor : `rgb(${color.r}, ${color.g}, ${color.b}, 0.1)`
                })}
                cellHeight="1.5rem"
                square
            />
            
        </div>
    );
}

export default TimeHeatmap; 