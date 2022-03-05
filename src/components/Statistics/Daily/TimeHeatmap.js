import {HeatMapGrid} from "react-grid-heatmap";
import { useState } from "react";
import { StyledHeatmap, StyledHeader, StyledHeatmapgrid, StyledHeatmapContent, StyledSelect } from './TimeHeatmap.styled'

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

function makeTimeColorYX(data){
    const timeColorYX = {};
    const getData = data?.rangeTime;
    const inputData = new Array(24).fill(0).map(()=>
        new Array(6).fill(9)
    );

    getData?.map((value)=>{
        const subjectName = value.subjectName;

        const startH = parseInt(value.startTime.slice(11,13));
        const startM = parseInt(value.startTime.slice(14,16));
        const startX = parseInt(startM / 10);

        let endH , endM;
        if(value.startTime.slice(8,10) !== value.endTime.slice(8,10)){
            endH = 23;
            endM = 59;
        }else{
            endH = parseInt(value.endTime.slice(11,13));
            endM = parseInt(value.endTime.slice(14,16));
        }
        const endX = parseInt(endM / 10);

        if(startH === endH){
            if(endM - startM < 10 && 9 - inputData[startH][startX] <= endM - startM){
                inputData[startH][startX] = 9 - (endM - startM);
                timeColorYX[String(startH)+String(startX)] = subjectName;
            }else{
                if(9 - inputData[startH][startX] < 9 - (startM - startX * 10)){
                    inputData[startH][startX] = startM - startX * 10
                    timeColorYX[String(startH)+String(startX)] = subjectName;
                }
                for(let i = startX + 1 ; i < endX ; i++){
                    inputData[startH][i] = 0;
                    timeColorYX[String(startH)+String(i)] = subjectName;
                }
                if(9 - inputData[startH][endX] < endM - endX * 10){
                    inputData[startH][endX] = 9 - (endM - endX * 10);
                    timeColorYX[String(startH)+String(endX)] = subjectName;
                }

            }
        }
        else{
            if(9 - inputData[startH][startX] < 9 - (startM - startX * 10)){
                inputData[startH][startX] = startM - startX * 10
                timeColorYX[String(startH)+String(startX)] = subjectName;
            }
            for(let i = startX + 1 ; i < 6 ; i++){
                inputData[startH][i] = 0;
                timeColorYX[String(startH)+String(i)] = subjectName;
            }
            for(let y = startH+1 ; y < endH ; y++){
                for(let x = 0 ; x < 6 ; x++){
                    inputData[y][x] = 0;
                    timeColorYX[String(y)+String(x)] = subjectName;
                }
            }
            for(let j = 0 ; j < endX; j++){
                inputData[endH][j] = 0;
                timeColorYX[String(endH)+String(j)] = subjectName;
            }
            if(9 - inputData[endH][endX] < endM - endX * 10){
                inputData[endH][endX] = 9 -(endM - endX * 10);
                timeColorYX[String(endH)+String(endX)] = subjectName;
            }

        }

    })

    return [timeColorYX , inputData];
}



function TimeHeatmap ({data , labels , subjectColors}){
    const [subject , setSubject] = useState("전체");
    const xLabels = new Array(6).fill(0).map((_, i) => `${i}`);
    const yLabels = new Array(24).fill(0).map((_, i) => `${i}h`.padStart(3,0));
    const subjectTotalTime = data?.subjectTotalTime;
    const colorRGB = {};
    const [timeColorYX, inputData] = makeTimeColorYX(data);

    subjectTotalTime?.map((e)=>{
        colorRGB[e.subjectName] = hexToRgb(e.color);
    });

    const handleSelect = (e) => {
        setSubject(e.target.value);
    }

    // console.log(inputData);
    // console.log(colorRGB);
    // console.log(timeColorYX);
    // console.log(subject);

    return(
        <StyledHeatmap>
            <StyledHeader><span>학습기록</span><div /></StyledHeader>

            <StyledHeatmapContent>
                <StyledSelect onChange={handleSelect}>
                    <option key="total" value="전체">전체</option>
                    {labels.map((label,i) => <option key={`${i}`} value={label}>{label}</option>)}
                </StyledSelect>
                <StyledHeatmapgrid>
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
                        cellStyle={(_y, _x, ratio) =>{
                                const fixedRatio = 1 - ratio;
                                return({
                                    background: `${
                                        timeColorYX[String(_y)+String(_x)] === subject  || (subject === "전체" && timeColorYX[String(_y)+String(_x)] !== undefined) ?
                                        // "rgb("+colorRGB[subject].r+","+colorRGB[subject].g+","+colorRGB[subject].b+","+ratio+")"
                                        "rgb("+colorRGB[timeColorYX[String(_y)+String(_x)]].r+","+colorRGB[timeColorYX[String(_y)+String(_x)]].g+","+colorRGB[timeColorYX[String(_y)+String(_x)]].b+","+fixedRatio+")"
                                        :""}`,
                                    border : "0.1px solid grey",
                                    borderLeft : `${_x === 0 ? "0.1px solid grey" : ""}`,
                                    borderBottom : `${_y === 23 ? "0.1px solid grey" : ""}`,
                                    borderRadius : 0,

                                })
                            }
                        }
                        cellHeight="1.8rem"
                    />
                </StyledHeatmapgrid>
            </StyledHeatmapContent>
        </StyledHeatmap>
    );
}

export default TimeHeatmap;