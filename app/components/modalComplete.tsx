import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { Task } from "./table";
import { TaskCompleted } from "../page";

type PropType = {
  user: string;
  showComplete: boolean;
  setShowComplete: (complete: boolean) => void;
  selectedTask: string;
  setTasks: (tasks: Task[]) => void;
  setCompletedTasks: (tasksCompleted: TaskCompleted[]) => void;
};

type TaskCompletedAdd = {
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
};

export default function ModalCompleteComponent(props: PropType) {
  /**
   * Function that marks the task as complete
   */
  const handleCompleteTask = async () => {
    const id = props.selectedTask;
    const res = await fetch(`/api/task?id=${id}`);
    const task: Task = await res.json();
    const taskCompleted: TaskCompletedAdd = {
      taskName: task.taskName,
      meekPoints: task.meekPoints,
      owner: task.owner,
      dateCreated: task.dateCreated,
    };

    //add task to completed tasks
    fetch("/api/completed", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskCompleted),
    })
      .then((response) => response.json())
      .then((data) => {
        const currUserCompletedTasks = data.filter(
          (task: TaskCompleted) => task.owner === props.user
        );
        props.setCompletedTasks(currUserCompletedTasks);
      })
      .catch((error) => {
        console.error(error);
      });

    //delete task from uncompleted tasks
    const response = await axios.delete(`/api/task?id=${id}`);
    const userTasks = response.data.filter(
      (task: Task) => task.owner === props.user
    );
    props.setTasks(userTasks);
    props.setShowComplete(false);
  };

  /**
   * Function that deletes a task
   */
  const handleDeleteTask = async () => {
    const id = props.selectedTask;
    const response = await axios.delete(`/api/task?id=${id}`);
    const userTasks = response.data.filter(
      (task: Task) => task.owner === props.user
    );
    props.setTasks(userTasks);
    props.setShowComplete(false);
  };

  return (
    <Modal
      show={props.showComplete}
      onHide={() => props.setShowComplete(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Hello Meek!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>What action would you like to perform?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-wrap justify-between gap-2">
          <Button
            color="error"
            variant="outlined"
            onClick={() => props.setShowComplete(false)}
            className="flex-grow sm:flex-grow-0"
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteTask}
            className="flex-grow sm:flex-grow-0"
          >
            Delete task
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCompleteTask}
            className="flex-grow sm:flex-grow-0"
          >
            Complete task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
