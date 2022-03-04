import { useCallback, useEffect, useState } from 'react'
// import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import styled from 'styled-components';
import { deleteTodo, patchTodo } from '../../utils/utils';
// import {connect} from "react-redux";
import { Modal, Button, Select } from 'antd'
const { Option } = Select;
const TodoEditModal = ({ subjects, todo, onChange, onDelete, onCloseClick }) => {
    const [content, setContent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);
    
    useEffect(() => {
        setContent(todo?.content || '');
        if(!!todo){
            console.log('useEffect', todo);
            console.log('useEffect-changed', subjects.find(subject=> subject.subjectId === todo.subjectId ).name)
            setSelectedSubject(subjects.find(subject=> subject.subjectId === todo.subjectId ).name);
        }
    }, [todo])

    const onDeleteTodo = (e) => {
        console.log('onDeleteTodo', todo)
        deleteTodo(todo.todoId)
        .then(() => {
            onDelete(todo);
            onCloseClick(e);
        })    
    }
    const onChangeTodo = (e) => {
        console.log('onChangeTodo', todo);
        console.log('selectedSubject', selectedSubject);
        const changeSubjectId = subjects.find(subject => subject.name === selectedSubject).subjectId;
        console.log('todo.todoId, content, todo.isDone, changeSubjectId', todo.todoId, content, todo.isDone, changeSubjectId);
        patchTodo(todo.todoId, content, todo.isDone, changeSubjectId)
        .then(() => {
            onChange(todo, content, changeSubjectId);
            onCloseClick(e);
        })
    }
    
    const handleChange = (value) => {
        setSelectedSubject(value);        
    }

    return (
    <Modal 
        bodyStyle={{ maxHeight: '50vh' }}    
        title={"할일 수정/삭제"} 
        className={"TodoEditModal"}
        visible={!!todo} 
        onCancel={onCloseClick}
        centered
        footer={<>
            <Button 
            key="delete" 
            onClick={onDeleteTodo}
            >
            삭제
          </Button>
          <Button key="save" onClick={onChangeTodo}>
            저장
          </Button>
          <Button key="cancle" onClick={onCloseClick}>
            닫기
          </Button>
          </> 
        }> 
        <Form type="text" value={content} onSubmit={onChangeTodo} onChange={(e) => setContent(e.target.value)}>
        <Input required type="text" value={content} onChange={(event) => setContent(event.target.value)}/>
        <Select 
        style={{width: 100}}
        value={selectedSubject}
        onChange={handleChange}>
            {subjects?.map(item => <Option key={item.subjectId} value={item.name}>{item.name}</Option>)}
        </Select>
        </Form>
    </Modal>
    )
}
// function mapStateToProps(state){
//     return{
//         subjects : state.subjects,
//     };
// }

const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
`
const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #606060;
  background-color: #fff;
  padding: 8px 15px;
  margin: 0 20px;  
  width: 300px;
`

export default TodoEditModal;
// export default connect(mapStateToProps) (TodoEditModal)