import React from 'react';

import PropTypes from 'prop-types'

import Todo from './Todo';

const EditableTodoList = (props) => {

    return (
      
      <div>
        <h2 className="todolist-title">{props.title} ({props.todos.length})</h2>
        {
          props.todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              index={index}
              onRemove={() => props.onRemove(todo)}
              onUpdate={() => {props.onUpdate(todo)}}
            />
          ))
        }
      </div>
    )
  
}

export default EditableTodoList;

EditableTodoList.propTypes = {
  title: PropTypes.string,
  todos: PropTypes.array,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func
}