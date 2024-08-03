"use client"; // This is a client component

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/table";
import HistoryComponent from "./components/history";
import Modal from "react-bootstrap/Modal";

export type Task = {
  taskId: number;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

export const dynamic = "force-dynamic";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showComplete, setShowComplete] = useState<boolean>(false);

  const handleClose = () => setShowComplete(false);
  const handleShow = () => setShowComplete(true);

  useEffect(() => {
    axios.get("/api/task").then((res) => {
      const totalTask = res.data;
      console.log(totalTask);
      setTasks(totalTask);
    });
  }, []);

  return (
    <main className="flex h-screen w-screen">
      <div className="w-full md:w-4/5 bg-white shadow-md rounded-lg h-screen">
        <div className="h-2/3 overflow-x-auto overflow-y-auto">
          <TableComponent tasks={tasks} />
        </div>
        <div className="bg-slate-300 flex h-1/3 justify-center items-center">
          <div>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button onClick={() => setShowComplete(true)}>
                Complete Task
              </Button>
              <Button>Add Task</Button>
              <Button>Load Stats</Button>
              <Button>Visit partner</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <Modal
        show={showComplete}
        onHide={() => setShowComplete(false)}
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
          <Button color="error" variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Yes i have completed!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="hidden md:w-1/5 md:bg-slate-100 md:flex md:flex-col md:p-4">
        {/* <List className="w-full flex-grow overflow-auto">
          <ListItem className="w-full">
            <Card className="w-full">
              <CardContent>
                <Typography variant="body2">Completed Gym</Typography>
                <Typography variant="body2">Kenneth</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  2 days ago
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
          <ListItem>
            <Card className="w-full">
              <CardContent>
                <Typography variant="body2">Completed Gym</Typography>
                <Typography variant="body2">Kenneth</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  2 days ago
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
          <ListItem>
            <Card className="w-full">
              <CardContent>
                <Typography variant="body2">Completed Gym</Typography>
                <Typography variant="body2">Kenneth</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  2 days ago
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        </List> */}
        <HistoryComponent />
      </div>
    </main>
  );
}
