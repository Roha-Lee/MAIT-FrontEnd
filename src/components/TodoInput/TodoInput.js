import { useCallback, useState } from 'react'
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
import { 
    TodoInputContainer,
    FormButton,
} from './TodoInput.styled'
import { postNewTodo } from '../../utils/utils'
const TodoInput = ({ todoList, subjects, onItemAdd }) => {
    //subject dropbox에 대한 설정 초기 값은 null
    const [subject, setSubject] = useState('Unselect')
    
    //직접 사용자가 Inputbox에 입력한 과목명
    const [text, setText] = useState('')
    
    //add button을 누를때 불리는 함수
    const onSubmit = useCallback(async () => {
        const todoSubjectId = subject !== 'Unselect' ? subjects.find(elem => elem.name === subject).subjectId : null;
        try {
            const result = await postNewTodo(text, todoSubjectId);
            setText('')
            // onItemAdd({ subjectId: subject?.subjectId, content: text, id: todoList.length + 1})
        }
        catch (error) {
            console.log(error);
        }            

    }, [onItemAdd, subject, text])

    return (
        <TodoInputContainer>
            <InputGroup className="mb-3">
                <FormControl value={text} onChange={(event) => {setText(event.target.value)}} />
                <select 
                    onChange={(event) => {
                        setSubject(event.target.value)
                    }}
                    title={subject?.name || 'Subject...'}>
                    <option key={'unselect'} value={'Unselect'}>Unselect</option>
                    {subjects.map(item => <option key={item.subjectId} value={item.name}>{item.name}</option>)}
                </select>
            </InputGroup>
            <FormButton onClick={onSubmit}>Add</FormButton>
        </TodoInputContainer>
    )
}

export default TodoInput