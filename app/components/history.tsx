import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { TaskCompleted } from "../page";

type PropType = {
  completedTasks: TaskCompleted[];
};

export default function HistoryComponent(props: PropType) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.completedTasks.map((task: TaskCompleted) => (
        <div key={task._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={task.owner} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"completed " + task.taskName}
              secondary={
                <React.Fragment>
                  {" "}
                  {new Date(task.dateCreated).toDateString()}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
