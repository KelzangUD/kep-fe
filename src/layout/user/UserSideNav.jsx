import React from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Logo from "../../assets/images/logo.ico";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function UserSideNav() {
  const navigation = useNavigate();
  const containerStyle = {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    backgroundColor: "#F5F7F8",
  };
  const routeHandle = (route) => {
    navigation(route);
  };
  const handleNestedItemClick = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => routeHandle("dashboard"),
    },
    {
      label: "Activity",
      icon: <AssignmentIcon />,
      onClick: () => handleNestedItemClick(1),
      nestedItems: [
        {
          label: "Test",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("activity/test"),
        },
        {
          label: "Re-Test",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("activity/retest"),
        },
      ],
    },
    {
      label: "Report",
      icon: <AssessmentIcon />,
      onClick: () => handleNestedItemClick(2),
      nestedItems: [
        {
          label: "User Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("report/user-report"),
        },
        // {
        //   label: "Six Months",
        //   icon: <KeyboardArrowRightIcon />,
        //   onClick: () => routeHandle("report/six-months"),
        // },
        // {
        //   label: "One Year",
        //   icon: <KeyboardArrowRightIcon />,
        //   onClick: () => routeHandle("report/one-year"),
        // },
      ],
    },
  ];
  const [openStates, setOpenStates] = React.useState(
    menuItems.map(() => false)
  );

  return (
    <Paper style={containerStyle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} alignItems="center">
            <Button
              type="button"
              variant="text"
              color="primary"
              size="large"
              fullWidth
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "30%", height: "auto" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Knowledge Enhancement Plateform
            </Typography>
            <Typography variant="h6" align="center" sx={{ color: "#3081D0", my: 1 }}>
              USER
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.nestedItems &&
                (openStates[index] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.nestedItems && (
              <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <ListItemButton
                      key={nestedIndex}
                      sx={{ pl: 4 }}
                      onClick={nestedItem.onClick}
                    >
                      <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                      <ListItemText primary={nestedItem.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
