import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        onClick={this.props.toggleCompleted(this.props.items.id)}
      >
        {this.props.items.name} {this.props.items.completed ? " ✔" : ""}
      </div>
    );
  };
};
