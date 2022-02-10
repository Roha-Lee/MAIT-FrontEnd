import React from 'react';

class Subjects extends React.Component {
    render() {
        const { studyLog, subjects, onChangeSubject, timerRunning } = this.props;
        return (
            <div className="subjects-container">
                <div className="subjects" >
                    {Object.keys(studyLog).map((elem) => <div key={`divpa${subjects[elem]}`}><button 
                        key={subjects[elem]} 
                        onClick={(e) => onChangeSubject(subjects[e.target.innerText])}
                        disabled={timerRunning===true}>
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