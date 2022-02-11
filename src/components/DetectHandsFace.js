import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import Webcam from "react-webcam";
import {useEffect, useRef} from "react";
import Webcam from "react-webcam";

let handInterval;
let faceInterval;
let handStopped = false;
let faceStopped = false;

function DetectHandsFace({detectModel, setIsStudy}){
    // console.log(detectModel);
    
    const webcamRef = useRef(null);
    // const canvasRef = useRef(null);
    // console.log(faceNet ,"detectHands 1 ");
    // console.log(handNet);


    const runHandpose = async () => {
        const net = await handpose.createDetector(handpose.SupportedModels.MediaPipeHands,{runtime : "tfjs"});
        // console.log("Handpose model loaded.");
        //  Loop and detect hands
        
        handInterval = setInterval( async () => {
            const ifHand  =  await detectHand(net);
            console.log(tf.memory())
            const element = document.getElementById('moveDetect');
            if(ifHand === true && ifHand !== undefined){
                element.innerText = "Hand Detected";
                // setIsStudy(true);
            }
            else if (ifHand === false && ifHand !== undefined){
                element.innerText = "No Hand Detected";
                // setIsStudy(false);
            }
        }, 2000);
         
    };
    
    const runFacemesh = async () => {
        const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh,{maxFaces:1,scoreThreshold : 0.8});
        // console.log("face model is loaded");
        // console.log(net, "runFacemesh 1");
        
        faceInterval = setInterval(async () => {
            // console.log(net , "setInterval");
            
            const isFace = await detectFace(net);

            const element = document.getElementById(`moveDetect`);
            // console.log(isFace);
            console.log(tf.memory())
            if(isFace === true && isFace !== undefined){
                element.innerText = "공부중...";
                // setIsStudy(true);
            }
            else if (isFace === false && isFace !== undefined){
                element.innerText = "딴짓 하는 중...";
                // setIsStudy(false);
            }
                
        },2000);
        
    };
        
    const detectHand = async (net) => {
        // console.log(handStopped, "handStopped");
        if(!handStopped){
        // Check data is available
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState === 4
            ){
                // Get Video Properties
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;
                
                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;
                
                // Set canvas height and width
                // canvasRef.current.width = videoWidth;
                // canvasRef.current.height = videoHeight;
                
                // Make Detections
                // tf.engine().startScope();
                const hand = await net.estimateHands(video);
                // tf.engine().endScope();
                // console.log(hand);
                
                return hand.length > 0;
                
            }
        }
    };
    
    const detectFace = async(net) => {
        // console.log(faceStopped, "faceStopped");
        // console.log(net, "detectFace");
        if(!faceStopped){
            if(typeof webcamRef.current !== "undefined" && 
            webcamRef.current !== null && 
            webcamRef.current.video.readyState === 4)
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
                tf.engine().startScope();
                const face = await net.estimateFaces({input:video});
                tf.engine().endScope();
                // console.log(face[0].scaledMesh);
                
                if(face.length !== 0){
                    // console.log(face[0].faceInViewConfidence);
                    const landmarks = face[0].scaledMesh 
                    
                    const eyeVector = {
                        x: landmarks[33][0] - landmarks[263][0],
                        y: landmarks[33][1] - landmarks[263][1],
                        z: landmarks[33][2] - landmarks[263][2]
                    };
                    const  noseVector = {
                        x: landmarks[1][0] - landmarks[6][0],
                        y: landmarks[1][1] - landmarks[6][1],
                        z: landmarks[1][2] - landmarks[6][2]
                    };
                    const  crossProduct = {
                        x: (eyeVector.y * noseVector.z - eyeVector.z * noseVector.y),
                        y: (eyeVector.x * noseVector.z - eyeVector.z * noseVector.x),
                        z: (eyeVector.x * noseVector.y - eyeVector.y * noseVector.x),
                    }
                    
                    const normOfVector = (crossProduct.x ** 2 + crossProduct.y ** 2 +crossProduct.z ** 2 ) ** 0.5;
                    
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
                    if(crossProduct.y/normOfVector > 0.5 || crossProduct.y/normOfVector < 0.1 || crossProduct.x/normOfVector > 0.2 || crossProduct.x/normOfVector < -0.2){
                        return false;
                    }
                    else{
                        return true;
                    } 
                    // return true;
                }
            
                return false;  
            }
            return 10;    
        }
        
    };
    
    // useEffect(runHandpose,[]);
    
    if(detectModel === "Hand"){
    
        clearInterval(faceInterval);
        faceStopped = true;
        handStopped = false;
        // useEffect(runHandpose,[]);
        runHandpose();
        
    }else if(detectModel === "Face"){
        
        // console.log(faceNet , "detectHands 2");
        clearInterval(handInterval);
        handStopped = true;
        faceStopped = false;
        runFacemesh()
        // useEffect(runFacemesh,[]);
    }else{
        clearInterval(handInterval);
        clearInterval(faceInterval);
        faceStopped = true;
        handStopped = true;
        return(<div id="webcam"></div>);
    }

    return (
        <div id="webcam">
            <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
            }}
            />

            {/* <canvas
            ref={canvasRef}
            style={
                {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }
            }
            /> */}
        </div>
    );
}


export default DetectHandsFace