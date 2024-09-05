import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { TaskCompleted } from "../Kenneth/page";

type PropType = {
  completedTasks: TaskCompleted[];
};

const formatDate = (date: Date) => {
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - new Date(date).getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return new Date(date).toDateString();
  }
};

export default function HistoryComponent(props: PropType) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.completedTasks.map((task: TaskCompleted) => (
        <div key={task._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={task.owner}
                src={
                  task.owner === "Kenneth"
                    ? "/images/kenneth.jpg"
                    : "/images/Jamie.jpg"
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={"completed " + task.taskName}
              secondary={
                <React.Fragment>
                  {formatDate(new Date(task.dateCreated))}
                  <br />
                  {task.meekPoints + " points"}
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
