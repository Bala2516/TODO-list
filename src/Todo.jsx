import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

export function Todo({ setAllTaskDetails, inputTask, setInputTask }) {
  const [show, setShow] = useState(false);

  const taskData = JSON.parse(localStorage.getItem("TaskName"));
  const currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");

  useEffect(() => {
    const getApi = async () => {
      const response = JSON.parse(localStorage.getItem("TaskName"));
      setAllTaskDetails(response || []);
    };
    getApi();
  }, []);

  const handleSubmit = () => {
    if (inputTask.TaskName && inputTask.Description) {
      const postData = async () => {
        try {
          const existingTasks = taskData || [];
          const updatedTasks = [...existingTasks, inputTask];
          localStorage.setItem("TaskName", JSON.stringify(updatedTasks));

          setAllTaskDetails(updatedTasks);
          console.log("Task added successfully");
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      setInputTask({
        id: "",
        TaskName: "",
        Description: "",
        Status: "Todo",
        Created_at: "",
      });
      setShow(false);
    } else {
      alert("fields required");
      setShow(true);
    }
  };

  return (
    <>
      <div className="todo-header">
        <div className="todo-header-design">
          TODO LIST
        </div>{" "}
        <div
          className="todo-badge"
        >
          Do it now
        </div>
      </div>
      <Button
        onClick={() => setShow(true)}
        className="add-task-button"
        style={{
          display: "flex",
          border: "0px",
          backgroundColor: "#66cb9c",
          color: "white",
          padding: "4px 8px",
          borderRadius: "6px",
          margin: "4px",
        }}
      >
        Add Task
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="field">Task Name</label>
          <br></br>
          <input
            className="input"
            value={inputTask.TaskName}
            onChange={(e) =>
              setInputTask({ ...inputTask, TaskName: e.target.value })
            }
            type="text"
          ></input>

          <label className="field">Description</label>
          <br></br>
          <textarea
            className="input"
            value={inputTask.Description}
            onChange={(e) =>
              setInputTask({
                ...inputTask,
                Description: e.target.value,
                id: taskData ? taskData.length + 1 : 1,
                Created_at: currentTime,
              })
            }
            style={{ height: "200px" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary opacity-75"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
