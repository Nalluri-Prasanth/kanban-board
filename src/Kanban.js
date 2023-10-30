import React, { useState, useEffect, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";
import DoubleDropdown from "./DoubleDropdown";
import TaskCard from "./TaskCard";

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "100%",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "20vw",
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#F5F7F8",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "grey",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
};

const Kanban = () => {
  const [tasks, setTaskStatus] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchApiData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTaskStatus(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task.id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
      setTaskStatus(newTasks);
    },
    [tasks]
  );

  return (
    <main>
      <header> Kanban Board </header>
      <DoubleDropdown></DoubleDropdown>

      <DndProvider backend={HTML5Backend}>
        <section style={classes.board}>
          {["Todo", "In progress", "Backlog"].map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              changeTaskStatus={changeTaskStatus}
            >
              <div style={classes.column}>
                <div style={classes.columnHead}>{status}</div>
                <div>
                  {tasks
                    .filter((item) => item.status === status)
                    .map((item) => (
                      <KanbanItem key={item.id} id={item.id}>
                        <div style={classes.item}>{item.title}</div>
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </section>
      </DndProvider>
    </main>
  );
};

export default Kanban;
