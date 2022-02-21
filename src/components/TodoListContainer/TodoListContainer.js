import { useCallback, useState } from 'react'
import { 
    TodoListDiv,
    TodoItemContainer,
    TodoListHeader,
    TodoItemCheckBox,
    TodoItemContent,
    TodoItemBadge,
} from './TodoListContainer.styled'
import { todoUpdate } from '../../utils/utils'
import TodoInput from '../TodoInput/TodoInput'
import TodoEditModal from '../TodoEditModal/TodoEditModal'



// TodoListContainer TodoList들을 관리하는 전체적인 폼
const TodoListContainer = ({todoList, setTodoList, subjects, colorsIdtoCode, colorsCodetoId}) => {
  // const [todoList, setTodoList] = useState([
  //     { id: 1, content: 'AAA', isDone: false },
  //     { id: 2, content: 'BB', isDone: false, subjectId: 'subject1' },
  //     { id: 3, content: 'C', isDone: true, subjectId: 'subject2' },
  // ])

  const [editingTodo, setEditingTodo] = useState(null)

  const toggleTodo = useCallback( async (target) => {
    // 통신 코드 추가 
    try {
        const updateResponse = await todoUpdate(target.todoId);
        if (updateResponse.data.message === 'success') {
          setTodoList(todoList.map((todo) => todo.todoId === target.todoId ? { ...todo, isDone: !todo.isDone } : todo))            
        }
    }
    catch (error) {
        console.log(error);
    }
  }, [todoList])

  const onItemAdd = useCallback((item) => {
      // postNewTodo(item.content, item.subjectId);
      const newItem = {
          subjectId: item.subjectId,
          content: item.content,
          isDone: false, 
          todoId: todoList.length + 1,
      }

      setTodoList([...todoList, newItem])
  }, [todoList])

  const handleCloseEditModal = useCallback(() => {
      setEditingTodo(null)
  }, [setEditingTodo])

  const handleChange = useCallback((target, content) => {
      setTodoList(todoList.map((todo) => todo.todoId === target.todoId ? { ...todo, content } : todo))
      handleCloseEditModal()
  }, [todoList, setTodoList, handleCloseEditModal])

  const handleDelete = useCallback((target) => {
      setTodoList(todoList.filter((todo) => todo.todoId !== target.todoId))
  },[todoList, setTodoList])

  const renderTodo = useCallback((todo) => {
      return (
          <TodoItemContainer key={todo.todoId}>
              <TodoItemCheckBox checked={todo.isDone} onClick={() => toggleTodo(todo)} />
              <TodoItemContent isDone={todo.isDone} onClick={() => setEditingTodo(todo)}>{todo.content}</TodoItemContent>
              <TodoItemBadge 
              color={`#${colorsIdtoCode[subjects.find(subject => subject.subjectId === todo.subjectId)?.colorId]}`}
              >
                  {subjects.find(subject => subject.subjectId === todo.subjectId)?.name}
              </TodoItemBadge>
          </TodoItemContainer>
      )
  }, [subjects, toggleTodo])

  return (
      <TodoListDiv>
          <TodoListHeader>TODO</TodoListHeader>
          {todoList.map(todo => renderTodo(todo))}
          <TodoInput subjects={subjects} onItemAdd={onItemAdd}/>
          <TodoEditModal todo={editingTodo} onChange={handleChange} onCloseClick={handleCloseEditModal} onDelete={handleDelete} subjects={subjects}/>
      </TodoListDiv>
  )
}

export default TodoListContainer