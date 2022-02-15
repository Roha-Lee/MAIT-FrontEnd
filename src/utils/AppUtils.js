import Axios from 'axios';

const serverAddress = 'http://192.249.29.198:3001';

async function getAllUserData() {
  try {
    const userStudyInfo = await Axios.get('https://192.249.31.115:3000/mainpage', {});
    return userStudyInfo;
  } catch(error) {
    return error;
  }
}

async function postNewSubject(subject, colorCode) {
    try {
      const newSubject = await Axios.post('http://192.249.31.50:3000/subject', {
        subject,
        colorCode:2,
      });
      return newSubject;
    } catch(error) {
      console.error(error);
    }
  }

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

export {getAllUserData, postNewSubject, postNewTodo}