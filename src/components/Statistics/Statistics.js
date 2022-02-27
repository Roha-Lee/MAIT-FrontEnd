import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
import style from "./Statistics.module.css";
import RankingTable from "../RankingTable/RankingTable";
function Statistics(){

    return(
        <>
        <Navigation />
        <div className={style.statisticsContainer}>
            <div className={style.statistics}>
                <Daily/>
            </div>
            <div className={style.statisticsDetail}>
                <ManyDays/>
            </div>
            <div className={style.statisticsDetail}>
                <RankingTable/>
            </div>
        </div>
        </>

    );
}


export default Statistics;