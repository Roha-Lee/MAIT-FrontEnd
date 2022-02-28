import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
import style from "./Statistics.module.css";
import RankingTable from "../RankingTable/RankingTable";
import {TabBox,TapContainer,StatisticsContainer,BottomColor,MenuContainer, BlankBox} from "./Statistics.styled";
import {connect} from "react-redux";
import {changeCurrentStatistics, changeDailyDate, changeStartDate, changeEndDate, changeIsZeroShow} from "../../store";
import moment from "moment";
import { DatePicker, Switch, Button, Tooltip } from "antd";
const { RangePicker } = DatePicker;
import { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';

function Statistics({currentStatistics,startDate, endDate ,dailyDate, setDailyDate,setIsZeroShow, setStartDate, setEndDate , setCurrentStatistics}){
    const [range, setRange] = useState([startDate,endDate]);
    
    function onChange(date, dateString){
        setDailyDate(dateString);
    }

    function onChangeToggle(checked){
        // console.log("switch to",checked);
        setIsZeroShow(!checked);
    }

    const onChangeRange = (value, dateString) => {
        setRange(dateString)
    }

    const onOk = () => {
        setStartDate(range[0]);
        setEndDate(range[1]);
    }

    function handleDaily(){
        setCurrentStatistics(1);
    }

    function handleRank(){
        setCurrentStatistics(2);
    }

    function handleManyDays(){
        setCurrentStatistics(3);
    }


    return(
        <>
        <Navigation />
        <MenuContainer>
            <TapContainer>
                <TabBox 
                    onClick={handleDaily}
                    style={{
                        backgroundColor : `${
                            currentStatistics === 1 ? "white"
                            : "#bfbfbf"
                        }`
                    }}
                >일간 통계</TabBox>
                <TabBox 
                    onClick={handleRank}
                    style={{
                        backgroundColor : `${
                            currentStatistics === 2 ? "white" 
                            : "#bfbfbf"
                        }`
                    }}
                >일간 순위</TabBox>
                <TabBox 
                    onClick={handleManyDays}
                    style={{
                        backgroundColor : `${
                            currentStatistics === 3 ? "white" 
                            : "#bfbfbf"
                        }`
                    }}
                >기간 통계</TabBox>
                <BlankBox/>
                {currentStatistics === 1 ?
                    <DatePicker 
                        onChange={onChange} 
                        defaultValue={moment(dailyDate,`YYYY-MM-DD`)}
                        style={{
                            margin: "11px 0",
                            border : "0px",
                        }}
                    />
                : null}
                {currentStatistics === 1 ?
                    <Switch 
                        defaultChecked checkedChildren="학습"
                        unCheckedChildren="전체" 
                        onChange={onChangeToggle} 
                        style={{
                            marginTop: "20px",
                            marginBottom : "20px",
                            marginLeft : "15px",
                            width: "60px",
                        }}
                    />
                : null}
                {currentStatistics === 3 ?
                    <RangePicker 
                        onChange={onChangeRange}
                        defaultValue={[moment(startDate, `YYYY-MM-DD`), moment(endDate, `YYYY-MM-DD`)]}
                        style={{
                            margin: "11px 0px",
                            border: "0px",
                        }}
                    />
                :null}
                {currentStatistics === 3 ?
                    <Tooltip title="search">
                        <Button 
                            onClick={onOk}
                            type="primary" 
                            shape="circle" 
                            icon={<SearchOutlined />} 
                            size="medium"
                            style={{
                                marginTop : "14px",
                                marginBottom : "14px",
                                marginLeft : "3px",
                                marginRight : "20px"
                            }} 
                        />
                    </Tooltip>
                :null}
            </TapContainer>
        </MenuContainer>
        <StatisticsContainer>
            <div className={style.statisticsContainer}>
                {currentStatistics === 1 ? 
                    <div className={style.statistics}>
                        <Daily/>
                    </div>
                : null}
                {currentStatistics === 2 ? 
                    <div className={style.statisticsDetail}>
                        <RankingTable/>
                    </div>
                : null}
                {currentStatistics === 3 ?
                    <div className={style.statisticsDetail}>
                        <ManyDays/>
                    </div>
                : null}
            </div>
        </StatisticsContainer>
        <BottomColor/>
        </>

    );
}


function mapStateToProps(state){
    return{
        currentStatistics : state.currentStatistics,
        dailyDate : state.dailyDate,
        startDate : state.startDate,
        endDate : state.endDate,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setCurrentStatistics : value => dispatch(changeCurrentStatistics(value)),
        setDailyDate : value => dispatch(changeDailyDate(value)),
        setStartDate : value => dispatch(changeStartDate(value)),
        setEndDate : value => dispatch(changeEndDate(value)),
        setIsZeroShow : value => dispatch(changeIsZeroShow(value)),
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (Statistics);