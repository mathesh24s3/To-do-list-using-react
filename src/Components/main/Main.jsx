import React from "react";

import "./Main.css";
//
import tempLogo from "../../assets/temp.png";
import List from "../list/list";

export default function Main() {
  const listData = localStorage.getItem("list-data");
  const [lists, setLists] = React.useState(JSON.parse(listData) || []);
  const [searchedList, setSearchedList] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const date = new Date();
  const date2 = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const dayMap = new Map();
  dayMap
    .set(0, "Sunday")
    .set(1, "Monday")
    .set(2, "Tuesday")
    .set(3, "Wednesday")
    .set(4, "Thursday")
    .set(5, "Friday")
    .set(6, "Saturday");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(dayMap);

  React.useEffect(() => {
    // if (searchedList) return;
    localStorage.setItem("list-data", JSON.stringify(lists));

    const filteredArray = lists.filter(
      (list) =>
        list.listName.toLowerCase().includes(searchedList.toLowerCase()) ||
        list.tasks.some((task) =>
          task.task.toLowerCase().includes(searchedList.toLowerCase())
        )
    );
    lists.forEach((list) =>
      console.log(
        list.listName.toLowerCase().includes(searchedList.toLowerCase()) ||
          list.tasks.some((task) =>
            task.task.toLowerCase().includes(searchedList.toLowerCase())
          )
      )
    );
    console.log(
      lists[2].tasks.some((task) =>
        task.task.includes(searchedList.toLowerCase())
      )
    );
    setSearchResults(filteredArray);
  }, [lists]);

  React.useEffect(() => {
    const filteredArray = lists.filter(
      (list) =>
        list.listName.toLowerCase().includes(searchedList.toLowerCase()) ||
        list.tasks.some((task) =>
          task.task.toLowerCase().includes(searchedList.toLowerCase())
        )
    );
    setSearchResults(filteredArray);
  }, [searchedList]);

  function addNewList() {
    setLists((prevList) => [
      ...prevList,
      {
        listName: "List",
        tasks: [],
        listDate: `${year}-${month > 9 ? month : "0" + month}-${date2}`,
        listId: Math.floor(Math.random() * 1111),
        listColor: "#fff6e7",
      },
    ]);
  }

  function handleListChanges(e, id) {
    const { name, value } = e.target;
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.listId === id ? { ...list, [name]: value } : list
      )
    );
  }

  function deleteList(id) {
    const filteredArr = lists.filter((list) => list.listId !== id);
    setLists(filteredArr);
  }

  function addNewTask(e, id) {
    const {
      key,
      target: { value },
    } = e;
    if (key === "Enter") {
      if (!value) return;
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.listId === id
            ? {
                ...list,
                tasks: [
                  ...list.tasks,
                  {
                    task:
                      value.trim().toUpperCase().charAt(0) +
                      value.trim().slice(1),
                    taskId: Math.floor(Math.random() * 1111),
                    taskCompleted: false,
                  },
                ],
              }
            : list
        )
      );
      e.target.value = "";
      // setTaskValue("");
    }
  }

  function toggleTaskCompleted(e, id, listId) {
    const { name, value, checked } = e.target;
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.listId === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task.taskId === id ? { ...task, [name]: checked } : task
            ),
          };
        } else {
          return list;
        }
      })
    );
  }

  function deleteTask(id, listId) {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.listId === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.taskId !== id),
          };
        } else {
          return list;
        }
      })
    );
  }

  function editTask(e, id, listId, setEditable) {
    const { textContent } = e.target;
    console.log(textContent);
    if (e.key === "Enter") {
      e.preventDefault();
      setEditable(false);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.listId === listId
            ? {
                ...list,
                tasks: list.tasks.map((taskObj) =>
                  taskObj.taskId === id
                    ? { ...taskObj, task: textContent }
                    : taskObj
                ),
              }
            : list
        )
      );
      e.target.blur();
    }
  }

  // search list bug
  function searchList(e) {
    const { value } = e.target;
    setSearchedList(value);

    // const filteredArray = lists.filter(
    //   (list) =>
    //     list.listName.toLowerCase().includes(searchedList.toLowerCase()) ||
    //     list.tasks.some((task) =>
    //       task.task.toLowerCase().includes(searchedList.toLowerCase())
    //     )
    // );
    // console.log(filteredArray);
    // setSearchResults(filteredArray);
  }

  console.log(lists);

  const listComponents = (searchedList.length > 0 ? searchResults : lists).map(
    (li) => (
      <List
        key={li.listId}
        list={li}
        //   setLists={setLists}
        //   setName={setListName}
        handleListChanges={handleListChanges}
        addTask={addNewTask}
        deleteList={deleteList}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        //   editTask={editTask}
        // taskValue={taskValue}
        // setTaskValue={setTaskValue}
        editTask={editTask}
      />
    )
  );

  // const SearchedListComponents = searchResults.map((li) => (
  //   <List
  //     key={li.listId}
  //     list={li}
  //     //   setLists={setLists}
  //     //   setName={setListName}
  //     handleListChanges={handleListChanges}
  //     addTask={addNewTask}
  //     deleteList={deleteList}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //     //   editTask={editTask}
  //     // taskValue={taskValue}
  //     // setTaskValue={setTaskValue}
  //     editTask={editTask}
  //   />
  // ));

  return (
    <main>
      <div className="welcome-card">
        <h2 className="greet-user">Hello , Suriya!</h2>
        <input
          type="text"
          name="searchedList"
          className="search-list"
          onChange={searchList}
          value={searchedList}
          placeholder="Search Lists/Tasks"
        />
        <div>
          <p className="date">
            {dayMap.get(day).slice(0, 3)} , {monthNames[month - 1].slice(0, 3)}{" "}
            {year}
          </p>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="temperature"
          >
            <img src={tempLogo} />

            <p>11C</p>
          </div> */}
        </div>
      </div>
      <button onClick={addNewList} className="btn add-list-btn">
        + Add new List
      </button>
      {/* {searchResults.length > 0 ? SearchedListComponents : listComponents} */}
      <ul className="list-container" onDragOver={(e) => e.target}>
        {listComponents}
      </ul>
    </main>
  );
}
