import React from "react";

import deleteTaskIcon from "../../assets/delete-task-icon.png";
import editTaskIcon from "../../assets/edit-task-icon.png";

export default function Task(props) {
  const taskRef = React.useRef(null);
  const [editable, setEditable] = React.useState(false);
  setTimeout(() => {
    taskRef.current.classList.remove("hidden");
  }, 100);
  return (
    <li ref={taskRef} className="task hidden">
      <input
        type="checkbox"
        id={`task-${props.id}`}
        name="taskCompleted"
        checked={props.isTaskCompleted ? true: false}
        onChange={(e) => props.toggleTaskCompleted(e, props.id, props.listId)}
      />
      <label
        // htmlFor={`task-${props.id}`}
        style={{
          textDecoration: props.isTaskCompleted ? "line-through" : "none",
        }}
        onBlur={(e) => {
          setEditable(false);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          e.target.contentEditable = true;
          setEditable(true);
          // console.log(e.target.textContent);
        }}
        onKeyDown={(e) =>
          props.editTask(e, props.id, props.listId, setEditable)
        }
      >
        {props.task}
      </label>
      <div className="modify-task">
        {editable && (
          <img
            src={editTaskIcon}
            className="edit-task"
            onClick={() => {
              // props.setEditTaskId(props.id);
              // props.editSelectedTask(props.id, props.listId);
            }}
          />
        )}
        <img
          src={deleteTaskIcon}
          className="delete-task"
          onClick={() => props.deleteTask(props.id, props.listId)}
        />
      </div>
    </li>
  );
}
