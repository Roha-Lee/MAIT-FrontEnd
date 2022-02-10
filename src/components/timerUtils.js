import Axios from 'axios';
Axios.defaults.withCredentials = false;
function sendStudyInterval(startTime, endTime, subjectId) {
  // console.log('startTime', startTime);
  // console.log('endTime', endTime);
  // console.log('subjectId', subjectId);
    Axios.post(
      'http://192.249.31.123:3000/stopwatch',
      {
        subject: 1,
        user_id: 1,
        start_time: JSON.stringify(startTime), 
        end_time: JSON.stringify(endTime),
      })
  }
  
function timeStamp(){ 
  let today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

function indexToName(obj, idx) {
  return Object.keys(obj).find((elem) => obj[elem] === idx);
}
export {sendStudyInterval, timeStamp, indexToName}