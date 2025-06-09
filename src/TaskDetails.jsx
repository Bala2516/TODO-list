import React, { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";

function TaskDetails() {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const taskData = JSON.parse(localStorage.getItem("TaskName"));
        console.log("Task Data:", taskData);
        console.log("Task ID:", id);
        const selectedTask = taskData.filter((task) => {
          console.log("Task ID in filter:", task.id);
          return(
            task.id == id
          )
        });
        console.log("Selected Task:", selectedTask);
        setTaskDetails(selectedTask);
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [id]);

  console.log("Selected Task Details:", taskDetails);

  return (
    <>
      <div className="task-description">
        <div
          className="task-description-in"
        >
          <div
            style={{
              fontWeight: "600",
              fontSize: "30px",
              textAlign: "center",
              backgroundColor: "#5a7780",
              padding: "6px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Task Summary
          </div>
          {taskDetails.map(({ TaskName, Description, Status, Created_at }) => (
            <div style={{ padding: "20px" }}>
              <label className="field">Task Name :</label>
              <div>{TaskName}</div>
              <label className="field">Description :</label>
              <div>{Description}</div>
              <label className="field">Status :</label>
              <div>
                {Status === "Todo" ? (
                  <div style={{ color: "yellow" }}>{Status}</div>
                ) : Status === "In-Progress" ? (
                  <div style={{ color: "blue" }}>{Status}</div>
                ) : (
                  <div style={{ color: "green" }}>{Status}</div>
                )}
              </div>
              <label className="field">Created At :</label>
              <div>{Created_at}</div>
            </div>
          ))}
          <div style={{ textAlign: "end" }}>
            <button
              style={{
                backgroundColor: "#dc3545",
                margin: "0px 20px 20px 10px",
                border: "none",
                padding: "4px 6px",
                borderRadius: "4px",
              }}
            >
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Go Back
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
