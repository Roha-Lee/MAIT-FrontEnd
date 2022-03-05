function Capture(type) {
    // console.log(type);
    const captureBtn = document.getElementById(`capture${type}`)

    if(captureBtn !== null){

        const interval = setInterval(()=>{
            captureBtn.click();
        },1000)
        return interval;
    }
}

export default Capture;