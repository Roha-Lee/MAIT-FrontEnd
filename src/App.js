
// import Mainpage from './components/Mainpage'
import React from 'react';
import Navigation from './components/Navigation'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      studyLog : {
        'math': 100,
        'english': 200,
        'programming': 12000
      },
      useAI : false,
      todoLists : {

      }
    }
  }
  render() {
    return (
      <div className="App">
        <Navigation />

      </div>
    );
  } 
}

export default App;
