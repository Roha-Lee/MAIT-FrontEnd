
import React, {useState, useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import {getRankingData, msToHmsFormat} from '../../utils/utils'
import {RankingContainer, BlankComment, RankCircle, RankCircleContainer, MyRankInfo, TotalPeopleInfo} from "./RankingTable.styled"
import goldMedal from "./assets/gold-medal.png"
import silverMedal from "./assets/silver-medal.png"
import bronzeMedal from "./assets/bronze-medal.png"
function RankingTable () {
    const [userRanking, setUserRanking] = useState([]);
    const [myRanking, setMyRanking] = useState(0);
    useEffect(()=> {
        getRankingData()
        .then((res) => {
            
            if(res.data.message === 'SUCCESS'){
                // console.log(res.data.rank);
                // console.log(res.data.result);
                setMyRanking(res.data.rank);
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
        if(myRanking === 1){
            return <img src={goldMedal} width="32" height="32" alt="goldMedal"/>;
        }
        else if(myRanking === 2){
            return <img src={silverMedal} width="32" height="32" alt="silverMedal"/>;
        }
        else if(myRanking === 3){
            return <img src={bronzeMedal} width="32" height="32" alt="bronzeMedal"/>;
        }
        else{
            return null;
        }
    }
    return (
        <RankingContainer>
            <img src={goldMedal} alt={"goldMedal"} />
            <img src={silverMedal} alt={"silverMedal"} />
            <img src={bronzeMedal} alt={"bronzeMedal"} />
            {myRanking !== 0 ?
                <RankCircleContainer>
                    <RankCircle>
                        <NameContainer>{addMedalImage(myRanking)} {"ROHA"}</NameContainer>
                        <RankContainer><MyRankInfo>{myRanking}</MyRankInfo><TotalPeopleInfo>/{userRanking.length}</TotalPeopleInfo></RankContainer>
                    </RankCircle>
                </RankCircleContainer>
                :
                null
            }
            {myRanking !== 0 ? 
                <Table columns={columns} dataSource={userRanking} /> 
                : 
                <BlankComment>오늘 학습 기록이 없어서 순위를 확인할 수 없습니다.</BlankComment>
            }
        </ RankingContainer>
    );

}
export default RankingTable;