import { useCallback, useEffect, useState } from 'react'
// import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import styled from 'styled-components';
import { deleteTodo, patchTodo } from '../../utils/utils';
import {connect} from "react-redux";
import { Modal, Button, Select } from 'antd'
const { Option } = Select;
const TodoEditModal = ({ subjects, todo, onChange, onDelete, onCloseClick }) => {
    const [content, setContent] = useState('')
    const [selectedSubject, setSelectedSubject] = useState(
        subjects.find(subject=> subject.subjectId === todo.subjectId).name
    )

    useEffect(() => setContent(todo?.content || ''), [todo])

    const onDeleteTodo = (e) => {
        deleteTodo(todo.todoId)
        .then(() => {
            onDelete(todo);
            onCloseClick(e);
        })    
    }
    const onChangeTodo = (e) => {
        const changeSubjectId = subjects.find(subject => subject.name === selectedSubject).subjectId;
        patchTodo(todo.todoId, content, todo.isDone, changeSubjectId)
        .then(() => {
            onChange(todo, content);
            onCloseClick(e);
        })
    }
    

    return (
    <Modal 
        bodyStyle={{ height: '80px'}}    
        title={"할일 수정/삭제"} 
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
        defaultValue={selectedSubject}>
            {subjects.map(item => <Option key={item.subjectId} onClick={() => setSelectedSubject(item)}>{item.name}</Option>)}
        </Select>
        </Form>
    </Modal>
    )
}
function mapStateToProps(state){
    return{
        subjects : state.subjects,
    };
}

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



export default connect(mapStateToProps) (TodoEditModal)