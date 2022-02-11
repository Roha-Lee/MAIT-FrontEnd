// import DetectFace from "./components/DetectFace";
import DetectHandsFace from "./components/DetectHandsFace";
import { useState } from "react";

function App() {
  const [detectModel , setDetectModel] = useState("X");
  
  const onChange = (event) => {

    // console.log(event.target.value);
    setDetectModel(event.target.value);
  };
  
  // console.log(detectModel);

  return(
    <div className="App">
      <select onChange={onChange} value={detectModel}>
        <option value="X">X</option>
        <option value="Face">얼굴인식</option>
        <option value="Hand">손인식</option>
      </select>
      <DetectHandsFace detectModel={detectModel}/>
    </div>
  );
}

export default App;
