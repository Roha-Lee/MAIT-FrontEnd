function Capture() {
    const captureBtn = document.getElementById("captureFace")
    
    console.log(captureBtn);
    setInterval(()=>{
        captureBtn.click();
    },500)
    

    return null;
}

export default Capture;