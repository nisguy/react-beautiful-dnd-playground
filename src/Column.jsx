import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tasks from "./Tasks/Tasks";

class Column extends Component {
  state = {};

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {providedCol => (
          <Droppable
            type="task"
            droppableId={this.props.column.id}
            isDropDisabled={this.props.isDropDisabled}
          >
            {(provided, snapshot) => (
              <div
                {...providedCol.draggableProps}
                ref={providedCol.innerRef}
                style={{
                  display: "flex",
                  margin: "10px",
                  flexDirection: "column",
                  transition: "backgroundColor 0.2s ease",
                  backgroundColor: snapshot.isDraggingOver ? "purple" : null,
                  ...providedCol.draggableProps.style
                }}
                {...provided.droppableProps}
                className="container mt-4 jumbotron"
              >
                <h1 {...providedCol.dragHandleProps} className="display-4">
                  {this.props.column.title}
                </h1>
                <br />
                <Tasks tasks={this.props.tasks} innerRef={provided.innerRef} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </Draggable>
    );
  }
}

export default Column;
