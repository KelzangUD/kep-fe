import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Logout from "@mui/icons-material/Logout";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigation = useNavigate();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const isNotificationOpen = Boolean(openNotification);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNotificationOpen = (event) => {
    setOpenNotification(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setOpenNotification(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const profileHandle = () => {
    navigation("/admin/profile");
  };
  const token = localStorage.getItem("token")
  const logoutHandle = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const data = {
      empId: user?.empId
    }
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

  const menuId = "primary-search-account-menu";
  const notificationId = "primary-search-notification-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      id={menuId}
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
  );

  const renderNotification = (
    <Menu
      anchorEl={openNotification}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      id={notificationId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
      sx={{
        width: 440,
        marginTop: 4,
      }}
    >
      <MenuItem>
        <ListItemIcon>
          <MarkChatUnreadIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          A very long text that overflows
        </Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <MarkChatUnreadIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          A very long text that overflows
        </Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <MarkChatUnreadIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          A very long text that overflows
        </Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <MarkChatUnreadIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          A very long text that overflows
        </Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotificationOpen}>
        <IconButton
          size="large"
          aria-label="show new notifications"
          aria-controls="primary-search-notification-menu"
          color="inherit"
        >
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#fff", color: "#393E46" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                aria-controls="primary-search-notification-menu"
                onClick={handleNotificationOpen}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderNotification}
      </Box>
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
    </>
  );
};

export default AdminNav;
