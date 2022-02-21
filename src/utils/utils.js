import Axios from 'axios';

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

function postNewSubject(subject, colorCode) {
  return Axios.post(
    `${serverAddress}/subject`, 
    {
      subject,
      colorId:colorCode,
    });
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

function deleteSubject(subjectId) {
  return Axios.delete(`${serverAddress}/subject/${subjectId}`);
}

export {getAllUserData, postNewSubject, timeStamp, deleteSubject, todoUpdate, postNewTodo}