import Webcam from "react-webcam";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { useEffect, useRef, useState } from "react";
import Capture from "./Capture";

function AIFunctionViewer ({
  timerOn, 
  setTimerOn, 
  userTimerOn,
  setUserTimerOn,
}){
  const webcamRef = useRef(null);
  const srcCanvas = document.getElementById("srccanvas");
  const dstCanvas = document.getElementById("dstcanvas");
  const getFaceImage = document.getElementById("imgFace");
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };
  const [saveManager,setSaveManager] = useState();
  const [faceImage,setFaceImage] = useState("");
  const config = generateFacemeshDefaultConfig();
  config.model.maxFaces = 1;
  const params = generateDefaultFacemeshParams();
  let aiInterval = null;

  useEffect(()=>{
    const manager = new FacemeshWorkerManager();
    manager.init(config);
    setSaveManager(manager);

    Capture();
  },[]);

  useEffect(async()=>{
    if(userTimerOn){
        
      if(getFaceImage !== null){      
        const srcCanvas2d = srcCanvas.getContext("2d");
        srcCanvas2d.drawImage(getFaceImage,0,0,srcCanvas.width,dstCanvas.height);
        const result = await saveManager.predict(srcCanvas,params);
        
        if(result !== null && result.length === 0 && timerOn === true){
          setTimerOn(false);
          clearInterval(aiInterval);
        }
        else if(result !== null && result.length !== 0 && timerOn === false){
          if(result[0].faceInViewConfidence >= 0.95){
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
    }
  },[faceImage]);
    
  const capture = () => {
    // console.log(webcamRef.current);
    if(webcamRef.current !== null){

      const imgSrc = webcamRef.current.getScreenshot();
      // console.log(imgSrc);
      document.getElementById("imgFace").src = imgSrc;
      // console.log(document.getElementById("img").src,"캡쳐완료");
      setFaceImage(imgSrc);

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
        <div className="ai-on" style={{
          display:"flex",
          justifyContent:"center", }}> 
          <Webcam
            ref={webcamRef}
            audio={false}
            height={240}
            screenshotFormat="image/jpeg"
            width={320}
            position={'fixed'}          
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
          <img id="imgFace" src={faceImage} style={{
              width: "320",
              height: "240",
              display: "none"
            }}></img>
          <button id="captureFace" style={{display: "none"}}onClick={(e)=>{capture();}}>Capture</button>
        </div>
    </div>
  );
}
// 
export default AIFunctionViewer;