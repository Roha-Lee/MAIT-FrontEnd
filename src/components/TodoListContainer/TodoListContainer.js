import { useCallback, useState } from 'react'
import { 
    TodoListDiv,
    TodoItemContainer,
    TodoListHeader,
    TodoItemCheckBox,
    TodoItemContent,
    TodoItemBadge,
} from './TodoListContainer.styled'
import {postNewTodo} from '../../utils/AppUtils';
import TodoInput from '../TodoInput/TodoInput'
import TodoEditModal from '../TodoEditModal/TodoEditModal'

// TodoListContainer TodoList들을 관리하는 전체적인 폼
const TodoListContainer = ({subjects}) => {
    const [todoList, setTodoList] = useState([
        { id: 1, content: 'AAA', isDone: false },
        { id: 2, content: 'BB', isDone: false, subjectId: 'subject1' },
        { id: 3, content: 'C', isDone: true, subjectId: 'subject2' },
    ])

    const [editingTodo, setEditingTodo] = useState(null)

    const toggleTodo = useCallback((target) => {
        setTodoList(todoList.map((todo) => todo.id === target.id ? { ...todo, isDone: !todo.isDone } : todo))
    }, [todoList])

    const onItemAdd = useCallback((item) => {
        postNewTodo(item.content, item.subjectId);
        setTodoList([...todoList, item])
    }, [todoList])

    const handleCloseEditModal = useCallback(() => {
        setEditingTodo(null)
    }, [setEditingTodo])

    const handleChange = useCallback((target, content) => {
        setTodoList(todoList.map((todo) => todo.id === target.id ? { ...todo, content } : todo))
        handleCloseEditModal()
    }, [todoList, setTodoList, handleCloseEditModal])

    const handleDelete = useCallback((target) => {
        console.log(target)
        setTodoList(todoList.filter((todo) => todo.id !== target.id))
    },[todoList, setTodoList])

    const renderTodo = useCallback((todo) => {
        return (
            <TodoItemContainer>
                <TodoItemCheckBox checked={todo.isDone} onClick={() => toggleTodo(todo)} />
                <TodoItemContent isDone={todo.isDone} onClick={() => setEditingTodo(todo)}>{todo.content}</TodoItemContent>
                <TodoItemBadge color={`#${subjects.find(subject => subject.id === todo.subjectId)?.color}`}>{subjects.find(subject => subject.id === todo.subjectId)?.name}</TodoItemBadge>
            </TodoItemContainer>
        )
    }, [subjects, toggleTodo])

    return (
        <TodoListDiv>
            <TodoListHeader>TODO</TodoListHeader>
            {todoList.map(todo => renderTodo(todo))}
            <TodoInput subjects={subjects} onItemAdd={onItemAdd} />
            <TodoEditModal todo={editingTodo} onChange={handleChange} onCloseClick={handleCloseEditModal} onDelete={handleDelete} />
        </TodoListDiv>
    )
}

export default TodoListContainer