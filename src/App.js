// import DetectFace from "./components/DetectFace";
import DetectHandsFace from "./components/DetectHandsFace";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";




function App() {
  
  const [faceNet,setFaceNet] = useState();
  const [handNet,setHandNet] = useState();

  const getModels = async () => {
    console.log("load model");
    const faceModel = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh,{maxFaces:1,scoreThreshold : 0.8})
    
    // console.log(faceModel , "getModels");
    setFaceNet(faceModel);
    setHandNet(await handpose.createDetector(handpose.SupportedModels.MediaPipeHands,{runtime : "tfjs"}));

  };

  useEffect(
    () => {
      getModels();      
    }
  ,[]);

  const [detectModel , setDetectModel] = useState("X");
  const [isStudy, setIsStudy] = useState(false);
  // console.log(faceNet);
  // console.log(handNet);
  const onChange = (event) => {

    // console.log(event.target.value);
    setDetectModel(event.target.value);
  };
  
  // console.log(isStudy);

  return(
    <div className="App">
      <select onChange={onChange} value={detectModel}>
        <option value="X">X</option>
        <option value="Face">얼굴인식</option>
        <option value="Hand">손인식</option>
      </select>
      <DetectHandsFace 
        detectModel={detectModel}
        setIsStudy={setIsStudy}
        faceNet = {faceNet}
        handNet = {handNet}
      />
      <h1>{isStudy ? "공부중" : "노는중"}</h1>
    </div>
  );
}

export default App;
