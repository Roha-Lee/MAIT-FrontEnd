import React, { useState } from 'react';
import style from './Subjects.module.css'
import { Modal, Button } from 'antd';
import NameForm from '../NameForm/NameForm';

function Subjects({
  setSubjects, 
  subjects, 
  currentSubject, 
  setCurrentSubject,
  setCurrentTime,
  setTimerOn}){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [color, setColor] = useState('F17103');
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    const length = subjects.length;
    setSubjects([
      ...subjects, 
      {
        id: length + 1, 
        name: value, 
        color: color, 
        totalTime: 0
      }
    ]);
    setValue('');
    // console.log(color, value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    
  const changeSubject = (event) => {
    let newSubject = event.target.innerText;
    let newCurrentTime = subjects.find((elem=>elem.name === newSubject)).totalTime;
    if(currentSubject === newSubject){
      newSubject = null
      newCurrentTime = 0;
    }
    setTimerOn(false);
    setCurrentSubject(newSubject);
    setCurrentTime(newCurrentTime);
  }
  const subjectButtons = (
    <div className={style.subjectManager}>
      {subjects.map((subject) => (
        <div className={style.buttonContainer}>
          <button 
            key={subject.id}
            className={style.subject}
            style={{'backgroundColor': `#${subject.color}`}}
            onClick={(event)=>{changeSubject(event, currentSubject)}}>
            {subject.name}
          </button>
          <div className={style.buttonModify}>m</div>
        </div>
      ))}
    </div>
  )
  return (<div className={style.subjectsContainer}>
            {subjectButtons}
            <button 
            className={style.addButton} 
            onClick={showModal}>
              +
            </button>
            <Modal title="새 과목 추가하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <NameForm onSubmit={handleOk} subjects={subjects} setSubjects={setSubjects} value={value} setValue={setValue} color={color} setColor={setColor}/>
            </Modal>
          </div>);
}

export default Subjects;