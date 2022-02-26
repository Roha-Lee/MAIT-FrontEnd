import Webcam from "react-webcam";
import { HandPoseWorkerManager, generateDefaultHandPoseParams, generateHandPoseDefaultConfig } from '@dannadori/handpose-worker-js';
import React,{ useEffect, useRef, useState } from "react";
import Capture from "./Capture";
import {AiOn, SrcCanvas, DstCanvas, ImgFace} from './AIFaceFunctionViewer.styled'

function AIHandFunctionViewer ({
  timerOn, 
  setTimerOn, 
  userTimerOn,
  setUserTimerOn,
  useHandAi,
  setUseHandAi,
}){
  const webcamRef = useRef(null);
  const srcCanvas = document.getElementById("srccanvas");
  const dstCanvas = document.getElementById("dstcanvas");
  const getHandImage = document.getElementById("imgHand");
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };
  const [saveManager,setSaveManager] = useState();
  const [handImage,setHandImage] = useState("");
  const [handInterval, setHandInterval] = useState(null);

  const config = generateHandPoseDefaultConfig();
  config.model.detectionConfidence = 0.6;
  // config.useTFWasmBackend = true;
  const params = generateDefaultHandPoseParams();
  
  useEffect(()=>{
    const manager = new HandPoseWorkerManager();
    console.log("hand model",config);
    manager.init(config);
    setSaveManager(manager);
    // Capture();
  },[]);

  useEffect(()=>{
    if (handInterval && useHandAi) {
      clearInterval(handInterval);
    }
    else if (useHandAi && !handInterval) {
      setHandInterval(Capture("Hand"));
    }
  },[useHandAi]);

  useEffect(async()=>{
    if(userTimerOn){
        
      if(getHandImage !== null){      
        const srcCanvas2d = srcCanvas.getContext("2d");
        srcCanvas2d.drawImage(getHandImage,0,0,srcCanvas.width,dstCanvas.height);
        const result = await saveManager.predict(srcCanvas,params);
        console.log(result);
        if(result !== null && result.length === 0 && timerOn === true){
          setTimerOn(false);
          // clearInterval(aiInterval);
        }
        else if(result !== null && result.length !== 0 && timerOn === false){
        
          setTimerOn(true);  
          
        }
        // else if(result !== null && result.length !== 0 && timerOn === true){
        //   if(result[0].faceInViewConfidence < 0.95){
        //     setTimerOn(false);
        //     // clearInterval(aiInterval);
        //   }
        // }
      }
    }
  },[handImage]);
    
  const capture = () => {
    // console.log(webcamRef.current);
    if(webcamRef.current !== null){

      const imgSrc = webcamRef.current.getScreenshot();
      // console.log(imgSrc);
      document.getElementById("imgHand").src = imgSrc;
      // console.log(document.getElementById("img").src,"캡쳐완료");
      setHandImage(imgSrc);

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
        <AiOn> 
          <Webcam
            ref={webcamRef}
            audio={false}
            height={150}
            width={150}
            screenshotFormat="image/jpeg"
            position='fixed'          
            videoConstraints={videoConstraints}
          />
          <SrcCanvas id="srccanvas"/>
          <DstCanvas id="dstcanvas"/>
          <ImgFace id="imgHand" src={handImage}/>
          <button id="captureHand" style={{display: "none"}} onClick={(e)=>{capture();}}>Capture</button>
        </AiOn>
    </div>
  );
}
// 
export default AIHandFunctionViewer;