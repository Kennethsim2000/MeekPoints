import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";

type PropType = {
  showAddTask: boolean;
  setShowAddTask: (complete: boolean) => void;
};

export default function ModalAddTaskComponent(props: PropType) {
  const [taskName, setTaskName] = useState<string>("");
  const [meekPoints, setMeekPoints] = useState<number>(1);

  /**
   * Function that adds a task
   */
  const handleAddTask = () => {
    props.setShowAddTask(false);
    console.log(taskName + " " + meekPoints);
  };

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTaskName(inputValue);
  };

  const handleMeekPointsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target.value;
    setMeekPoints(Number(inputValue));
  };

  return (
    <main>
      <Modal
        show={props.showAddTask}
        onHide={() => props.setShowAddTask(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control onChange={handleTaskNameChange} autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Meek points</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleMeekPointsChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="error"
            variant="outlined"
            onClick={() => props.setShowAddTask(false)}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleAddTask}>
            Save task
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
