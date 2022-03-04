
import React, {useState, useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import {getRankingData, msToHmsFormat} from '../../utils/utils'

import {
    RankingContainer, 
    BlankComment, 
    RankCircle, 
    RankCircleContainer, 
    FrontFace, 
    FrontContents, 
    BackFace, 
    MyRankContainer, 
    MyRankText,
    TotalPersonText,
    MyPercentText, 
    CircleTitle, 
    MedalImage} from "./RankingTable.styled"

import goldMedal from "./assets/gold-medal.png"
import silverMedal from "./assets/silver-medal.png"
import bronzeMedal from "./assets/bronze-medal.png"
import {connect} from "react-redux";
function RankingTable ({currentUser}) {
    const [userRanking, setUserRanking] = useState([]);
    const [myRanking, setMyRanking] = useState(0);
    const [isFront, setIsFront] = useState(true);
    useEffect(()=> {
        getRankingData()
        .then((res) => {
            
            if(res.data.message === 'SUCCESS'){
                // console.log(res.data.rank);
                // console.log(res.data.result);
                setMyRanking(parseInt(res.data.rank));
                setUserRanking(
                    res.data.result.map((item, index) => {
                        return {
                            rank: index + 1,
                            nickname: item.nickname,
                            totalTime: msToHmsFormat(item.totalTime),
                        }        
                }))
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    const columns = [
        {
            title: '등수',
            dataIndex: 'rank',
            key: 'rank',     
        },
            
        {
            title: '닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '총 학습시간(HH:MM:SS)',
            dataIndex: 'totalTime',
            key: 'totalTime',
        },
    ];
    const addMedalImage = (myRanking) => {
        console.log('myRanking', myRanking);
        if(myRanking === 1){
            return <MedalImage src={goldMedal} width="64" height="64" alt="goldMedal"/>;
        }
        else if(myRanking === 2){
            return <MedalImage src={silverMedal} width="64" height="64" alt="silverMedal"/>;
        }
        else if(myRanking === 3){
            return <MedalImage src={bronzeMedal} width="64" height="64" alt="bronzeMedal"/>;
        }
        else{
            return null;
        }
    }
    return (
        <RankingContainer>
            {myRanking > 0 ?
                <RankCircleContainer>
                    <RankCircle className="rank-circle">
                        <FrontFace>
                            <FrontContents>
                                
                                <CircleTitle type="front">{currentUser.length > 7 ? currentUser.substring(0, 7) + "⋯" : currentUser}</CircleTitle>
                                <MyRankContainer>
                                    {addMedalImage(myRanking)}
                                    <MyRankText>{myRanking}</MyRankText>
                                    <TotalPersonText>/{userRanking.length}</TotalPersonText>
                                </MyRankContainer>
                            </FrontContents>
                        </FrontFace>
                        <BackFace>
                            <CircleTitle type="back">상위</CircleTitle>
                            <MyPercentText>{Math.floor(myRanking / userRanking.length * 100)}</MyPercentText>   
                            
                        </BackFace>
                    </RankCircle>
                </RankCircleContainer>
                :
                null
            }
            {myRanking > 0 ? 
                <Table columns={columns} dataSource={userRanking} /> 
                : 
                <BlankComment>오늘 학습 기록이 없어<br/> 순위를 확인할 수 없습니다.</BlankComment>
            }
        </ RankingContainer>
    );

}

function mapStateToProps(state){
    return{
        currentUser : state.currentUser,
    };
  }

export default connect(mapStateToProps) (RankingTable);