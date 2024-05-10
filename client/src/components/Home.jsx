import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const getCardBorderColor = (task) => {
    return task.status === "completed" ? "border-success" : "border-danger";
  };

  const getPriorityEmojiAndColor = (priority) => {
    switch (priority) {
      case "high":
        return { color: "text-danger", emoji: "⚠️" };
      case "medium":
        return { color: "text-warning" };
      case "low":
        return { color: "text-primary" };
      default:
        return { emoji: "", color: "" };
    }
  };

  return (
    <Container className="my-4">
      <div className="row mb-3">
        <div className="col">
          <h1>{taskTitle}</h1>
        </div>
        <div className="col text-end">
          <Button variant="success" onClick={handleCreateModalShow}>Create Task</Button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col">
              <Card className={`mb-3 ${getCardBorderColor(task)}`} style={{ height: "100%" }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Stack gap={2}>
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task.title && task.title.length <= 40
                        ? task.title
                        : task.title.slice(0, 40) + "..."}
                    </Card.Title>
                    <Card.Text>
                      {task.description && task.description.length <= 300
                        ? task.description
                        : task.description.slice(0, 300) + "..."}
                    </Card.Text>
                    <Card.Text>
                      <strong>Due Date:</strong>{" "}
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Priority:</strong>{" "}
                      <span className={getPriorityEmojiAndColor(task.priority).color}>
                        {getPriorityEmojiAndColor(task.priority).emoji} {task.priority || "N/A"}
                      </span>
                    </Card.Text>
                    
                    
                  </Stack>
                  <Stack direction="horizontal" className="justify-content-end" gap={2}>
                    <MdEdit onClick={() => handleUpdateModalShow(task._id)} className="fs-3" />
                    <MdDelete onClick={() => deleteTask(task._id)} className="fs-3" />
                    <FaEye onClick={() => handleViewModalShow(task._id)} className="fs-3" />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DON'T HAVE ANY {taskTitle}</h1>
        )}
      </div>

      <CreateTaskModal handleCreateModalClose={handleCreateModalClose} showCreateModal={showCreateModal} setTasks={setTasks} />
      <UpdateTaskModal handleUpdateModalClose={handleUpdateModalClose} showUpdateModal={showUpdateModal} id={updatedTaskId} setTasks={setTasks} />
      <ViewTaskModal handleViewModalClose={handleViewModalClose} showViewModal={showViewModal} id={viewTaskId} />
    </Container>
  );
};

export default Home;
