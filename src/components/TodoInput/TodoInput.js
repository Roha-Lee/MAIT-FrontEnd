import { useCallback, useState } from 'react'
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
import { 
    TodoInputContainer,
    FormButton,
} from './TodoInput.styled'

const TodoInput = ({ todoList, subjects, onItemAdd }) => {
    //subject dropbox에 대한 설정 초기 값은 null
    const [subject, setSubject] = useState(null)
    
    //직접 사용자가 Inputbox에 입력한 과목명
    const [text, setText] = useState('')
    
    //add button을 누를때 불리는 함수
    const onSubmit = useCallback(() => {
        // console.log("총 과목", subjects)
        // console.log("과목 테스트", subject);
        // console.log({ subjectId: subject?.subjectId, content: subject?.name, id: text });
        onItemAdd({ subjectId: subject?.subjectId, content: text, id: todoList.length + 1})

        setSubject(null)
        setText('')
    }, [onItemAdd, subject, text])

    return (
        <TodoInputContainer>
            <InputGroup className="mb-3">
                <FormControl value={text} onChange={(e) => setText(e.target.value)} />
                <select
                    variant="outline-secondary"
                    title={subject?.name || 'Subject...'}
                >
                    <option onClick={() => setSubject(null)}>Unselect</option>
                    {subjects.map(item => <option onClick={() => setSubject(item)}>{item.name}</option>)}
                </select>
            </InputGroup>
            <FormButton onClick={onSubmit}>Add</FormButton>
        </TodoInputContainer>
    )
}

export default TodoInput
