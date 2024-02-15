import React, { Component } from "react";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            list: [],
        };
    }

    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                id: Math.random(),
                value: this.state.userInput,
            };
          const list = [...this.state.list];
            list.push(userInput);
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    deleteItem(key) {
        const list = [...this.state.list];
        const updateList = list.filter((item) => item.id !== key);
        this.setState({
            list: updateList,
        });
    }

    editItem = (index) => {
        const todos = [...this.state.list];
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodos = [...todos];
            updatedTodos[index].value = editedTodo;
            this.setState({
                list: updatedTodos,
            });
        }
    };

    render() {
        return (
            <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5 w-25">
                <div className="head">
                    <h1>TODO LIST</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md">
                        <div class="input-group mb-3 p-4">
                            <input className="form-control p-2 border rounded" placeholder="add item . . . " value={this.state.userInput} onChange={(item) => this.updateInput(item.target.value)} />
                            <button className="btn btn-info w-25 ms-3 border rounded" onClick={() => this.addItem()}><b className="text-white">ADD</b></button>
                        </div>
                    </div>
                </div>

                <div className="ms-4 mx-3">
                    {this.state.list.map((item, index) => (
                        <div key={index} className="border rounded p-2 bg mb-3">
                            <div className="item_value">
                                <h6 className="pt-2">{item.value}</h6>
                                <span>
                                    <button class="btn btn-danger" style={{ marginRight: "10px" }} onClick={() => this.deleteItem(item.id)}> Delete </button>
                                    <button class="btn btn-success" onClick={() => this.editItem(index)}>Edit</button>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
