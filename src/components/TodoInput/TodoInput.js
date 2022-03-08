import { useCallback, useState } from 'react'
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
import { 
    TodoInputContainer,
    FormButton,
} from './TodoInput.styled'
import { postNewTodo } from '../../utils/utils'
// import {connect} from "react-redux";
import { notification} from 'antd';

const TodoInput = ({ subjects, onItemAdd }) => {
    //subject dropbox에 대한 설정 초기 값은 null
    const [subject, setSubject] = useState('Unselect')
    
    //직접 사용자가 Inputbox에 입력한 과목명
    const [text, setText] = useState('')
    
    //add button을 누를때 불리는 함수
    const onSubmit = useCallback(async () => {
        console.log("inside-onsubimit", text === '')
        try {
            const todoSubjectId = subject !== 'Unselect' ? subjects.find(elem => elem.name === subject).subjectId : null;
            if(!todoSubjectId){
                console.log("inside-onsubimit subject null case")
                notification.open({
                    message : "과목을 선택해주세요.",
                });
            }
            else if(text === ''){
                console.log("inside-onsubimit content null case")
                console.log("할일을 입력해 주세요")
                notification.open({
                    message : "할일을 입력해주세요.",
                });
            }
            else{
                console.log("inside-onsubimit no null case")
                const result = await postNewTodo(text, todoSubjectId);
                const {id:todoId, content, subject_id:subjectId, is_done:isDone} = result.data.todo;
                setText('');
                onItemAdd({ subjectId, content, todoId, isDone});
            }
        }
        catch (error) {
            console.log(error);
        }            
        
    }, [onItemAdd, subject, text])

    return (
        <TodoInputContainer>
            <InputGroup>
                <FormControl maxLength={30} value={text} onChange={(event) => {setText(event.target.value)}} />
                <select 
                    onChange={(event) => {
                        setSubject(event.target.value)
                    }}
                    title={subject?.name || 'Subject...'}>
                    <option key={'unselect'} value={'Unselect'}>선택 안함</option>
                    <option key={'test'} value={'test'}>test</option>
                    {subjects?.map(item => <option key={item?.subjectId} value={item.name}>{item.name}</option>)}
                </select>
            </InputGroup>
            <FormButton onClick={onSubmit}>추가</FormButton>
        </TodoInputContainer>
    )
}

// function mapStateToProps(state){
//     return{
//         todoList : state.todoList,
//         subjects : state.subjects,
//     };
// }


// export default connect(mapStateToProps) (TodoInput);
export default TodoInput;
