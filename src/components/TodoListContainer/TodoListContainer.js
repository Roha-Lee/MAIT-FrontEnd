import { useCallback, useEffect, useState } from 'react'
import { 
    TodoListDiv,
    TodoItemContainer,
    TodoListHeader,
    TodoItemCheckBox,
    TodoItemContent,
    TodoItemBadge,
} from './TodoListContainer.styled'
import { patchTodo } from '../../utils/utils'
import TodoInput from '../TodoInput/TodoInput'
import TodoEditModal from '../TodoEditModal/TodoEditModal'
// import {connect} from "react-redux";
// import {changeTodoLists} from "../../store"
import { notification } from 'antd'


// TodoListContainer TodoList들을 관리하는 전체적인 폼
const TodoListContainer = ({
    todoList,
    setTodoList, 
    subjects, 
    colorsIdtoCode, 
}) => {
  // const [todoList, setTodoList] = useState([
  //     { id: 1, content: 'AAA', isDone: false },
  //     { id: 2, content: 'BB', isDone: false, subjectId: 'subject1' },
  //     { id: 3, content: 'C', isDone: true, subjectId: 'subject2' },
  // ])
    const [editingTodo, setEditingTodo] = useState(null)

    const toggleTodo = useCallback( async (target) => {
        // 통신 코드 추가 
        console.log('toggleTodo', target);
        try {
            const updateResponse = await patchTodo(
                target.todoId, 
                target.content, 
                !target.isDone,
                target.subjectId);
            if (updateResponse.data.message === 'SUCCESS') {
                setTodoList(todoList?.map((todo) => todo.todoId === target.todoId ? { ...todo, isDone: !todo.isDone } : todo))            
                console.log('updateResponse', updateResponse)    
            }
        }
        catch (error) {
            if (error.response.data.message === 'INVALID_USER') {
                notification.open({
                    message : "로그인을 해주세요",
                })
            }
        }
    }, [todoList]);

    const onItemAdd = useCallback((item) => {
        const newItem = {
            subjectId: item.subjectId,
            content: item.content,
            isDone: item.isDone, 
            todoId: item.todoId,
        }
        setTodoList([...todoList, newItem])
    }, [todoList]);

    const handleCloseEditModal = useCallback(() => {
        setEditingTodo(null)
    }, [setEditingTodo])

    const handleChange = useCallback((target, content, subjectId) => {
        setTodoList(todoList?.map((todo) => todo.todoId === target.todoId ? { ...todo, content, subjectId } : todo))
        handleCloseEditModal()
    }, [todoList, setTodoList, handleCloseEditModal])

    const handleDelete = useCallback((target) => {
        setTodoList(todoList?.filter((todo) => todo.todoId !== target.todoId))
    },[todoList, setTodoList])

    const renderTodo = useCallback((todo) => {
        console.log('reRender')
        console.log('subjects', subjects, 'todoList', todoList)
        return (
            <TodoItemContainer key={todo.todoId}>
                <TodoItemCheckBox checked={todo.isDone} onChange={() => toggleTodo(todo)} />
                <TodoItemContent isDone={todo.isDone} onClick={() => setEditingTodo(todo)}>{todo.content}</TodoItemContent>
                <TodoItemBadge
                color={`#${colorsIdtoCode[subjects?.find(subject => subject.subjectId === todo.subjectId)?.colorId]}`}
                >
                    {subjects?.find(subject => subject.subjectId === todo.subjectId)?.name}
                </TodoItemBadge>
            </TodoItemContainer>
        )
    }, [subjects, toggleTodo, todoList])

    return (
        <TodoListDiv>
            <TodoInput onItemAdd={onItemAdd} subjects={subjects}/>
                {todoList?.map(todo => renderTodo(todo))}
            <TodoEditModal subjects={subjects} todo={editingTodo} onChange={handleChange} onCloseClick={handleCloseEditModal} onDelete={handleDelete}/>
        </TodoListDiv>
    )
}

// function mapStateToProps(state){
//     return{
//         todoList : state.todoList,
//         subjects : state.subjects,
//         colorsCodetoId : state.colorsCodetoId,
//         colorsIdtoCode : state.colorsIdtoCode,
//     };
// }

// function mapDispatchToProps(dispatch){
//     return{
//         setTodoList : newTodos => dispatch(changeTodoLists(newTodos)),
//     };
// }

// export default connect(mapStateToProps,mapDispatchToProps) (TodoListContainer);
export default TodoListContainer;