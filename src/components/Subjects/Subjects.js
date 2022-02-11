import React from 'react';
import style from './Subjects.module.css'
import Modal from '../Modal/Modal'
class Subjects extends React.Component { 
  render() {
    const { studyLog, subjects, onChangeSubject, onChangeCurrentTime, timerRunning, openModal, isOpen, closeModal, currentSubjectId } = this.props;
    const onClickHandler = (e) => {
      onChangeSubject(subjects[e.target.innerText]);
      onChangeCurrentTime(studyLog[e.target.innerText]);
    }
    
    return (
      <div className={style.subjectContainer}>
        <div className={style.subjects} >
          {Object.keys(studyLog).map((elem) => 
          <div key={`divpa${subjects[elem]}`}>
            <button 
              className={[style.subject, subjects[elem] === currentSubjectId ? style.active : null].join(' ')}
              key={subjects[elem]} 
              onClick={onClickHandler}
              disabled={timerRunning === true}>
              {elem}
            </button>
            <div key={`div${subjects[elem]}`}>
              {studyLog[elem]}
            </div>
            </div>
            )}
        </div>
        <button onClick={ openModal }>+</button>
          <Modal 
            open={ isOpen } 
            close={ closeModal } 
            onAddSubject={this.props.onAddSubject}
            studyLog={studyLog} 
            subjects={subjects}
            headerText="새 과목 생성하기">
          </Modal>
  
      </div>
    );
  }
}
export default Subjects;