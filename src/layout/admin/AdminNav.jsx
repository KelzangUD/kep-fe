import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import Notification from "../../ui/Notification";
import SideNav from "./SideNav";
import UserSideNav from "../user/UserSideNav";
import Route from "../../routes/Route";
import { useNavigate } from "react-router-dom";
import { useCommon } from "../../contexts/CommonContext";

const AdminNav = () => {
  const { sideMenuOpen, setSideMenuOpen } = useCommon();
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const profileHandle = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user?.isAdmin ? navigation("/admin/profile") : navigation("/user/profile");
  };
  const token = localStorage.getItem("token");
  const logoutHandle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      empId: user?.empId,
    };
    const res = await Route("POST", "/logout", token, data, null);
    if (res?.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigation("/sign-in");
    } else {
      setMessage(res?.response?.data?.message);
      setOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#fff", color: "#393E46" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between", md: "flex-end" },
            }}
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={() => setSideMenuOpen(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                size="large"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          id="menu"
          keepMounted
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{
            width: 440,
            marginTop: 4,
          }}
        >
          <MenuItem onClick={profileHandle}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={logoutHandle}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
      <Drawer
        open={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        anchor="left"
      >
        <div style={{ width: 300, height: "100%" }}>
          {user?.isAdmin ? <SideNav /> : <UserSideNav />}
        </div>
      </Drawer>
    </>
  );
};

export default AdminNav;
