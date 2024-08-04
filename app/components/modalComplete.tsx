import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";

type PropType = {
  showComplete: boolean;
  setShowComplete: (complete: boolean) => void;
};
export default function ModalCompleteComponent(props: PropType) {
  /**
   * Function that marks the task as complete
   */
  const handleCompleteTask = () => {
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
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you have completed the task?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="error"
          variant="outlined"
          onClick={() => props.setShowComplete(false)}
        >
          Close
        </Button>
        <Button variant="contained" onClick={handleCompleteTask}>
          Yes i have completed!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
