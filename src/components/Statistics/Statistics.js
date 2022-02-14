import Navigation from "../Navigation/Navigation";
import Daily from "./Daily/Daily";
import style from "./Statistics.module.css";

function Statistics(){

    return(
        <div >
            <div >
                <Navigation/>
            </div>
            <div className={style.statistics}>
                <Daily/>
            </div>
        </div>

    );
}


export default Statistics;