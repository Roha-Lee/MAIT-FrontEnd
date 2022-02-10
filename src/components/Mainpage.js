import React, { useEffect } from 'react';
import Stopwatch from './Stopwatch';
import Axios from 'axios';

Axios.defaults.withCredentials = true;
class Mainpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subjects: ['Math', 'English', 'Programming', 'Roha'],
            subjects_idx: 2, 
        }
        // this.getUserData.bind(this);
    }
    clickHandler = (e) => {
        this.setState( (state) => 
        ({   
            subjects_idx: state.subjects.findIndex((elem) => elem == e.target.innerText),
        }));    
    }
    // getUserData() {
    //     const option = {
    //         url: 'http://192.249.31.123:3000',
    //         method: 'GET',
    //         headers: {

    //         }
    //     }
    //     Axios.get(option)
    //     .then(response => console.log(response))
        
    // }
    render() {
        return (
            <div>
                <div className="subject-container">
                    {this.state.subjects.map((subject)=>(<button onClick={this.clickHandler}>{subject}</button>))}
                </div>
                
                <Stopwatch 
                    subject={this.state.subjects.length > 0 && 
                    this.state.subjects[this.state.subjects_idx]}/>
                
            </div>
        );
    }
}
export default Mainpage;