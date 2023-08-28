import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import api from "./services/api";
import Grid from "@mui/material/Unstable_Grid2";
import SimpleMap from "./map/map";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const defauleValueBanner = {
  id: 0,
  createdAt: null,
  updatedAt: null,
  file_medium_banner_status: false,
  file_medium_banner: "",
  file_large_rectangle_status: false,
  file_large_rectangle: "",
  file_billboard_status: false,
  file_billboard: "",
};

const defauleValuePosition = {
  id: 0,
  name: "",
  lat: "",
  lng: "",
  status: false,
  createdAt: null,
  updatedAt: null,
};

const defauleValueMap = {
  id: 0,
  api_key: "",
  status: false,
  createdAt: null,
  updatedAt: null,
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dataBanner, setDataBanner] = React.useState(defauleValueBanner);
  const [dataPosition, setPosition] = React.useState([defauleValuePosition]);
  const [dataMapSetting, setDataMapSetting] = React.useState(defauleValueMap);
  console.log(dataMapSetting);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const fetchAPI = React.useCallback(async () => {
    await api.get("/api/banner").then((res) => setDataBanner(res.data));

    await api.get("/api/set_map").then((res) => setDataMapSetting(res.data));

    await api.get("/api/shop").then((res) => setPosition(res.data));
  }, []);

  React.useEffect(() => {
    fetchAPI();
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src="../assets/images/Feyverly-Logo.webp"
              width="151px"
              height="70px"
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "black" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid md={12} textAlign="center">
            <img
              style={{ borderRadius: "10px" }}
              src={`http://localhost:8000/images/${dataBanner.file_billboard}`}
            />
          </Grid>
          <Grid md={3} textAlign="center">
            <img
              style={{ borderRadius: "10px" }}
              src={`http://localhost:8000/images/${dataBanner.file_large_rectangle}`}
            />
          </Grid>
          <Grid md={9} textAlign="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
            quibusdam, aliquam dolore excepturi quae. Distinctio enim at
            eligendi perferendis in cum quibusdam sed quae, accusantium et
            aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus
            quia corrupti alias distinctio nostrum. Minima ex dolor modi
            inventore sapiente necessitatibus aliquam fuga et. Sed numquam
            quibusdam at officia sapiente porro maxime corrupti perspiciatis
            asperiores, exercitationem eius nostrum consequuntur iure aliquam
            itaque, assumenda et! Quibusdam temporibus beatae doloremque
            voluptatum doloribus soluta accusamus porro reprehenderit eos
            inventore facere, fugit, molestiae ab officiis illo voluptates
            recusandae. Vel dolor nobis eius, ratione atque soluta, aliquam
            fugit qui iste architecto perspiciatis. Nobis, voluptatem! Cumque,
            eligendi unde aliquid minus quis sit debitis obcaecati error,
            delectus quo eius exercitationem tempore. Delectus sapiente,
            provident corporis dolorum quibusdam aut beatae repellendus est
            labore quisquam praesentium repudiandae non vel laboriosam quo ab
            perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
            commodi nihil corrupti cum non fugiat praesentium doloremque
            architecto laborum aliquid. Quae, maxime recusandae? Eveniet dolore
            molestiae dicta blanditiis est expedita eius debitis cupiditate
            porro sed aspernatur quidem, repellat nihil quasi praesentium quia
            eos, quibusdam provident. Incidunt tempore vel placeat voluptate
            iure labore, repellendus beatae quia unde est aliquid dolor
            molestias libero. Reiciendis similique exercitationem consequatur,
            nobis placeat illo laudantium! Enim perferendis nulla soluta magni
            error, provident repellat similique cupiditate ipsam, et tempore
            cumque quod! Qui, iure suscipit tempora unde rerum autem saepe nisi
            vel cupiditate iusto. Illum, corrupti? Fugiat quidem accusantium
            nulla. Aliquid inventore commodi reprehenderit rerum reiciendis!
            Quidem alias repudiandae eaque eveniet cumque nihil aliquam in
            expedita, impedit quas ipsum nesciunt ipsa ullam consequuntur
            dignissimos numquam at nisi porro a, quaerat rem repellendus.
            Voluptates perspiciatis, in pariatur impedit, nam facilis libero
            dolorem dolores sunt inventore perferendis, aut sapiente modi
            nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Similique unde fugit veniam eius, perspiciatis sunt? Corporis qui
            ducimus quibusdam, aliquam dolore excepturi quae.
          </Grid>
          <Grid md={9} textAlign="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
            quibusdam, aliquam dolore excepturi quae. Distinctio enim at
            eligendi perferendis in cum quibusdam sed quae, accusantium et
            aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus
            quia corrupti alias distinctio nostrum. Minima ex dolor modi
            inventore sapiente necessitatibus aliquam fuga et. Sed numquam
            quibusdam at officia sapiente porro maxime corrupti perspiciatis
            asperiores, exercitationem eius nostrum consequuntur iure aliquam
            itaque, assumenda et! Quibusdam temporibus beatae doloremque
            voluptatum doloribus soluta accusamus porro reprehenderit eos
            inventore facere, fugit, molestiae ab officiis illo voluptates
            recusandae. Vel dolor nobis eius, ratione atque soluta, aliquam
            fugit qui iste architecto perspiciatis. Nobis, voluptatem! Cumque,
            eligendi unde aliquid minus quis sit debitis obcaecati error,
            delectus quo eius exercitationem tempore. Delectus sapiente,
            provident corporis dolorum quibusdam aut beatae repellendus est
            labore quisquam praesentium repudiandae non vel laboriosam quo ab
            perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
            commodi nihil corrupti cum non fugiat praesentium doloremque
            architecto laborum aliquid. Quae, maxime recusandae? Eveniet dolore
            molestiae dicta blanditiis est expedita eius debitis cupiditate
            porro sed aspernatur quidem, repellat nihil quasi praesentium quia
            eos, quibusdam provident.
          </Grid>
          <Grid md={3} textAlign="center">
            <img
              style={{ borderRadius: "10px" }}
              src={`http://localhost:8000/images/${dataBanner.file_medium_banner}`}
            />
          </Grid>
          <Grid md={12}>
            {dataMapSetting.api_key ? (
              <SimpleMap
                apiKey={dataMapSetting.api_key}
                positionMaker={dataPosition}
              />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
