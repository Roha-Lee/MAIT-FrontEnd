import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
// import style from "./Statistics.module.css";
import { DailyStatistics, StatisticsDetail } from './Statistics.styled'

function Statistics(){

    return(
        <div>
            <DailyStatistics>
                <Daily/>
            </DailyStatistics>
            <StatisticsDetail>
                <ManyDays/>
            </StatisticsDetail>
        </div>

    );
}


export default Statistics;