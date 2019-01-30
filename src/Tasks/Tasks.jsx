import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

class Tasks extends Component {
  render() {
    const taskList = this.props.tasks.map((task, index) => {
      return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              // isDragging={snapshot.isDragging}
              ref={provided.innerRef}
              style={{
                maxWidth: 400,
                ...provided.draggableProps.style
              }}
              className={classNames({
                alert: true,
                "alert-success": snapshot.isDragging,
                "alert-primary": !snapshot.isDragging
              })}
            >
              {task.content}
            </div>
          )}
        </Draggable>
      );
    });
    return <div ref={this.props.innerRef}>{taskList}</div>;
  }
}

export default Tasks;
