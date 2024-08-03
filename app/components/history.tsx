import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function HistoryComponent() {
  return (
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
  );
}
