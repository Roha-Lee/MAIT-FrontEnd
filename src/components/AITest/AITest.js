import React from 'react';

class AITest extends React.Component {
  render() {
    const {timerRunning, onChangeTimerRunning} = this.props;
    return (
      <button onClick={() => onChangeTimerRunning(timerRunning)}>
        테스트 버튼
      </button>
    );
  }
}

export default AITest;