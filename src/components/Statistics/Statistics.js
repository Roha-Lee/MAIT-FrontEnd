import Navigation from "../Navigation/NavigationNew";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
import RankingTable from "../RankingTable/RankingTable";
import {TabBox,TapContainer,StatisticsContainer,BottomColor,MenuContainer, BlankBox, TabName, StyledStatistics, StyledStatisticsDetail,SmallSize,BigSize} from "./Statistics.styled";
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
                >
                    <TabName>일간 통계</TabName>
                </TabBox>
                <TabBox
                    onClick={handleRank}
                    style={{
                        backgroundColor : `${
                            currentStatistics === 2 ? "white"
                            : "#bfbfbf"
                        }`
                    }}
                >
                    <TabName>일간 순위</TabName>
                </TabBox>
                <TabBox
                    onClick={handleManyDays}
                    style={{
                        backgroundColor : `${
                            currentStatistics === 3 ? "white"
                            : "#bfbfbf"
                        }`
                    }}
                >
                    <TabName>기간 통계</TabName>
                </TabBox>
                <BlankBox/>
                <BigSize>
                    {currentStatistics === 1 ?
                        <DatePicker
                            onChange={onChange}
                            defaultValue={moment(dailyDate,`YYYY-MM-DD`)}
                            style={{
                                margin: "11px 0",
                                border : "0px",
                                borderRadius: "8px",
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
                                marginLeft : "10px",
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
                                height: "38px",
                                borderRadius: "8px",
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
                                    marginLeft : "11px",
                                }}
                            />
                        </Tooltip>
                    :null}
                </BigSize>
            </TapContainer>
        </MenuContainer>
        <SmallSize>
                {currentStatistics === 1 ?
                    <DatePicker
                        onChange={onChange}
                        defaultValue={moment(dailyDate,`YYYY-MM-DD`)}
                        style={{
                            border : "0px",
                            display: "flex",
                            padding: "20px"
                        }}
                    />
                : null}
                {currentStatistics === 1 ?
                    <Switch
                        defaultChecked checkedChildren="학습"
                        unCheckedChildren="전체"
                        onChange={onChangeToggle}
                        style={{
                            marginTop: "10px",
                            marginBottom : "10px",
                            marginLeft : "15px",
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
                                marginLeft : "11px",
                            }}
                        />
                    </Tooltip>
                :null}
            </SmallSize>
        <StatisticsContainer>
            
            {currentStatistics === 1 ?
                <StyledStatistics>
                    <Daily/>
                </StyledStatistics>
            : null}
            {currentStatistics === 2 ?
                <StyledStatisticsDetail>
                    <RankingTable/>
                </StyledStatisticsDetail>
            : null}
            {currentStatistics === 3 ?
                <StyledStatisticsDetail>
                    <ManyDays/>
                </StyledStatisticsDetail>
            : null}
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