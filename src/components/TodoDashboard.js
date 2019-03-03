import React from 'react';
import PropTypes from 'prop-types';
import uuid from "uuid";

import EditableTodoList from './EditableTodoList';
import NewTodo from './NewTodo';
import ErrorHandler from './ErrorHandler';

const defaultState = [
  {
    title: 'Wash the car',
    id: uuid.v4(),
    isCompleted: false
  },
  {
    title: 'Buy groceries',
    id: uuid.v4(),
    isCompleted: false
  },
  {
    title: 'Walk the dog',
    id: uuid.v4(),
    isCompleted: true
  },
]

export default class TodoDashboard extends React.Component {

  static propTypes = {
    todos: PropTypes.number,
    title: PropTypes.array
  }

  state = {
    todos: defaultState,
    error: null
  }

  onFormSubmit = (newTodo) => {

    if (!newTodo.title || newTodo.title.length < 3) {
      this.setState({ error: 'Please enter something.' })
      return;
    }

    const titles = this.state.todos.map((todo) => todo.title.toLowerCase())

    if (titles.indexOf(newTodo.title.toLowerCase()) !== -1) {
      this.setState({error: 'This item is already on the list'})
      return;
    } 

    const newTodos = [{...newTodo}, ...this.state.todos]
    // const newTodos = this.state.todos.concat(todo) // Concat Method

    this.setState({todos: newTodos, error: null})

  }

  onRemove = (todoToRemove) => {
    const todos = this.state.todos.filter((todo) => {
      return todo !== todoToRemove
    })
    this.setState({todos})
  }

  markAllAsCompleted = () => {
    const completedTodos = this.state.todos.map((todo) => {
      return {
        ...todo, isCompleted: true
      }
    });

    this.setState({todos: completedTodos})
  }

  onUpdate = (todoToUpdate) => {
    const otherTodos = this.state.todos.filter((todo) => todo.id !== todoToUpdate.id)
    const updatedTodo = {...todoToUpdate, isCompleted: !todoToUpdate.isCompleted}
    this.setState({todos: [updatedTodo, ...otherTodos]})
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('todos');
      const todos = JSON.parse(json);

      if (todos) {
        this.setState({ todos })
      }
    } catch (error) {
      // Do nothing at all
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos.length !== this.state.todos.length) {
      const json = JSON.stringify(this.state.todos)
      localStorage.setItem('todos', json)
    }
  }

  render() {
    const { todos, error } = this.state;

    const todosCompleted = todos.filter((todo) => todo.isCompleted);
    const todosNotCompleted = todos.filter((todo) => !todo.isCompleted);

    return (

        <div className="container">
          <span>{this.props.children}</span>
          <NewTodo
            onFormSubmit={this.onFormSubmit}
          />
          <ErrorHandler
            error={error}
           />

          <EditableTodoList
            title="Not Completed"
            todos={todosNotCompleted}
            onRemove={this.onRemove}
            onUpdate={this.onUpdate}
          />

          <EditableTodoList
            title="Completed"
            todos={todosCompleted}
            onRemove={this.onRemove}
            onUpdate={this.onUpdate}
          />

          <input type="submit" value="Mark all as completed" onClick={this.markAllAsCompleted}/>

        </div>

    )
  }
}
