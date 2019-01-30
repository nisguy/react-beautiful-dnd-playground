import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import "./App.css";
import { initialState } from "./initialState";
import Column from "./Column";

class App extends Component {
  state = initialState;

  onDragEnd = result => {
    console.log(result);

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTasksIds = Array.from(column.tasks);
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      tasks: newTasksIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [destination.droppableId]: newColumn
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.tasks.map(task => {
            return this.state.tasks[task];
          });
          return <Column column={column} tasks={tasks} key={columnId} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
