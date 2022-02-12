import Webcam from "react-webcam";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { useEffect, useRef, useState } from "react";

function AITest ({timerRunning,onChangeTimerRunning,useAi}){
  
  
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
  const params = generateDefaultFacemeshParams();
  let aiInterval = null;

  useEffect(()=>{
    const manager = new FacemeshWorkerManager();
    manager.init(config);
    setSaveManager(manager);
  },[]);

  useEffect(async()=>{
    console.log(getImage);
    if(getImage !== null){      
        const srcCanvas2d = srcCanvas.getContext("2d");
        console.log(srcCanvas2d);
        srcCanvas2d.drawImage(getImage,0,0,srcCanvas.width,dstCanvas.height);
        const result = await saveManager.predict(srcCanvas,params);
        console.log(result);
    }
  },[image]);
    
  const capture = async () => {
    console.log(webcamRef.current);
    if(webcamRef.current !== null){

      const imgSrc = await webcamRef.current.getScreenshot();
      document.getElementById("img").src = imgSrc;
      // console.log(document.getElementById("img").src,"캡쳐완료");
      setImage(imgSrc);

    }
  };

  // aiInterval = setInterval(()=>{
  //   capture();
  // },5000);
  console.log("캡쳐 명령");
  capture();

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
              position: "absolute",
              width: "320",
              height: "240",
            }}
          ></canvas>
          <canvas id="dstcanvas"
            style={{
              position: "absolute",
              width: "320",
              height: "240",
            }}
          ></canvas>
          <img id="img" src={image} style={{
              width: "320",
              height: "240",
            
            }}></img>
        </div>
        
    </div>
  );
}


export default AITest;