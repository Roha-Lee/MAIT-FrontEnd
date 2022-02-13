import Webcam from "react-webcam";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { useEffect, useRef, useState } from "react";
import Capture from "./Capture";
// timerRunning = {timerOn}
//                   onChangeTimerRunning = {setTimerOn}
function AITest ({timerOn, setTimerOn}){
  const webcamRef = useRef(null);
  const srcCanvas = document.getElementById("srccanvas");
  const dstCanvas = document.getElementById("dstcanvas");
  const getImage = document.getElementById("img");
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };
  const [saveManager,setSaveManager] = useState();
  const [image,setImage] = useState("");
  const config = generateFacemeshDefaultConfig();
  config.model.maxFaces = 1;
  const params = generateDefaultFacemeshParams();
  let aiInterval = null;

  useEffect(()=>{
    const manager = new FacemeshWorkerManager();
    manager.init(config);
    setSaveManager(manager);
    // capture();
    Capture();
  },[]);

  useEffect(async()=>{
    // console.log(getImage);
    if(getImage !== null){      
      const srcCanvas2d = srcCanvas.getContext("2d");
      // console.log(srcCanvas2d);
      srcCanvas2d.drawImage(getImage,0,0,srcCanvas.width,dstCanvas.height);
      const result = await saveManager.predict(srcCanvas,params);
      // console.log(result.length , timerRunning);
      console.log(result[0].faceInViewConfidence)
      if(result !== null && result.length === 0 && timerOn === true){
        // console.log("AI->타이머 버튼 누름" , result);
        setTimerOn(false);
        clearInterval(aiInterval);
      }
      else if(result !== null && result.length !== 0 && timerOn === false){
        if(result[0].faceInViewConfidence >= 0.95){
          // console.log(result)
          setTimerOn(true);  
        }
      }
      else if(result !== null && result.length !== 0 && timerOn === true){
        if(result[0].faceInViewConfidence < 0.95){
          setTimerOn(false);
          clearInterval(aiInterval);
        }
      }
    }
  return;
  },[image]);
    
  const capture = () => {
    // console.log(webcamRef.current);
    if(webcamRef.current !== null){

      const imgSrc = webcamRef.current.getScreenshot();
      // console.log(imgSrc);
      document.getElementById("img").src = imgSrc;
      // console.log(document.getElementById("img").src,"캡쳐완료");
      setImage(imgSrc);

    }
  };

  // aiInterval = setInterval(()=>{
  //   capture();
  // },5000);
  // console.log("캡쳐 명령");
  // capture();
  // Capture();
  return(
    <div className="aitest">
        <div className="ai-on"> 
          <Webcam
            ref={webcamRef}
            audio={false}
            height={240}
            screenshotFormat="image/jpeg"
            width={320}
            videoConstraints={videoConstraints}
          />
          <canvas id="srccanvas"
            style={{
              // position: "absolute",
              // width: "320",
              // height: "240",
              display : "none"
            }}
          ></canvas>
          <canvas id="dstcanvas"
            style={{
              // position: "absolute",
              // width: "320",
              // height: "240",
              display : "none"
            }}
          ></canvas>
          <img id="img" src={image} style={{
              width: "320",
              height: "240",
              display: "none"
            }}></img>
          <button id="capture" style={{display: "none"}}onClick={(e)=>{capture();}}>Capture</button>
        </div>
    </div>
  );
}
// 
export default AITest;