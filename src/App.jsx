import React, { createContext, useState } from "react";
import "./App.css";
import { Table } from "./Table";
import { Todo } from "./Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskDetails from "./TaskDetails";

export const context = createContext();

function App() {
  const [inputTask, setInputTask] = useState({
    id: "",
    TaskName: "",
    Description: "",
    Status: "Todo",
    Created_at: "",
  });
  const [allTaskDetails, setAllTaskDetails] = useState([]);

  return (
    <>
      <context.Provider value={{ allTaskDetails, setAllTaskDetails }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="containers">
                  <div className="constainers-in">
                    <Todo
                      inputTask={inputTask}
                      setInputTask={setInputTask}
                      allTaskDetails={allTaskDetails}
                      setAllTaskDetails={setAllTaskDetails}
                    />
                    <Table
                      inputTask={inputTask}
                      setInputTask={setInputTask}
                    />
                  </div>
                </div>
              }
            />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
