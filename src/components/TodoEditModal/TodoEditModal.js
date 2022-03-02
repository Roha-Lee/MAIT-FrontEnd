import { useCallback, useEffect, useState } from 'react'
// import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import { deleteTodo } from '../../utils/utils';
import {connect} from "react-redux";
import { Modal, Button } from 'antd'
const TodoEditModal = ({ subjects, todo, onChange, onDelete, onCloseClick }) => {
    const [content, setContent] = useState('')
    useEffect(() => setContent(todo?.content || ''), [todo])

    const onDeleteTodo = (e) => {
        deleteTodo(todo.todoId)
        .then(() => {
            onDelete(todo);
            onCloseClick(e);
        })    
    }

    const [subject, editSubject] = useState('')

    // const [edit, editSubject] = useSate('')

    return (
    <Modal 
        bodyStyle={{ height: '25vh', maxHeight: "45vh"}}    
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
          <Button key="save" onClick={() => onChange(todo, content)}>
            저장
          </Button>
          <Button key="cancle" onClick={onCloseClick}>
            닫기
          </Button>
          </> 
        }> 
        <form type="text" value={content} onSubmit={() => onChange(todo, content)} onChange={(e) => setContent(e.target.value)}>
        <label>
            <span>과목 입력</span>
            <input  required maxLength={16} type="text" value={content} onChange={(event) => setContent(event.target.value)}/>
        </label>
        <option onClick={() => editSubject(null)}>Unselect</option>
            {subjects.map(item => <option key={item.subjectId} onClick={() => editSubject(item)}>{item.name}</option>)}
        </form>
    </Modal>
    )
}
{/* <Modal show={!!todo} onHide={onCloseClick}>
            <Modal.Header closeButton>
                <Modal.Title>수정이나 삭제가 가능합니다.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                <Form.Select>
                    <option onClick={() => editSubject(null)}>Unselect</option>
                        {subjects.map(item => <option key={item.subjectId} onClick={() => editSubject(item)}>{item.name}</option>)}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onCloseClick}>
                닫기
            </Button>
            <Button variant="primary" onClick={() => onChange(todo, content)}>
                저장
            </Button>
            <Button variant="danger" onClick={onDeleteTodo}>
                삭제
            </Button>
            </Modal.Footer>
        </Modal> */}
function mapStateToProps(state){
    return{
        subjects : state.subjects,
    };
}

export default connect(mapStateToProps) (TodoEditModal)