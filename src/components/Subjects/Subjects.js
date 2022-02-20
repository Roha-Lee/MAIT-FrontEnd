import React, { useState } from 'react';
import style from './Subjects.module.css'
import { Modal, Button } from 'antd';
import {postNewSubject, deleteSubject} from '../../utils/utils'
import ColorPicker from '../ColorPicker/ColorPicker'
import 'animate.css';

const INITIAL_COLOR_HEX = 'FFEB3B';
const INITIAL_COLOR = hexToRgb(INITIAL_COLOR_HEX);

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1
  } : null;
}

function Subjects({
  setSubjects, 
  subjects, 
  currentSubject, 
  setCurrentSubject,
  setCurrentTime,
  setTimerOn, 
  setUserTimerOn}){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  const [value, setValue] = useState('');
  const [color, setColor] = useState('FFEB3B');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [nowEditing, setNowEditing] = useState(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState(INITIAL_COLOR);
  
  function resetModal() {
    setPickerColor(INITIAL_COLOR)
    setValue('');
    setColor(INITIAL_COLOR_HEX);
  }
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const showEditModal = () => {
    setIsEditModalVisible(true);
  }
  
  const handleModifyOk = (event) => {
    event.preventDefault();
    setIsEditModalVisible(false);
    const editingSubject = subjects.find(subject => subject.subjectId === nowEditing).name;
    let newSubjects = [...subjects];
    const idx = subjects.findIndex(subject => subject.subjectId === nowEditing);
    newSubjects[idx].name = value;
    newSubjects[idx].color = color;
    setSubjects(newSubjects);
    if (currentSubject ===  editingSubject) {
      setCurrentSubject(newSubjects[idx].name);
    } 
    resetModal()
    setIsEditMode(false);
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    // 새로운 과목 추가 API
    // const {id, content, colorCode} = await postNewSubject(value, color);
    // setSubjects([
    //   ...subjects, 
    //   {
    //     subjectId: id, 
    //     name: content, 
    //     color: colorCode, 
    //     totalTime: 0
    //   }
    // ]);
    const length = subjects.length;
    setSubjects([
      ...subjects, 
      {
        subjectId: length + 1, 
        name: value, 
        color: color, 
        totalTime: 0
      }
    ]);
    resetModal();
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsModalVisible(false);
    setDisplayColorPicker(false);
    resetModal();
    setNowEditing(null);
  };
  
  const editSubject = (event) => {
    setValue(event.target.innerText)
    // 중복이 없다고 가정. 
    setColor(subjects.find(subject=> subject.name === event.target.innerText).color)
    setNowEditing(subjects.find(subject=> subject.name === event.target.innerText).subjectId)
    const colorCode = subjects.find(subject=> subject.name === event.target.innerText).color;
    setPickerColor(hexToRgb(colorCode))
    showEditModal()
  }
  

  const removeSubject = async (event) => {
    const delSubject = subjects.find(subject => subject.subjectId === nowEditing).name;
    alert(`${delSubject} 삭제 완료!`);
    // 삭제 통신 
    // const status = await deleteSubject(nowEditing);
    
    // nowEditing 이랑 currentSubject랑 같으면 
    if(currentSubject === delSubject){
      setCurrentSubject(null);
      setCurrentTime(0);
    }

    const newSubjects = subjects.filter(subject => subject.subjectId !== nowEditing);
    setSubjects(newSubjects);
    setNowEditing(null);
    setIsEditModalVisible(false);
    if(subjects.length === 0){
      console.log('subject is empty')
      setIsEditMode(false);
    }
    resetModal();
  }


  const changeSubject = (event) => {
    let newSubject = event.target.innerText;
    let newCurrentTime = subjects.find((elem=>elem.name === newSubject)).totalTime;
    // 과목 없음 부분 
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
      {subjects.map((subject, index, array) => (
        <button 
          key={subject.id}
          className={style.subject} 
          style={{
            backgroundColor: `#${subject.color}`,
            filter: isEditMode === true ?  'brightness(80%)' : 'brightness(100%)',
            animation: isEditMode === true ? 'swing' : null, 
            animationDuration: isEditMode === true ? '800ms' : null, 
          }}
          onClick={(event)=>{
            isEditMode === true ? editSubject(event) :changeSubject(event)}}>
          {subject.name}
        </button>        
      ))}
    </div>
  )
  return (<div className={style.subjectsContainer}>
            {subjectButtons}
            <button 
            className={style.addButton} 
            onClick={(event) => {
              if(isEditMode === false){
                showModal(event);
                console.log(color)
              }
            }}
            >
              <img src="img/add.svg" width="20" height="20"/>
            </button>
            <button 
            className={style.addButton} 
            onClick={() => {
              setIsEditMode(!isEditMode);
              
              // 설정 버튼 누르면 타이머 정지시켜야함. 
              setUserTimerOn(false);
              setTimerOn(false);
              
            }}>
              <img src="img/edit.svg" width="20" height="20"/>
            </button>
            <Modal title="새 과목 추가하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              {/* <NameForm onSubmit={handleOk} subjects={subjects} setSubjects={setSubjects} value={value} setValue={setValue} color={color} setColor={setColor}/> */}
              <form onSubmit={handleOk} className={style.form}>
                <label className={style.formTitle}>
                  <span>과목 입력</span>
                  <input  required className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                </label>
                <ColorPicker setColor={setColor} pickerColor={pickerColor} setPickerColor={setPickerColor} displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker}/>
              </form>
            </Modal>
            
            <Modal title="과목 수정하기" visible={isEditModalVisible} onOk={handleModifyOk} onCancel={handleCancel}>
              
              <form onSubmit={handleModifyOk} className={style.form}>
                <div className={style.trashContainer}>
                  <img className={style.upperImage} onClick={removeSubject} src="img/remove-hover.svg" width="20" height="20"/>
                  <img src="img/remove.svg" width="20" height="20"/>
              
                </div>
                <label className={style.formTitle}>
                  <span>과목 입력</span>
                  <input  required className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                </label>
                <ColorPicker setColor={setColor} pickerColor={pickerColor} setPickerColor={setPickerColor} displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker}/>
              </form>
            </Modal>
          </div>);
}

export default Subjects;