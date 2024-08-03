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
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Task = {
  taskId: number;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

type TaskRender = {
  taskId: number;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: string;
  status: string;
};

function createTask(
  taskId: number,
  taskName: string,
  meekPoints: number,
  owner: string,
  dateCreated: string,
  status: string
): TaskRender {
  return {
    taskId,
    taskName,
    meekPoints,
    owner,
    dateCreated,
    status,
  };
}

const rows = [
  createTask(1, "Gym", 2, "Kenneth", new Date().toDateString(), "uncompleted"),
  createTask(
    2,
    "Test2",
    2,
    "Kenneth",
    new Date().toDateString(),
    "uncompleted"
  ),
  createTask(3, "Gym2", 2, "Kenneth", new Date().toDateString(), "uncompleted"),
  createTask(4, "Gym", 2, "Kenneth", new Date().toDateString(), "uncompleted"),
  createTask(5, "Gym", 2, "Kenneth", new Date().toDateString(), "uncompleted"),
];

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-x-auto">
        <TableContainer component={Paper}>
          <Table>
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
              {rows.map((row) => (
                <TableRow key={row.taskId}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.taskName}
                  </TableCell>
                  <TableCell align="right">{row.meekPoints}</TableCell>
                  <TableCell align="right">{row.dateCreated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="hidden md:flex md:flex-col md:items-end md:absolute md:top-0 md:right-0 md:h-screen md:w-80 bg-slate-100 ">
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
