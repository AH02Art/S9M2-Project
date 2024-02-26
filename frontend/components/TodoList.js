import React from 'react'
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
      <h2>Todos:</h2>
      {
        this.props.todos.reduce((accumulate, items) => {
          if (this.props.displayCompleted || !items.completed) return accumulate.concat(
            <Todo
              key={items.id} 
              items={items}
              toggleCompleted={this.props.toggleCompleted}
            />
          )
          return accumulate
        }, [])
      }
    </div>
    );
  };
};
