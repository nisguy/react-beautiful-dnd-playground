import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

// import "./App.css";
import { initialState } from "./initialState";
import Column from "./Column";

class App extends Component {
  state = initialState;

  onDragStart = start => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.3s ease";
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({ homeIndex });
  };

  onDragUpdate = update => {
    const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(this.state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  };

  onDragEnd = result => {
    // document.body.style.color = "inherit";

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

    const start = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];

    if (start === end) {
      const newTasksIds = Array.from(start.tasks);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
    } else {
      this.setState({ homeIndex: null });

      const oldTasksIds = Array.from(start.tasks);
      const newTasksIds = Array.from(end.tasks);
      oldTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const oldColumn = {
        ...start,
        tasks: oldTasksIds
      };
      const newColumn = {
        ...end,
        tasks: newTasksIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [destination.droppableId]: newColumn,
          [source.droppableId]: oldColumn
        }
      };
      this.setState(newState);
    }
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {this.state.columnOrder.map((columnId, index) => {
            const isDropDisabled = index < this.state.homeIndex;
            const column = this.state.columns[columnId];
            const tasks = column.tasks.map(task => {
              return this.state.tasks[task];
            });
            return (
              <Column
                column={column}
                isDropDisabled={isDropDisabled}
                tasks={tasks}
                key={columnId}
              />
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}

export default App;
