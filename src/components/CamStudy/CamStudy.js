import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from "./Video/Video";
import VideoState from "./context/VideoState";
import Timer from "../Timer/Timer"
import Subjects from "../Subjects/Subjects"
import Options from "./options/Options";
import { Modal, Button } from 'antd';
// import Footer from "./Footer/Footer";
// window.location.replace("/camstudy");
function CamStudy (){
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [userTimerOn, setUserTimerOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [useAi, setUseAi] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    
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
      <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      </>
      <VideoState>
        <div className="App" style={{ height: "100%", width: "100%" }}>
          <Video />
          <Modal title="Study With Me" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Options />
          </Modal>
          {/* <Footer /> */}
        </div>
      </VideoState>
    </div>
  );
}

export default CamStudy;