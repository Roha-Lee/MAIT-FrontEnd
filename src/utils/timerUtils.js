import Axios from 'axios';

function sendStudyInterval(startTime, endTime, subjectId) {
    Axios.post(
      'http://192.249.31.123:3000/stopwatch',
      {
        subject: subjectId,
        user_id: 1,
        start_time: JSON.stringify(startTime), 
        end_time: JSON.stringify(endTime),
      })
  }
  
