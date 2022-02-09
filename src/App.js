import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { setInterval } from "core-js";
import { drawMesh } from "./utilites";


function App() {
  // Setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [net,setNet] = useState([]);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    },1000);
    // detect(net);
    // setNet(net);
  };

  // Detect Function
  const detect = async(net) => {
    if(typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && webcamRef.current.video.readyState === 4)
    {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set Video Width , Height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      
      // Set canvas Width, Height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      
      // Make Detections
      const face = await net.estimateFaces({input:video});
      console.log(face);
      
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face,ctx)});
    }
  };
  
  // useEffect(()=>{
  //   runFacemesh()
  //   console.log("1")
  // },[net]);
  runFacemesh();
  
  return (
    <div className="App">
      <Webcam 
        ref={webcamRef}
        style={{
          position : "absolute",
          marginLeft : "auto",
          marginRight : "auto",
          left: 0,
          right : 0,
          textAlign : "center",
          zIndex : 9,
          width: 320,
          height: 240,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position : "absolute",
          marginLeft : "auto",
          marginRight : "auto",
          left: 0,
          right : 0,
          textAlign : "center",
          zIndex : 9,
          width: 320,
          height: 240,
        }}
      ></canvas>     
    </div>
  );
}

export default App;
