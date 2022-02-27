import { Badge } from 'react-bootstrap'
import styled from 'styled-components'

export const TodoListDiv = styled.div`
    display: flex;
    align-items: center;
`

export const TodoListHeader = styled.div`
    font-size: 1.2rem;
`

export const TodoItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 12px;
`

export const TodoItemCheckBox = styled.input.attrs({ type: 'checkbox' })`
    flex: 0 0 auto;
`

export const TodoItemContent = styled.div`
    flex: 0 1 auto;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.2rem;
    color: ${props => props.isDone ? 'silver' : 'black'};
    cursor: pointer;
`

export const TodoItemBadge = styled(Badge)`
    background-color: ${props => props.color || 'primary'} !important;
    flex: 0 0 auto;
`
