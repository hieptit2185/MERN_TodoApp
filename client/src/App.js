import { Header } from "./component/Header";
import Content from "./component/Content";
import "./assets/index.css";
import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import Pagination from "./component/Pagination";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(null);
  const [sortStatus, setSortStatus] = useState("all");
  const [sortTime, setSortTime] = useState("added-date-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const api = "http://localhost:6969";

  const indexOfLastTodo = currentPage * perPage;
  const indexOfFirstTodo = indexOfLastTodo - perPage;
  const currentTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getData = () => {
    fetch(api + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error", err));
  };

  useEffect(() => {
    getData();
    const pageData = window.localStorage.getItem("currentPage");
    const todoData = window.localStorage.getItem("todos");
    setCurrentPage(JSON.parse(pageData));
    setTodos(JSON.parse(todoData));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("currentPage", JSON.stringify(currentPage));
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, currentPage]);

  const handleAdd = async (todo) => {
    const data = await fetch(api + "/todo/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: todo,
        due_date: date,
      }),
    }).then((res) => res.json());
    console.log(data);
    if (todo.trim() !== "") {
      setTodos((prev) => [data, ...prev]);
    } else {
      alert("Error");
    }
  };

  const handleRemove = async (id) => {
    const data = await fetch(api + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    const newTodo = todos.filter((item) => item._id !== data._id);
    setTodos(newTodo);
  };

  const handleChageDate = (value) => {
    if (value) {
      const dates = value.format("MM/DD/YYYY");
      setDate(dates);
    }
  };

  const handleEdit = async (id, value) => {
    const data = await fetch(api + "/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: value,
      }),
    }).then((res) => res.json());
    const newTodo = todos.map((item) => {
      if (item._id !== data._id) return item;

      return { ...item, content: value };
    });
    setTodos(newTodo);
  };

  const markCompleted = async (id) => {
    const data = await fetch(api + "/todo/status/" + id).then((res) =>
      res.json()
    );
    setTodos((prev) =>
      prev.map((item) =>
        item._id === data._id ? { ...item, status: !item.status } : item
      )
    );
  };

  const filterStatus = async (status) => {
    setSortStatus(status);
    let newTodos = todos;
    // const res = await fetch()
    const data = await fetch(api + `/todo/${status}`).then((res) => res.json());

    switch (status) {
      case "completed":
        newTodos = data;
        break;
      case "active":
        newTodos = data;
        break;
      case "all":
        newTodos = data;
        break;
      default:
        return;
    }
    setCurrentPage(1);
    setTodos(newTodos);
  };

  const filterDate = async (time) => {
    setSortTime(time);
    // let newTodos = todos;
    // const dateUp = await fetch(api + "/todo/dateUp").then((res) => res.json());
    // const dateDown = await fetch(api + "/todo/dateDown").then((res) =>
    //   res.json()
    // );
    switch (time) {
      case "due-date-desc":
        // newTodos = dateDown;
        // break;
        return todos.sort(
          (a, b) => new Date(b.due_date) - new Date(a.due_date)
        );
      case "added-date-asc":
        // newTodos = dateUp;
        // break;
        return todos.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
      default:
        return;
    }
  };

  return (
    <div className="App container m-5 p-2 rounded mx-auto bg-light shadow ">
      <Header
        handleAdd={handleAdd}
        todos={todos}
        handleChageDate={handleChageDate}
      />
      <Content
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        status={sortStatus}
        todos={currentTodo}
        markCompleted={markCompleted}
        sortTime={sortTime}
        onFilterDate={filterDate}
        onFilterStatus={filterStatus}
      />
      <Pagination
        totalTodo={todos.length}
        perPage={perPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
