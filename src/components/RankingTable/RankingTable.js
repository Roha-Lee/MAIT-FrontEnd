
import React, {useState, useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import {getRankingData, msToHmsFormat} from '../../utils/utils'
import {RankingContainer, BlankComment, RankComment} from "./RankingTable.styled"

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

    return (
        <RankingContainer>
            {userRanking.length > 0 ?
                <RankComment>나의 등수 : <strong>{myRanking}</strong>/{userRanking.length}</RankComment>
                :
                null
            }
            {userRanking.length > 0 ? 
                <Table columns={columns} dataSource={userRanking} /> : 
                <BlankComment>순위 정보가 없습니다.</BlankComment>}
        </ RankingContainer>
    );

}
export default RankingTable;