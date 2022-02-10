import React from 'react';

class Subjects extends React.Component {
    
    render() {
        const { studyLog, subjects, onChangeSubject, onChangeCurrentTime, timerRunning,  } = this.props;
        const onClickHandler = (e) => {
            onChangeSubject(subjects[e.target.innerText]);
            onChangeCurrentTime(studyLog[e.target.innerText]);
        }
        
        return (
            <div className="subjects-container">
                <div className="subjects" >
                    {Object.keys(studyLog).map((elem) => 
                    <div key={`divpa${subjects[elem]}`}>
                        <button 
                            key={subjects[elem]} 
                            onClick={onClickHandler}
                            disabled={timerRunning === true}
                            style={{
                                color: subjects[elem] === this.props.currentSubjectId ? "red" : "black"
                            }}>
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