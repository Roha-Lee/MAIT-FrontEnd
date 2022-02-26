import Webcam from "react-webcam";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { useEffect, useMemo, useRef, useState } from "react";
import Capture from "./Capture";
import {AiOn, SrcCanvas, DstCanvas, ImgFace} from './AIFaceFunctionViewer.styled'


function AIFaceFunctionViewer ({
  timerOn, 
  setTimerOn, 
  userTimerOn,
  useFaceAi,
  floatVideo,
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
  const [faceInterval, setFaceInterval] = useState(null);
  const config = generateFacemeshDefaultConfig();
  config.model.maxFaces = 1;
  const params = generateDefaultFacemeshParams();
  
  useEffect(()=>{
    const manager = new FacemeshWorkerManager();
    manager.init(config);
    console.log("Face model");
    setSaveManager(manager);
    // Capture();
  },[]);

  useEffect(()=>{
    if (faceInterval && useFaceAi) {
      clearInterval(faceInterval);
    }
    else if (useFaceAi && !faceInterval) {
      setFaceInterval(Capture("Face"));
    }
  },[useFaceAi]);

  useEffect(async()=>{
    if(userTimerOn){
        
      if(getFaceImage !== null){      
        const srcCanvas2d = srcCanvas.getContext("2d");
        srcCanvas2d.drawImage(getFaceImage,0,0,srcCanvas.width,dstCanvas.height);
        const result = await saveManager.predict(srcCanvas,params);
        
        if(result !== null && result.length === 0 && timerOn === true){
          setTimerOn(false);
          // clearInterval(aiInterval);
        }
        else if(result !== null && result.length !== 0 && timerOn === false){
          if(result[0].faceInViewConfidence >= 0.95){
            setTimerOn(true);  
          }
        }
        else if(result !== null && result.length !== 0 && timerOn === true){
          if(result[0].faceInViewConfidence < 0.95){
            setTimerOn(false);
            // clearInterval(aiInterval);
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

  const videoSize = useMemo(() => floatVideo ? 80 : 150, [floatVideo]);

  return(
    <AiOn floatVideo={floatVideo}> 
      <Webcam
        ref={webcamRef}
        audio={false}
        width={videoSize}
        height={videoSize}
        screenshotFormat="image/jpeg"
        position="fixed"       
        videoConstraints={videoConstraints}
      />
      <SrcCanvas id="srccanvas"/>
      <DstCanvas id="dstcanvas"/>
      <ImgFace id="imgFace" src={faceImage}/>
      <button id="captureFace" style={{display: "none"}} onClick={(e)=>{capture();}}>Capture</button>
    </AiOn>
  );
}
// 
export default AIFaceFunctionViewer;