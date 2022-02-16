function Capture(type) {
    const captureBtn = document.getElementById(`capture${type}`)
    const interval = setInterval(()=>{
        captureBtn.click();
    },500)
    return interval;
}

export default Capture;