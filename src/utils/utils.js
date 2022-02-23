import Axios from 'axios';
Axios.defaults.headers.common['Authorization'] = `${window.localStorage.getItem('accessToken')}`
const serverAddress = 'https://mait.shop';
const serverAddress2 = 'http://192.249.29.5:3001';

function timeStamp(){ 
  let today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

function getAllUserData() {
  return Axios.get(`${serverAddress}/mainpage`, {});
}

function postSubject(subject, colorCode) {
  return Axios.post(
    `${serverAddress}/subject`, 
    {
      subject,
      colorId:colorCode,
    });
}

function putSubject(name, colorId, subjectId) {
  return Axios.put(`${serverAddress}/subject/${subjectId}`, {name, colorId});
}

function deleteSubject(subjectId) {
  return Axios.delete(`${serverAddress}/subject/${subjectId}`);
}

function postNewTodo(content, subjectId) {
  return Axios.post(`${serverAddress2}/todos`, {
    content, 
    subjectId
  })
}

function todoUpdate(todoId) {
  return Axios.patch(`${serverAddress2}/todos/${todoId}`);
}

function postStudyTime(subjectId, startTime) {
  console.log("postStudyTime", subjectId, startTime)
  return Axios.post(
    `${serverAddress}/studytime`,
    {
      subjectId,
      startTime, 
    })
}

function patchStudyTime(studyTimeId, endTime) {
  console.log("patchStudyTime", endTime)
  return Axios.patch(
    `${serverAddress}/studytime/${studyTimeId}`,
    {
      endTime, 
    })
}

export {getAllUserData, postSubject, timeStamp, deleteSubject, todoUpdate, postNewTodo, putSubject, postStudyTime, patchStudyTime}