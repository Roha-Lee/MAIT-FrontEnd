import Axios from 'axios';
Axios.defaults.withCredentials = false;

async function getAllUserData() {
  try {
    const userStudyInfo = await Axios.get('http://192.249.31.66:3000/mainpage', {});
    const newState = {}
    return userStudyInfo;
  } catch(error) {
    return error;
  }
}

async function postNewSubject() {
    try {
      const studyInfo = await Axios.get('https://reqres.in/api/users?page=2', {});
      return studyInfo;
    } catch(error) {
      return error;
    }
  }

export {getAllUserData, postNewSubject}