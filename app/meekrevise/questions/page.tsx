import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function Home() {
  const cardData = [
    {
      title: "View all questions",
      description:
        "This section allows you to view all questions available in the system.",
    },
    {
      title: "MeekPoints",
      description:
        "Track and manage your points earned by completing tasks and activities.",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
    },
  ];

  const renderCard = (title: string, description: string) => (
    <Card sx={{ width: "100%", margin: 0 }} key={title}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left">
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["View all questions", "MeekPoints", "Test yourself"].map(
              (text) => (
                <div key={text}>
                  <Link href="/" passHref style={{ textDecoration: "none" }}>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ paddingY: 3 }}>
                        <Typography
                          variant="body1"
                          sx={{ textDecoration: "none", color: "black" }}
                        >
                          {text}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider
                    sx={{ borderBottomWidth: 2, backgroundColor: "#000" }}
                  />
                </div>
              )
            )}
          </List>
        </Box>
      </Drawer>

      {/* Centered Box */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        bgcolor="white"
        sx={{ padding: "20px" }}
      >
        {/* Rendering the cards vertically without gaps */}
        <Box width="600px">
          {cardData.map(({ title, description }) =>
            renderCard(title, description)
          )}
        </Box>
      </Box>
    </Box>
  );
}
