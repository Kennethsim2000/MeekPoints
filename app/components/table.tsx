import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
// import Task from "../page";

export type Task = {
  taskId: number;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

type PropType = {
  tasks: Task[];
};
export default function TableComponent(props: PropType) {
  return (
    <TableContainer component={Paper} className="h-full">
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
          {props.tasks.map((task: Task) => (
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
    </TableContainer>
  );
}
