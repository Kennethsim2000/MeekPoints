"use client"; // This is a client component

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
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
        <div className="h-2/3 border border-solid border-gray-300 overflow-x-auto overflow-y-auto">
          {/* <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell>TaskName</TableCell>
                  <TableCell align="right">MeekPoints</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.taskId}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {task.taskName}
                    </TableCell>
                    <TableCell align="right">{task.meekPoints}</TableCell>
                    <TableCell align="right">
                      {new Date(task.dateCreated).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <TableComponent tasks={tasks} />
        </div>
        <div className="bg-slate-300 flex h-1/3 justify-center items-center">
          <div>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button>Complete Task</Button>
              <Button>Load Stats</Button>
              <Button>Visit partner</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="hidden md:w-1/5 md:bg-slate-100 md:flex md:flex-col md:p-4">
        <List className="w-full flex-grow overflow-auto">
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
        </List>
      </div>
    </main>
  );
}
