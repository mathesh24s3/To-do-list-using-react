import React from "react";

// importing components
import Task from "../task/Task";

import "./List.css";

import deleteIcon from "../../assets/delete-icon.png";

export default function List({
  list,
  setLists,
  // setName,
  handleListChanges,
  addTask,
  deleteList,
  toggleTaskCompleted,
  deleteTask,
  editTask,
  // taskValue,
  // setTaskValue,
}) {
  const listRef = React.useRef(null);
  setTimeout(() => {
    listRef.current?.classList.remove("hidden");
  }, 100);

  const taskComponents = list.tasks.map((task) => (
    <Task
      key={task.taskId}
      task={task.task}
      id={task.taskId}
      listId={list.listId}
      toggleTaskCompleted={toggleTaskCompleted}
      isTaskCompleted={task.taskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  return (
    <div
      ref={listRef}
      className="list hidden"
      style={{ backgroundColor: list.listColor }}
      draggable={true}
      onDragStart={(e) => {
        e.preventDefault();
        e.target.classList.add("dragging");
        console.log(e.clientX);
      }}
      onDrag={(e) => {
        // e.target.classList.add("dragging");
        e.target.style.top = e.clientY;
        e.target.style.left = e.clientX;
        console.log(e.clientY);
      }}
    >
      <img
        src={deleteIcon}
        onClick={() => deleteList(list.listId)}
        className="delete-icon"
      />
      <input
        type="text"
        name="listName"
        className="list-name"
        onChange={(e) => handleListChanges(e, list.listId)}
        value={list.listName}
        placeholder={list.listName ? "" : "Title"}
      />
      <div>
        <input
          type="date"
          name="listDate"
          className="list-date"
          onChange={(e) => handleListChanges(e, list.listId)}
          value={list.listDate}
        />
        <input
          type="color"
          name="listColor"
          className="list-color"
          onChange={(e) => handleListChanges(e, list.listId)}
          value={list.listColor}
        />
      </div>

      <ul className="task-container">
        {taskComponents}
        <input
          type="text"
          name="task"
          placeholder={"+ add a task"}
          className="add-task"
          // onChange={(e) => setTaskValue(e.target.value)}
          onKeyDown={(e) => addTask(e, list.listId)}
        />
      </ul>
    </div>
  );
}
