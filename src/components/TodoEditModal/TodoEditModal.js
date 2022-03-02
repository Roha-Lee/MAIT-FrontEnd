import { useCallback, useEffect, useState } from 'react'
import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import axios from 'axios'
import {connect} from "react-redux";

const TodoEditModal = ({ subjects, todo, onChange, onDelete, onCloseClick }) => {
    const [content, setContent] = useState('')
    useEffect(() => setContent(todo?.content || ''), [todo])

    const deleteTodo = () => {
        axios.delete(`/todos/${todo.id}`, {
            headers: {
                Authorization: `${window.sessionStorage.getItem('accessToken')}`
            }
        })
        .then(() => onDelete(todo))    
    }

    const [subject, editSubject] = useState('')

    // const [edit, editSubject] = useSate('')

    return (
        <Modal show={!!todo} onHide={onCloseClick}>
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
            <Button variant="danger" onClick={deleteTodo}>
                삭제
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

function mapStateToProps(state){
    return{
        subjects : state.subjects,
    };
}

export default connect(mapStateToProps) (TodoEditModal)