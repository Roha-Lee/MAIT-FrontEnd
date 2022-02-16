import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import ManyDays from "./ManyDays/ManyDays";
import style from "./Statistics.module.css";

function Statistics(){

    return(
        <div className={style.statisticsContainer}>
            <div className={style.statistics}>
                <Daily/>
            </div>
            <div className={style.statisticsDetail}>
                <ManyDays/>
            </div>
        </div>

    );
}


export default Statistics;