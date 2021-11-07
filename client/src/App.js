import { Header } from "./component/Header";
import Content from "./component/Content";
import "./assets/index.css";
import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import Pagination from "./component/Pagination";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(null);
  const [sortStatus, setSortStatus] = useState("all");
  const [sortTime, setSortTime] = useState("dateUp");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const [theme, setTheme] = useState({
    isLightTheme: true,
    light: {
      background: 'rgb(240,240,240)',
      color: 'black',
    },
    dark: {
      background: 'rgb(39,39,39)',
      color: 'white',
    }
  })

  const handleTheme = () => {
    setTheme({ ...theme, isLightTheme: !theme.isLightTheme })
  }
  const api = "http://localhost:6969";


  const indexOfLastTodo = currentPage * perPage;
  const indexOfFirstTodo = indexOfLastTodo - perPage;
  const currentTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const getTodos = () => {
    fetch(api + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error", err));
  };

  const getTodoByStatus = (status) => {
    fetch(api + `/todo/${status}`)
      .then(res => res.json())
      .then(data => setTodos(data))
  }

  useEffect(() => {
    getTodos();
  }, []);
  const { search } = useLocation()
  const { page, filter, sortBy } = queryString.parse(search);

  useEffect(() => {
    getTodoByStatus(filter)
  }, [filter])

  useEffect(() => {
    setCurrentPage(page ? page : 1)
    setSortStatus(filter)
    setSortTime(sortBy ? sortBy : "dateUp")
  }, [page, filter, sortBy])

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
    if (todo.trim() !== "") {
      setTodos((prev) => [data, ...prev]);
    } else {
      alert("Error");
    }

    setDate("")
    setCurrentPage(1)
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
      const newDate = value.format('MM/DD/YYYY');
      setDate(newDate);
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
    // const data1 = await fetch(api + '/todo/dateUp').then(res => res.json());
    // const data2 = await fetch(api + '/todo/dateDown').then(res => res.json());
    switch (time) {
      case "dateDown":
        // newTodos = data2
        // break;
        return todos.sort(
          (a, b) => new Date(b.due_date) - new Date(a.due_date)
        );

      case "dateUp":
        return todos.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
      // newTodos = data1
      // break;
      default:
        return;
    }
    // setTodos(newTodos);
  };

  const style = theme.isLightTheme ? { ...theme.light } : { ...theme.dark }

  return (
    <div className="App container m-5 p-2 rounded mx-auto shadow " style={style}>
      <Header
        handleAdd={handleAdd}
        todos={todos}
        handleChageDate={handleChageDate}
        date={date}
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
        handleTheme={handleTheme}
        theme={theme}
      />
      <Pagination
        totalTodo={todos.length}
        perPage={perPage}
        paginate={paginate}
        currentPage={currentPage}
        status={sortStatus}
        sortTime={sortTime}
      />
    </div>
  );
}
