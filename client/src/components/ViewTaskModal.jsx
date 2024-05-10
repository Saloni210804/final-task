import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const getSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTask(res.data.task);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <>
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <div>
              <p className="fw-bold mb-0">Title</p>
              <p style={{ overflowWrap: "break-word" }}>{task && task.title}</p>
            </div>
          </Stack>
          <Stack>
            <div>
              <p className="fw-bold mb-0">Description</p>
              <p style={{ overflowWrap: "break-word" }}>{task && task.description}</p>
            </div>
          </Stack>
          <Stack>
            <div>
              <p className="fw-bold mb-0">Due Date</p>
              <p>{task && task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
            </div>
          </Stack>
          <Stack>
            <div>
              <p className="fw-bold mb-0">Priority</p>
              <p>{task && task.priority ? task.priority : "N/A"}</p>
            </div>
          </Stack>
          <Stack>
            <div>
              <p className="fw-bold mb-0">Status</p>
              <p style={{ overflowWrap: "break-word" }}>{task && task.status}</p>
            </div>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
