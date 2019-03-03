import React from 'react';
import PropTypes from 'prop-types';


const Todo = ({ todo, index, onRemove, onUpdate }) => {

  const cssClasses = [];

  if (todo.isCompleted) {
    cssClasses.push('todo-completed')
  }

  return (
    <div className="todo">
      <div>
        <p onClick={onUpdate} className="todo-text"><span className={cssClasses}>{index+1}. {todo.title}</span></p>
        
      </div>
      <div>
        <i onClick={onRemove} className="todo-icon far fa-trash-alt fa-lg"></i>
      </div>
      
    </div>
  )
}

export default Todo;

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onUpadte: PropTypes.func
}