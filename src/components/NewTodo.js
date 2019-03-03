import React, { Component } from 'react';
import uuid from 'uuid'

export default class TodoForm extends Component {
  state = {
    inputText: '',
    error: null
  }

  onInputChange = (evt) => {

    const value = evt.target.value;

    this.setState({inputText: value})
  }

  handleSubmit = (evt) => {
    
    const { onFormSubmit } = this.props;
    const { inputText } = this.state;
    
    evt.preventDefault();

    const title = inputText.trim()

    onFormSubmit({ title, id: uuid.v4(), isCompleted: false })
    this.setState({inputText: ''})
  }
  

  render() {
    const { inputText } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={inputText} onChange={this.onInputChange}/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
