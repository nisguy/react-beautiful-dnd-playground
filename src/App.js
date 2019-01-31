import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
    // col

    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
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
        <Droppable direction="horizontal" droppableId="columns" type="column">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const isDropDisabled = index < this.state.homeIndex;
                const column = this.state.columns[columnId];
                const tasks = column.tasks.map(task => {
                  return this.state.tasks[task];
                });
                return (
                  <Column
                    column={column}
                    index={index}
                    isDropDisabled={isDropDisabled}
                    tasks={tasks}
                    key={columnId}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
