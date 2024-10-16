"use client";

import Box from "@mui/material/Box";
import DrawerComponent from "../../components/drawer";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const widthOfCard = isMdUp ? "600px" : "400px";

  const cardData = [
    {
      title: "View all questions",
      description:
        "This section allows you to view all questions available in the system.",
      user: "Kenenth",
    },
    {
      title: "MeekPoints",
      description:
        "Track and manage your points earned by completing tasks and activities.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
    {
      title: "Test yourself",
      description:
        "Test your knowledge with quizzes and challenges based on your learning.",
      user: "Kenenth",
    },
  ];

  const renderCard = (title: string, description: string, user: string) => (
    <div>
      <Card sx={{ width: widthOfCard, margin: 0 }} key={title}>
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {user}
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Question</Button>
        </CardActions>
      </Card>
      <Divider sx={{ borderBottomWidth: 2, backgroundColor: "#000" }} />
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center">
      {isMdUp && <DrawerComponent />}
      <div className="flex-col h-full overflow-y-auto">
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          overflow="auto"
          p={3}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth="600px"
            width="600px"
          >
            {cardData.map(({ title, description, user }) =>
              renderCard(title, description, user)
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}
