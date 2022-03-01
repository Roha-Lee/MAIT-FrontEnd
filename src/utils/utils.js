import Axios from 'axios';
// Axios.defaults.headers.common['Authorization'] = `${window.localStorage.getItem('accessToken')}`
const serverAddress = 'https://mait.shop';
// const serverAddress2 = 'http://192.249.29.5:3001';
function msToHmsFormat(time) {
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / (1000 * 60)) % 60);
  const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function timeStamp(){ 
  let today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}
function getRankingData() {
  return Axios.get(`${serverAddress}/statistics/ranking`,{
    headers: {
      Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }    
  });
}
function getAllUserData() {
  return Axios.get(`${serverAddress}/mainpage`, {
    headers: {
        Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }
});
}

function postSubject(subject, colorCode) {
  return Axios.post(
    `${serverAddress}/subject`, 
    {
      subject,
      colorId:colorCode,
    }, {
      headers: {
          Authorization: `${window.sessionStorage.getItem('accessToken')}`
      }
  });
}
function postSignup(nickname, name, email, password) {
  return Axios.post(`${serverAddress}/auth/signup`, {
    nickname : nickname,
    username : name,
    email : email,
    password : password,
  })
}
function putSubject(name, colorId, subjectId) {
  return Axios.put(`${serverAddress}/subject/${subjectId}`, {name, colorId}, {
    headers: {
        Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }
});
}

function deleteSubject(subjectId) {
  return Axios.delete(`${serverAddress}/subject/${subjectId}`, {
    headers: {
        Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }
});
}

function postNewTodo(content, subjectId) {
  return Axios.post(`${serverAddress}/todos`, {
    content, 
    subjectId
  }, {
    headers: {
        Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }
})
}

function todoUpdate(todoId) {
  return Axios.patch(`${serverAddress}/todos/${todoId}`,{}, {
    headers: {
        Authorization: `${window.sessionStorage.getItem('accessToken')}`
    }
});
}

function postStudyTime(subjectId, startTime) {
  console.log('postStudyTime', subjectId, startTime);
  return Axios.post(
    `${serverAddress}/studytime`,
    {
      subjectId,
      startTime, 
    }, {
      headers: {
          Authorization: `${window.sessionStorage.getItem('accessToken')}`
      }
  })
}

function patchStudyTime(studyTimeId, endTime) {
  console.log('patchStudyTime', studyTimeId, endTime);
  return Axios.patch(
    `${serverAddress}/studytime/${studyTimeId}`,
    {
      endTime, 
    }, {
      headers: {
          Authorization: `${window.sessionStorage.getItem('accessToken')}`
      }
  })
}

function signOut(){
  return Axios.post(
    `${serverAddress}/auth/signout`,
    {
      accessToken : `${window.sessionStorage.getItem('accessToken')}`
    }, {
      headers: {
          Authorization: `${window.sessionStorage.getItem('accessToken')}`
      }
  })
}

export {postSignup, msToHmsFormat, getRankingData, getAllUserData, postSubject, timeStamp, deleteSubject, todoUpdate, postNewTodo, putSubject, postStudyTime, patchStudyTime, signOut}
