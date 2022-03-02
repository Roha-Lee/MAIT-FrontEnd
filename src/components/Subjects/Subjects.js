import React, { useState, useRef, useEffect } from 'react';
import 'animate.css';
import style from './Subjects.module.css'
import { Modal, Button } from 'antd';
import {postSubject, deleteSubject, putSubject, timeStamp} from '../../utils/utils'
import ColorPicker from '../ColorPicker/ColorPicker'
import {connect} from "react-redux";
import { TabBox, FlexBox, SubjectBox, ButtonBox, SubjectName, SubjectColorCircle, SubjectControlButton} from './Subjects.styled'
import { notification} from 'antd';
import { useNavigate } from 'react-router';
import {changeSubjects} from "../../store";

const INITIAL_COLOR_HEX = 'dda0dd';
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
  setGlobalSubjects, 
  subjects, 
  currentSubject, 
  setCurrentSubject,
  currentTime,
  setCurrentTime,
  timerOn,
  setTimerOn, 
  setUserTimerOn,
  isEditMode,
  setIsEditMode,
  colorsIdtoCode,
  colorsCodetoId,
  isLogin,
  currentStudyTimeId, 
}){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [color, setColor] = useState(INITIAL_COLOR_HEX);
  const [newSubject, setNewSubject] = useState(null); // 새로 생성된 과목의 subjectId
  const [nowEditing, setNowEditing] = useState(null); // 현재 수정하고 있는 과목의 subjectId
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState(INITIAL_COLOR);
  const subjectEndRef = useRef();
  
  useEffect(() => {scrollToRight()}, [subjects]);

  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }
  let navigate = useNavigate();

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
  
  const handleModifyOk = async (event) => {
    event.preventDefault();
    
    try {
      const result = await putSubject(value, colorsCodetoId[color], nowEditing);
      setIsEditModalVisible(false);
      const editingSubject = subjects.find(subject => subject.subjectId === nowEditing).name;
      let newSubjects = [...subjects];
      const idx = subjects.findIndex(subject => subject.subjectId === nowEditing);
      newSubjects[idx].name = value;
      newSubjects[idx].colorId = colorsCodetoId[color];
      setSubjects(newSubjects);
      setGlobalSubjects(JSON.parse(JSON.stringify(newSubjects)));
      if (currentSubject ===  editingSubject) {
        setCurrentSubject(newSubjects[idx].name);
        setCurrentTime(currentTime);
      } 
      resetModal()
      setIsEditMode(false);
    } 
    catch (error) {
      if(error.response.data.message === 'SUBJECT_EXISTS'){
        alert('이미 사용중인 과목입니다.');
      }
      else if (error.response.data.message === 'INVALID_COLOR'){
        alert('유효하지 않은 색깔입니다.')
      }
      else if (error.response.data.message === 'INVALID_NAME'){
        alert('유효하지 않은 이름입니다.')
      }
      else {
        alert('서버 에러.')
      }
    }
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    
    // 새로운 과목 추가 API
    try{
      const result = await postSubject(value, colorsCodetoId[color])
      const {id, name, colorId} = result.data;
      // const id = Math.ceil(Math.random() *10000);
      // const name = value;
      // const colorId = colorsCodetoId[color];
      const isSubjectEmpty = subjects.length === 0;
      setSubjects([
        ...subjects, 
        {
          subjectId: id, 
          name, 
          colorId, 
          totalTime: 0
        }
      ]);
      const copySubjects = JSON.parse(JSON.stringify(subjects));
      setGlobalSubjects([
        ...copySubjects, 
        {
          subjectId: id, 
          name, 
          colorId, 
          totalTime: 0
        }
      ]);

      if(isSubjectEmpty){
        setCurrentSubject(name);
        setCurrentTime(0);
      }
      setNewSubject(id); 
    } catch (error) {
      if (error.response.data.message === 'SUBJECT_EXISTS') {
        alert('이미 사용중인 과목 이름입니다. ')
      }
      else if(error.response.data.message === 'NO_SUBJECT_PROVIDED'){
        alert('과목 이름을 입력해야 합니다.')
      }
      else{
        alert('서버 에러.')
      }
    }
    resetModal();
    
    // console.log(result.data)
    // const id = subjects.length + 1;
    // setSubjects([
    //   ...subjects, 
    //   {
    //     subjectId: id, 
    //     name: value, 
    //     colorId: colorsCodetoId[color], 
    //     totalTime: 0
    //   }
    // ]);
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
    setColor(colorsIdtoCode[subjects.find(subject=> subject.name === event.target.innerText).colorId])
    setNowEditing(subjects.find(subject=> subject.name === event.target.innerText).subjectId)
    const currentColorId = subjects.find(subject=> subject.name === event.target.innerText).colorId
    setPickerColor(hexToRgb(colorsIdtoCode[currentColorId]))
    showEditModal()
    setNewSubject(null);  
  }
  

  const removeSubject = async (event) => {
    const delSubject = subjects.find(subject => subject.subjectId === nowEditing).name;
    // 삭제 통신 
    try{
      const status = await deleteSubject(nowEditing);
      
      const newSubjects = subjects.filter(subject => subject.subjectId !== nowEditing);
      if(newSubjects.length === 0){ 
        setIsEditMode(false);
      }

      if(currentSubject === delSubject){
        setCurrentSubject(newSubjects.length > 0 ? newSubjects[0].name : "");
        setCurrentTime(newSubjects.length > 0 ? newSubjects[0].totalTime : 0);
      }

      setSubjects(newSubjects);
      setGlobalSubjects(JSON.parse(JSON.stringify(newSubjects)));
      setNowEditing(null);
      setIsEditModalVisible(false);
    }
    catch (error) {
      alert('서버 에러.')
    }
    resetModal();
  }


  const changeSubject = (event) => {
    
    let newSubject = event.target.innerText ||event.target.parentElement.querySelector('span').innerText;
    let newCurrentTime = subjects.find((elem=>elem.name === newSubject)).totalTime;   
    if(timerOn && currentSubject !== newSubject){
      const updatedSubject = [...subjects];
      const subjectIdx = subjects.findIndex(subject => subject.name === currentSubject)
      updatedSubject[subjectIdx].totalTime = currentTime;
      setSubjects(updatedSubject);
      setGlobalSubjects(JSON.parse(JSON.stringify(updatedSubject)));
    }
    setTimerOn(false);
    setCurrentSubject(newSubject);
    setCurrentTime(newCurrentTime);
    setNewSubject(null);  
  }
  
  const subjectButtons = (
      subjects.map((subject) => (
        <TabBox 
          key={subject.subjectId}
          isSelected={subject.name === currentSubject}
          style={{
            filter: isEditMode === true ?  'brightness(80%)' : 'brightness(100%)',
            animation: isEditMode === true ? 'swing' : (subject.subjectId === newSubject ? 'bounce' : null) , 
            animationDuration: isEditMode === true ? '800ms' : (subject.subjectId === newSubject ? '800ms' : null) ,           
          }}
          onClick={(event)=>{isEditMode === true ? editSubject(event) :changeSubject(event)}}>
          <SubjectColorCircle subjectColor={colorsIdtoCode[subject.colorId]}/>
          <SubjectName>{subject.name}</SubjectName>
        </TabBox>
      ))
  )
  const subjectControlEditButtonClick = (event) => {
    if(isLogin){
      setNewSubject(null);  
      if(subjects.length !== 0){
        setIsEditMode(!isEditMode);
        // 설정 버튼 누르면 타이머 정지시켜야함. 
        setUserTimerOn(false);
        setTimerOn(false); 
      }
    }else{
      loginComment();
      setTimeout(navigate("/Login"),1000);
    }
  }
  const subjectControlAddButtonClick = (event) => {
    if(isLogin){
      if(isEditMode === false){
        showModal(event);
      }
      else {
        let target = event.target;
        if (target.tagName === 'IMG'){
          target = target.parentElement;
        }
        target.classList.add('animate__animated')
        target.classList.add('animate__headShake')
        setTimeout(() => {
          target.classList.remove('animate__animated')
          target.classList.remove('animate__headShake')
        }, 500);
      }
      setNewSubject(null);  
    }else{
      loginComment();
      setTimeout(navigate("/Login"),1000);
    }
  }
  const scrollToRight = () => {
    subjectEndRef.current.scrollIntoView({inline: 'end', behavior: 'smooth'});
}
  return (
          <>
          <FlexBox>
            <SubjectBox id="subjectBox">
              {subjectButtons}
              <div style={{float:'left', clear: 'both'}} ref={subjectEndRef} />
            </SubjectBox>
          <ButtonBox>
            <SubjectControlButton 
              onClick={subjectControlAddButtonClick}
              type="add"
              noSubject={subjects.length === 0}
              >
              <img src="img/add.svg" width="20" height="20"/>
            </SubjectControlButton>
            <SubjectControlButton
              onClick={subjectControlEditButtonClick}
              type="edit">
              <img src="img/edit.svg" width="20" height="20"/>
            </SubjectControlButton>  
          </ButtonBox>
            </FlexBox>
            <Modal title="새 과목 추가하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              {/* <NameForm onSubmit={handleOk} subjects={subjects} setSubjects={setSubjects} value={value} setValue={setValue} color={color} setColor={setColor}/> */}
              <form onSubmit={handleOk} className={style.form}>
                <label className={style.formTitle}>
                  <span>과목 입력</span>
                  <input  required maxLength={16} className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                </label>
                <ColorPicker colors={Object.values(colorsIdtoCode)} setColor={setColor} pickerColor={pickerColor} setPickerColor={setPickerColor} displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker}/>
              </form>
            </Modal>
            
            <Modal title="과목 수정하기" visible={isEditModalVisible} onOk={handleModifyOk} onCancel={handleCancel} footer={
              <div className={style.editModalFooter}>
                <span className={style.deleteDescription}>과목을 삭제해도 통계페이지에서<br/>해당 과목에 대한 기록을 확인할 수 있습니다.</span>
                <div>
                  <Button 
                    key="delete" 
                    className={style.modalDeleteButton} 
                    onClick={removeSubject}>
                    삭제
                  </Button>
                  <Button key="save" className={style.modalSaveButton} onClick={handleModifyOk}>
                    저장
                  </Button>
                  <Button key="cancle" className={style.modalCancleButton} onClick={handleCancel}>
                    취소
                  </Button>
                </div>
              </div>
            }>
              <form onSubmit={handleModifyOk} className={style.form}>
                <label className={style.formTitle}>
                  <span>과목 입력</span>
                  <input  required maxLength={16} className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                </label>
                <ColorPicker colors={Object.values(colorsIdtoCode)} setColor={setColor} pickerColor={pickerColor} setPickerColor={setPickerColor} displayColorPicker={displayColorPicker} setDisplayColorPicker={setDisplayColorPicker}/>
              </form>
            </Modal>
          </>);
}

function mapStateToProps(state){
  return{
      isLogin : state.isLogin,
      currentStudyTimeId : state.currentStudyTimeId,
  };
}

function mapDispatchToProps(dispatch){
  return{
      setGlobalSubjects : subjects => dispatch(changeSubjects(subjects)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Subjects);


//   <div className={style.trashContainer}>
//     <img className={style.upperImage} onClick={removeSubject} src="img/remove-hover.svg" width="20" height="20"/>
//     <img src="img/remove.svg" width="20" height="20"/>
//   </div>
// ,
          