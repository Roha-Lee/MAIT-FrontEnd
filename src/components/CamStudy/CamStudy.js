import { useEffect, useState } from "react";

import Video from "./Video/Video";
import VideoState from "./context/VideoState";
import Timer from "../Timer/Timer"
import Subjects from "../Subjects/Subjects"
import Options from "./options/Options";
// import Footer from "./Footer/Footer";

function CamStudy (){

    const [subjects, setSubjects] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [timerOn, setTimerOn] = useState(false);
    const [userTimerOn, setUserTimerOn] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [useAi, setUseAi] = useState(false);
    
    useEffect(() => {
        if (!navigator.onLine) alert("Connect to internet!");
      }, [navigator]);
     
     useEffect(()=>{
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
     }, [])

    return(
      <div>
        <Subjects 
            setModalState={setModalOpen}
            modalOpen={modalOpen}
            setSubjects={setSubjects}
            subjects={subjects}
            currentSubject={currentSubject}
            setCurrentSubject={setCurrentSubject}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setTimerOn={setTimerOn}
          />
        <Timer
            subjects={subjects}
            setSubjects={setSubjects}
            currentSubject={currentSubject}
            setCurrentSubject={setCurrentSubject}
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            userTimerOn={userTimerOn}
            setUserTimerOn={setUserTimerOn}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
          />
        <VideoState>
          <div className="App" style={{ height: "100%", width: "100%" }}>
            <Video />
            <Options />
            {/* <Footer /> */}
          </div>
        </VideoState>
      </div>
    );
}

export default CamStudy;