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
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useCommon } from "../../contexts/CommonContext";

export default function UserSideNav() {
  const { setSideMenuOpen } = useCommon();
  const navigation = useNavigate();
  const routeHandle = (route) => {
    navigation(route);
    setSideMenuOpen(false);
  };
  const handleNestedItemClick = (index) => {
    setOpenStates((prevOpenStates) => {
      const isAlreadyOpen = prevOpenStates[index];
      const newOpenStates = prevOpenStates.map(() => false);
      newOpenStates[index] = !isAlreadyOpen;
      return newOpenStates;
    });
  };
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      onClick: () => routeHandle("dashboard"),
    },
    {
      label: "Activity",
      icon: <AssignmentIcon fontSize="small" />,
      onClick: () => handleNestedItemClick(1),
      nestedItems: [
        {
          label: "Test",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/test"),
        },
        {
          label: "Re-Test",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/retest"),
        },
      ],
    },
    {
      label: "Report",
      icon: <AssessmentIcon fontSize="small" />,
      onClick: () => handleNestedItemClick(2),
      nestedItems: [
        {
          label: "User Report",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("report/user-report"),
        },
      ],
    },
  ];
  const [openStates, setOpenStates] = React.useState(
    menuItems.map(() => false)
  );
  return (
    <Paper
      style={{
        minHeight: "100%",
        borderRadius: 0,
        backgroundColor: "#F5F7F8",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Button variant="text" size="small" align="center" fullWidth>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "30%", height: "auto" }}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Knowledge Enhancement Plateform
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "#3081D0", my: 1 }}
          >
            USER
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List component="nav" aria-labelledby="nested-list-subheader">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <Typography variant="body2">{item.label}</Typography>
              </ListItemText>
              {item.nestedItems &&
                (openStates[index] ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                ))}
            </ListItemButton>
            {item.nestedItems && (
              <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <ListItemButton
                      key={nestedIndex}
                      onClick={nestedItem.onClick}
                    >
                      <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                      <ListItemText sx={{ ml: -3 }}>
                        <Typography variant="body2">
                          {nestedItem.label}
                        </Typography>
                      </ListItemText>
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
