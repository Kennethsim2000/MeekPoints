import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export type Task = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

type PropType = {
  tasks: Task[];
  showAddTask: boolean;
  setShowAddTask: (complete: boolean) => void;
  showComplete: boolean;
  setShowComplete: (complete: boolean) => void;
  setSelectedTask: (taskId: string) => void;
};
export default function TableComponent(props: PropType) {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      props.setShowComplete(true);
      props.setSelectedTask(id);
    }
  };

  return (
    <TableContainer component={Paper} className="h-full">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Button
                variant="outlined"
                sx={{ whiteSpace: "nowrap" }}
                onClick={() => props.setShowAddTask(true)}
              >
                Add Task
              </Button>
            </TableCell>
            <TableCell>TaskName</TableCell>
            <TableCell align="right">MeekPoints</TableCell>
            <TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map((task: Task) => (
            <TableRow key={task._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                  onChange={(e) =>
                    handleCheckboxChange(task._id, e.target.checked)
                  }
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
