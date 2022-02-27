
import React, {useState, useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import {getRankingData, msToHmsFormat} from '../../utils/utils'
import {RankingContainer} from "./RankingTable.styled"

function RankingTable () {
    const [userRanking, setUserRanking] = useState([]);
    const [myRanking, setMyRanking] = useState(0);
    useEffect(()=> {
        getRankingData()
        .then((res) => {
            
            if(res.data.message === 'SUCCESS'){
                console.log(res.data.rank);
                console.log(res.data.result);
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
      title: '총학습시간(HH:MM:SS)',
      dataIndex: 'totalTime',
      key: 'totalTime',
    },
  ];
  
    return (
        <RankingContainer>
            <div>나의 등수: {myRanking}</div>
            {userRanking.length > 0 ? 
                <Table columns={columns} dataSource={userRanking} /> : 
                <div>랭킹 정보가 없습니다.</div>}
        </ RankingContainer>
    );

}
export default RankingTable;