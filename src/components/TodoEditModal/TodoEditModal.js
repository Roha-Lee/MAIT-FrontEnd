import { useCallback, useEffect, useState } from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap'
import axios from 'axios'

const TodoEditModal = ({ todo, onChange, onDelete, onCloseClick }) => {
    const [content, setContent] = useState('')
    useEffect(() => setContent(todo?.content || ''), [todo])

    const deleteTodo = () => {
        axios.delete(`/todos/${todo.id}`)
            .then(() => onDelete(todo))    
    }

    return (
        <Modal show={!!todo} onHide={onCloseClick}>
            <Modal.Header closeButton>
                <Modal.Title>{todo?.content}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onCloseClick}>
                Close
            </Button>
            <Button variant="primary" onClick={() => onChange(todo, content)}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={deleteTodo}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TodoEditModal