import { useCallback, useState } from 'react'
import { 
    TodoListDiv,
    TodoItemContainer,
    TodoListHeader,
    TodoItemCheckBox,
    TodoItemContent,
    TodoItemBadge,
 } from './TodoListContainer.styled'

 import TodoInput from '../TodoInput/TodoInput'
 import TodoEditModal from '../TodoEditModal/TodoEditModal'


// TodoListContainer TodoList들을 관리하는 전체적인 폼
const TodoListContainer = ({subjects}) => {
    const [todoList, setTodoList] = useState([
        { id: 1, content: '알고리즘 BFS 문제 풀기', isDone: false, subjectId:  1},
        { id: 2, content: '운영체제 VM 파트 공부하기', isDone: false, subjectId: 2 },
        { id: 3, content: 'Javascript 12단원 공부하기', isDone: false, subjectId: 3 },
    ])
    const [editingTodo, setEditingTodo] = useState(null)

    const toggleTodo = useCallback((target) => {
        setTodoList(todoList.map((todo) => todo.id === target.id ? { ...todo, isDone: !todo.isDone } : todo))
    }, [todoList])

    const onItemAdd = useCallback((item) => {
        // postNewTodo(item.content, item.subjectId);
        const newItem = {
            subjectId: item.subjectId,
            content: item.content,
            isDone: false, 
            id: todoList.length + 1,
        }

        setTodoList([...todoList, newItem])
    }, [todoList])

    const handleCloseEditModal = useCallback(() => {
        setEditingTodo(null)
    }, [setEditingTodo])

    const handleChange = useCallback((target, content) => {
        console.log('adsfadsfa', todo, content)
        setTodoList(todoList.map((todo) => todo.id === target.id ? { ...todo, content } : todo))

        handleCloseEditModal()
    }, [todoList, setTodoList, handleCloseEditModal])

    const renderTodo = useCallback((todo) => {
        return (
            <TodoItemContainer key={todo.id}>
                <TodoItemCheckBox checked={todo.isDone} onClick={() => toggleTodo(todo)} />
                <TodoItemContent isDone={todo.isDone} onClick={() => setEditingTodo(todo)}>{todo.content}</TodoItemContent>
                <TodoItemBadge color={`#${subjects.find(subject => subject.subjectId === todo.subjectId)?.color}`}>{subjects.find(subject => subject.subjectId === todo.subjectId)?.name}</TodoItemBadge>
            </TodoItemContainer>
        )
    }, [subjects, toggleTodo])

    return (
        <TodoListDiv>
            <TodoListHeader>TODO</TodoListHeader>
            {todoList.map(todo => renderTodo(todo))}
            <TodoInput todoList={todoList} subjects={subjects} onItemAdd={onItemAdd} />
            <TodoEditModal todo={editingTodo} onChange={handleChange} onCloseClick={handleCloseEditModal} />
        </TodoListDiv>
    )
}

export default TodoListContainer
