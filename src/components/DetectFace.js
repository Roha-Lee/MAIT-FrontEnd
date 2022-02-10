import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { useRef } from "react";



function DetectFace (){

    // Setup references
  const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh,{maxFaces:1,scoreThreshold : 0.8});
    console.log("model is loaded");
    

    setInterval(async () => {
        const isFace = await detect(net);
        const element = document.getElementById(`moveDetect`);
        // console.log(isFace);
        if(isFace === true && isFace !== undefined){
            element.innerText = "공부중...";
        }
        // else if (isFace === false || isFace === null){
        //     element.innerText = "딴짓 하는 중...";
        // }
        else if (isFace === false && isFace !== undefined){
            element.innerText = "딴짓 하는 중...";
        }

    },2000);
    
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
        //   canvasRef.current.width = videoWidth;
        //   canvasRef.current.height = videoHeight;
        
        
        // Make Detections
        const face = await net.estimateFaces({input:video});
        // console.log(face[0].scaledMesh);

        if(face.length !== 0){
            // console.log(face[0].faceInViewConfidence);
            // const landmarks = face[0].scaledMesh 
            
            // const eyeVector = {
            //     x: landmarks[33][0] - landmarks[263][0],
            //     y: landmarks[33][1] - landmarks[263][1],
            //     z: landmarks[33][2] - landmarks[263][2]
            // };
            // const  noseVector = {
            //     x: landmarks[1][0] - landmarks[6][0],
            //     y: landmarks[1][1] - landmarks[6][1],
            //     z: landmarks[1][2] - landmarks[6][2]
            // };
            // const  crossProduct = {
            //     x: (eyeVector.y * noseVector.z - eyeVector.z * noseVector.y),
            //     y: (eyeVector.x * noseVector.z - eyeVector.z * noseVector.x),
            //     z: (eyeVector.x * noseVector.y - eyeVector.y * noseVector.x),
            // }

            // const normOfVector = (crossProduct.x ** 2 + crossProduct.y ** 2 +crossProduct.z ** 2 ) ** 0.5;

            // console.log(`${(crossProduct.x/normOfVector).toFixed(2)}`);
            // console.log(`${(crossProduct.y/normOfVector).toFixed(2)}`);
            // console.log(`${noseVector.x.toFixed(2)} ${noseVector.y.toFixed(2)} ${noseVector.z.toFixed(2)}`)

            // || crossProduct.y/normOfVector > 0.4 || crossProduct.y/normOfVector < 0.2
            // if(crossProduct.x/normOfVector > 0.15 || crossProduct.x/normOfVector < -0.1 ){
            //     return false;
            // }
            // else{
            //     return true;
            // } 
            // if(crossProduct.y/normOfVector > 0.5 || crossProduct.y/normOfVector < 0.1 || crossProduct.x/normOfVector > 0.2 || crossProduct.x/normOfVector < -0.2){
            //     return false;
            // }
            // else{
            //     return true;
            // } 
            return true;
        }
      
        return false;  
      
    }
  };
  
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
          width: 640,
          height: 480,
        }}
      />
      {/* <canvas
        ref={canvasRef}
        style={{
          position : "absolute",
          marginLeft : "auto",
          marginRight : "auto",
          left: 0,
          right : 0,
          textAlign : "center",
          zIndex : 9,
          width: 640,
          height: 480,
        }}
      ></canvas>      */}
    </div>
  );




}


export default DetectFace;