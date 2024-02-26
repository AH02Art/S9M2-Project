import React from 'react'

export default class Form extends React.Component {
  render() {
    const {  } = this.props;
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onSubmit}>
          <input 
            type="text" 
            placeholder="Enter Todo" 
            value={this.props.input} 
            onChange={this.props.onChange}>
          </input>
          <input type="submit"></input>
        </form>
        <button 
          onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayCompleted ? "Hide" : "Show"} Completed
        </button>
      </>
    );
  };
};
