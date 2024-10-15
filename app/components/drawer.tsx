import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function DrawerComponent() {
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["View all questions", "MeekPoints", "Test yourself"].map((text) => (
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
            <Divider sx={{ borderBottomWidth: 2, backgroundColor: "#000" }} />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        {list()}
      </Drawer>
    </div>
  );
}
