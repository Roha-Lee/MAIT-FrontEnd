import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
import { FlexBox, DailyStatistics, StatisticsDetail } from './Statistics.styled'

function Statistics(){

    return(
        <>
            <DailyStatistics>
            <Daily/> 
            </DailyStatistics>
            <StatisticsDetail>
                <ManyDays/>
            </StatisticsDetail>
        </>

    );
}


export default Statistics;