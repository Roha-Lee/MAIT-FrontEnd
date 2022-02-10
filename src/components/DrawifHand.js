function DrawifHand (ifHand) {
    
    const element = document.getElementById('handDetect');
    if(ifHand){
        element.innerText = "Hand Detected";
    }
    else
    {
        element.innerText = "Hand No Detected";
    }

}

export default DrawifHand;