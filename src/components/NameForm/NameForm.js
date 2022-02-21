import React, {useState} from 'react';
import style from './NameForm.module.css';

function NameForm({setSubjects, subjects, value, setValue, color, setColor, onSubmit}) {
  return (
    <form onSubmit={onSubmit} className={style.form}>
      <label className={style.formTitle}>
        <span>과목 입력</span>
        <input  required className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
      </label>
      <ColorPicker setColor={setColor}/>
      {/* <input className={style.formSubmit} type="submit" value="submit" onClick={(event) => {event.target.value.length>0?onSubmit(event):null}}/> */}
    </form>
  );
}

export default NameForm;

// class NameForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event) {
//       event.preventDefault();
//       // 서버로 과목 전송하기 
//       // 서버로 전송한 후에 return 되는 id로 업데이트 해야하는데, 이게 되나 싶음 
//       this.props.onAddSubject(this.state.value);
//       this.setState({value: ''})
//         // 닫기
//     }
  
//     render() {
//       return (
        // <form onSubmit={this.handleSubmit}>
        //   <label className={style.formTitle}>
        //     과목 입력
        //     <input className={style.form} type="text" value={this.state.value} onChange={this.handleChange} required/>
        //   </label>
        //   <ColorPicker />
        //   <input className={style.formSubmit} type="submit" value="submit" />
        // </form>
      
//       );
//     }
//   }
  
