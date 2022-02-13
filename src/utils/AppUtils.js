import Axios from 'axios';
Axios.defaults.withCredentials = false;

async function getAllUserData() {
  try {
    const userStudyInfo = await Axios.get('http://192.249.31.50:3000/mainpage', {});
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

export {getAllUserData, postNewSubject}