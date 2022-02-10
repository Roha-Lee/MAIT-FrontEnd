import React, { useEffect } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  useEffect(() => {
    let interval = null;
    let startTime = 0;
    if(isRunning) {
      startTime = Date.now();
      interval = setInterval(() => {
        setTime(() => Date.now() - startTime);
      }, 35)
    } 
    return () => {
      const endTime = Date.now();
      clearInterval(interval);
      console.log('start time: ', startTime);
      console.log('end time: ', endTime);
      console.log((endTime - startTime).toString());
    };
  }, [isRunning]);

  function handleStopwatch () {
    setIsRunning((current) => !current);
  }

  return (
    <div className="stopwatch-container">
      <h1>
        <span>{ (time >= 3600000 ? Math.floor((time / 3600000) % 24) : Math.floor((time/ 60000) % 60)).toString().padStart(2, '0') }</span>:
        <span>{ (time >= 3600000 ? Math.floor((time / 60000) % 60) : Math.floor((time/ 1000) % 60)).toString().padStart(2, '0') }</span>:
        <span>{ (time >= 3600000 ? Math.floor((time / 1000) % 60) : Math.floor((time % 1000) / 10)).toString().padStart(2, '0') }</span>
      </h1>
      <button 
        type="button" 
        onClick={handleStopwatch}>
          {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default Stopwatch;
