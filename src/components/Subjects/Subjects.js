import React from 'react';
import style from './Subjects.module.css'
class Subjects extends React.Component { 
    render() {
        const { studyLog, subjects, onChangeSubject, onChangeCurrentTime, timerRunning,  } = this.props;
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
                            className={[style.subject, subjects[elem] === this.props.currentSubjectId ? style.active : null].join(' ')}
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
                <button id="add-subject">+</button>    
            </div>
        );
    }
}
export default Subjects;