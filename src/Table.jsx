import React, { useContext, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Edit from "./asserts/Edit.png";
import Delete from "./asserts/Delete.png";
import { useNavigate } from "react-router-dom";
import { context } from "./App";

export function Table({
  // allTaskDetails,
  inputTask,
  setInputTask,
  // setAllTaskDetails,
}) {
  const navigate = useNavigate();
  const { allTaskDetails, setAllTaskDetails } = useContext(context);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const statusList = ["Todo", "In-Progress", "Completed"];

  const handleClose = () => {
    setShow(false);
    setInputTask({ TaskName: "", Description: "", Status: "Todo" });
  };

  const handleEdit = (index, id) => {
    const selectedDetails = allTaskDetails[index];
    setInputTask({
      TaskName: selectedDetails.TaskName,
      Description: selectedDetails.Description,
      Status: selectedDetails.Status,
    });
    setSelectedId(id);
    setShow(true);
  };

  const handleUpdate = () => {
    if (selectedId !== null) {
      if (
        inputTask.TaskName &&
        inputTask.Description &&
        inputTask.Status !== "Status"
      ) {
        const putApi = async () => {
          try {
            const taskData = JSON.parse(localStorage.getItem("TaskName")) || [];

            const updatedTasks = taskData.map((task) =>
              task.id === selectedId ? { ...task, ...inputTask } : task
            );

            localStorage.setItem("TaskName", JSON.stringify(updatedTasks));
            setAllTaskDetails(updatedTasks);
            setInputTask({ TaskName: "", Description: "", Status: "Todo" });
          } catch (error) {
            console.log(error);
          }
        };
        putApi();
        setSelectedId(null);
      } else {
        alert("Field can't be empty");
        setShow(true);
        setInputTask({
          ...inputTask,
        });
      }
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      const deleteApi = async () => {
        const taskData = JSON.parse(localStorage.getItem("TaskName")) || [];

        const updatedTasks = taskData.filter((task) => task.id !== deleteId);

        localStorage.setItem("TaskName", JSON.stringify(updatedTasks));
        setAllTaskDetails(updatedTasks);
        setInputTask({ TaskName: "", Description: "", Status: "Todo" });
      };
      deleteApi();
    }
  };

  return (
    <>
      <div className="table-box">
        <table
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Task Name</th>
              <th>Status</th>
              <th className="edit-column">Edit</th>
              <th className="delete-column">Delete</th>
            </tr>
          </thead>
          {allTaskDetails.map(({ id, TaskName, Status }, index) => (
            <tbody key={id}>
              <tr
                onClick={() =>
                  navigate(`/task/${id}`, {
                    state: { name: "bala", age: "21" },
                  })
                }
              >
                <td>{index + 1}</td>
                <td>{TaskName}</td>
                <td>
                  {Status === "Todo" ? (
                    <div className="badge bg-warning p-2">{Status}</div>
                  ) : Status === "In-Progress" ? (
                    <div className="badge bg-primary p-2">{Status}</div>
                  ) : (
                    <div className="badge bg-success p-2">{Status}</div>
                  )}
                </td>
                <td className="edit-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index, id);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0px",
                    }}
                  >
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={Edit}
                      alt=""
                    ></img>
                  </button>
                </td>
                <td className="delete-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(id);
                      setShowDelete(true);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0px",
                    }}
                  >
                    <img
                      style={{ width: "26px", height: "26px" }}
                      src={Delete}
                      alt=""
                    ></img>
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Modal show={show} onHide={handleClose} centered>
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
                setInputTask({
                  ...inputTask,
                  TaskName: e.target.value,
                })
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
                })
              }
              style={{ height: "200px" }}
            ></textarea>
            <label className="field">Status</label>
            <br></br>
            <select
              className="input"
              value={inputTask.Status}
              onChange={(e) =>
                setInputTask({
                  ...inputTask,
                  Status: e.target.value,
                })
              }
            >
              <option>Status</option>
              {statusList.map((s) => (
                <option value={s}>{s}</option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary opacity-75"
              onClick={() => {
                handleClose();
                handleUpdate();
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure ?</Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-success border-0"
              onClick={() => {
                handleDelete();
                setShowDelete(false);
              }}
            >
              Yes
            </Button>
            <Button
              className="bg-danger border-0"
              onClick={() => setShowDelete(false)}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
