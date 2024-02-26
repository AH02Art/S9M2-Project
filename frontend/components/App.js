import React from 'react'
import axios from "axios";
import Form from "./Form.js";
import TodoList from "./TodoList.js";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
    state = {
      todos: [],
      error: "",
      input: "",
      displayCompleted: true
    };

    onChange = (event) => {
      // onChange best to extract the value from event.target before changing a value of state
      const { value } = event.target;
      // added debugger here
      this.setState({ ...this.state, input: value });
    };

    // helper function reseting the form
    resetForm = () => this.setState({ ...this.state, input: "" })

    // helper function setting Axios error response
    axiosErrorResponse = (error) => this.setState({ ...this.state, error: error.response.data.message });

    postTodo = () => {
      axios.post(URL, {name: this.state.input} )
        .then((response) => {
          // added debugger here for testing
          this.setState({ ...this.state, todos: this.state.todos.concat(response.data.data) });
          this.resetForm();
        })
        .catch(this.axiosErrorResponse);
    };

    onSubmit = (event) => {
      // preventing the page from refreshing everytime we click on the submit handler button
      event.preventDefault();
      this.postTodo();
    };

    fetchTodos = () => {
      axios.get(URL)
        .then((response) => {
          // never assume where the information we need from our called api is coming from ( not always response.data )
          // added debugger here for testing
          this.setState({ ...this.state, todos: response.data.data });
        })
        .catch(this.axiosErrorResponse);
    };

    toggleDisplayCompleted = () => {
      this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
    };

    // what is this? And why is there two arrows in this function? 
    // is this an arrow function returning an arrow function returning stuff?
    toggleCompleted = (id) => () => {
      axios.patch(`${URL}/${id}`)
        .then((response) => {
          // added debugger here for testing
          this.setState({ ...this.state, todos: this.state.todos.map((items) => {
            if (items.id !== id) return items;
            return response.data.data;
          })});
        })
        .catch(this.axiosErrorResponse);
    }
 
    componentDidMount() {
      // fetch all todos from server
      this.fetchTodos();
    };

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList 
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          input={this.state.input}
          displayCompleted={this.displayCompleted}
        />
      </div>
    );
  };
};
