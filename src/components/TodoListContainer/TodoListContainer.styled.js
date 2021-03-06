import { Badge } from 'react-bootstrap'
import styled from 'styled-components'
import "animate.css"
export const TodoListDiv = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction : column;
`

export const TodoListHeader = styled.div`
    font-size: 1.2rem;
    color: #606060;
`

export const TodoItemContainer = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px 12px;
    margin: 5px 0;
    justify-content: space-between;
    border-radius: 10px;
    background-color: #f1f1f1;
    animation: slideInRight;
    animation-duration: .6s; 
`

export const TodoItemCheckBox = styled.input.attrs({ type: 'checkbox' })`
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
`

export const TodoItemContent = styled.div`
    flex: 0 1 auto;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1rem;
    color: ${props => props.isDone ? '#E0E0DF' : '#606060'};
    cursor: pointer;
`

export const TodoItemBadge = styled(Badge)`
    background-color: ${props => props.color || 'primary'} !important;
    flex: 0 0 auto;
`
