import Axios from 'axios';

const serverAddress = 'https://mait.shop';

async function getAllUserData() {
  try {
    const userStudyInfo = await Axios.get(`${serverAddress}/mainpage`, {});
    console.log(userStudyInfo);
    return userStudyInfo;
  } catch(error) {
    console.log(error);
    return error;
  }
}

function timeStamp(){ 
  let today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

async function postNewSubject(subject, colorCode) {
  try {
    const newSubject = await Axios.post('http://192.249.31.50:3000/subject', {
      subject,
      colorCode,
    });
    return newSubject;
  } catch(error) {
    console.error(error);
  }
}

async function deleteSubject(subjectId) {
  try {
    const deleteStatus = await Axios.delete(`http://192.249.31.50:3000/subject/${subjectId}`);
    return deleteStatus;
  } catch(error) {
    console.error(error);
  }
}











// async function postNewSubject(subject, colorCode) {
//     try {
//       const newSubject = await Axios.post('http://192.249.31.50:3000/subject', {
//         subject,
//         colorCode:2,
//       });
//       return newSubject;
//     } catch(error) {
//       console.error(error);
//     }
//   }

async function postNewTodo(content, subjectId) {
  try {
    const newTodo = await Axios.post(`${serverAddress}/todos`, {
      subjectId,
      content,
    });
    return newTodo;
  } catch(error) {
    console.error(error);
  }
}

export {getAllUserData, postNewSubject, postNewTodo, timeStamp, deleteSubject}