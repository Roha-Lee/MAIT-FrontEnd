
// import Mainpage from './components/Mainpage'
import React from 'react';
import Navigation from './components/Navigation'
import Subjects from './components/Subjects';
import Timer from './components/Timer';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      studyLog : {
        'math': 0,
        'english': 0,
        'programming': 0
      },
      useAI : false,
      timerRunning: false,
      currentSubjectId: 1,
      currentTime: 0,
      todoLists : {

      },
      subjects : {
        'math':1,
        'english':2,
        'programming':3
      }, 
    }
  }
  changeSubject = (id) => {
    this.setState({currentSubjectId : id});
  }

  changeCurrentTime = (newTime) => {
    this.setState({currentTime: newTime});
  }

  changeTimerRunning = (currentTimerRunning) => {
    this.setState({timerRunning : !currentTimerRunning});
  }

  changeStudyLog = (subject, newTime) => {
    const studyLog = {...this.state.studyLog};
    studyLog[subject] = newTime;
    this.setState({studyLog});
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Subjects 
          studyLog={this.state.studyLog} 
          subjects={this.state.subjects}
          timerRunning={this.state.timerRunning}
          onChangeSubject={this.changeSubject}
          onChangeCurrentTime={this.changeCurrentTime}
          currentSubjectId={this.state.currentSubjectId}
          />
        <Timer
          studyLog={this.state.studyLog} 
          subjects={this.state.subjects}
          timerRunning={this.state.timerRunning}
          currentSubjectId={this.state.currentSubjectId}
          currentTime={this.state.currentTime}
          onChangeCurrentTime={this.changeCurrentTime}  
          onChangeTimerRunning={this.changeTimerRunning} 
          onChangeStudyLog={this.changeStudyLog}
          />
      </div>
    );
  } 
}

export default App;
