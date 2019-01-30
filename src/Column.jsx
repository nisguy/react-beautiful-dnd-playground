import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Tasks from "./Tasks/Tasks";

class Column extends Component {
  state = {};
  render() {
    return (
      <div style={{ maxWidth: 420 }} className="container mt-4 jumbotron">
        <h1 className="display-4">{this.props.column.title}</h1>
        <br />
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <div {...provided.droppableProps}>
              <Tasks tasks={this.props.tasks} innerRef={provided.innerRef} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default Column;
