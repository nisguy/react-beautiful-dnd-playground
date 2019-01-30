import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Tasks from "./Tasks/Tasks";

class Column extends Component {
  state = {};

  render() {
    return (
      <Droppable
        droppableId={this.props.column.id}
        isDropDisabled={this.props.isDropDisabled}
      >
        {(provided, snapshot) => {
          return (
            <div
              style={{
                display: "flex",
                margin: "10px",
                flexDirection: "column",
                transition: "backgroundColor 0.2s ease",
                backgroundColor: snapshot.isDraggingOver ? "purple" : null
              }}
              {...provided.droppableProps}
              className="container mt-4 jumbotron"
            >
              <h1 className="display-4">{this.props.column.title}</h1>
              <br />
              <Tasks tasks={this.props.tasks} innerRef={provided.innerRef} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  }
}

export default Column;
