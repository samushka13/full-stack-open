import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, i) =>
        <div key={i} >
          <hr />
          <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        </div>
      )}
    </>
  )
}

export default TodoList
