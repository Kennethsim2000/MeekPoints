import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { Task } from "./table";

type PropType = {
  user: string;
  showComplete: boolean;
  setShowComplete: (complete: boolean) => void;
  selectedTask: string;
  setTasks: (tasks: Task[]) => void;
};
export default function ModalCompleteComponent(props: PropType) {
  /**
   * Function that marks the task as complete
   */
  const handleCompleteTask = async () => {
    const id = props.selectedTask;
    // const response = await axios.delete(`api/delete/post/${postId}`);
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
