import Webcam from "react-webcam";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { useEffect, useRef, useState } from "react";

function ImgFaceDetect(){
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 220,
        height: 200,
        facingMode: "user"
    };
    const [image,setImage] = useState("");
    const [saveManager,setSaveManager] = useState();
    const config = generateFacemeshDefaultConfig();
    const params = generateDefaultFacemeshParams();
    const srcCanvas = document.getElementById("srccanvas");
    const dstCanvas = document.getElementById("dstcanvas");
    const getImage = document.getElementById("img");
    
    
    const capture = () => {
        const imgSrc = webcamRef.current.getScreenshot();
        document.getElementById("img").src = imgSrc;
        setImage(imgSrc);
    };

    useEffect(()=>{
        const manager = new FacemeshWorkerManager();
        manager.init(config);
        setSaveManager(manager);
    },[]);

    useEffect(async()=>{
        if(getImage !== null){      
            const srcCanvas2d = srcCanvas.getContext("2d");
            srcCanvas2d.drawImage(getImage,0,0,srcCanvas.width,dstCanvas.height);
            const result = await saveManager.predict(srcCanvas,params);
            console.log(result);
            
        }
    },[image]);

    return (
        <div className="App">
            <Webcam
                ref={webcamRef}
                audio={false}
                height={200}
                screenshotFormat="image/jpeg"
                width={220}
                videoConstraints={videoConstraints}
            />
            <div className="capture-btn">
                {image === null ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        // setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
            <canvas id="srccanvas"></canvas>
            <canvas id="dstcanvas"></canvas>
            <img id="img" src={image}></img>
        </div>
    );
}

export default ImgFaceDetect;
