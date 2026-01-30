import React, { useState } from "react";
import {
  Paper,
  Grid,
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
import SettingsIcon from "@mui/icons-material/Settings";
import DnsIcon from "@mui/icons-material/Dns";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useCommon } from "../../contexts/CommonContext";

export default function SideNav() {
  const navigation = useNavigate();
  const { setSideMenuOpen } = useCommon();
  const handleNestedItemClick = (index) => {
    setOpenStates((prevOpenStates) => {
      const isAlreadyOpen = prevOpenStates[index];
      const newOpenStates = prevOpenStates.map(() => false);
      newOpenStates[index] = !isAlreadyOpen;
      return newOpenStates;
    });
  };
  const routeHandle = (route) => {
    navigation(route);
    setSideMenuOpen(false);
  };
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      onClick: () => routeHandle("dashboard"),
    },
    {
      label: "System Setting",
      icon: <SettingsIcon fontSize="small" />,
      onClick: () => handleNestedItemClick(1),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Master",
      icon: <DnsIcon fontSize="small" />,
      onClick: () => handleNestedItemClick(2),
      nestedItems: [
        {
          label: "Grades",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/grades"),
        },
        {
          label: "Department/Unit",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/departments_or_unit"),
        },
        {
          label: "Designations",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/designations"),
        },
        {
          label: "Regions",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/regions"),
        },
        {
          label: "Extensions",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/extensions"),
        },
        {
          label: "Videos",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/videos"),
        },
        {
          label: "Audios",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("master/audios"),
        },
      ],
    },
    {
      label: "Activity",
      icon: <AssignmentIcon fontSize="small" />,
      onClick: () => handleNestedItemClick(3),
      nestedItems: [
        {
          label: "Add Questions",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/add-questions"),
        },
        {
          label: "Schedule Tests",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/schedule-tests"),
        },
        {
          label: "Re-Schedule Tests",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/reschedule-tests"),
        },
        {
          label: "Questions Used",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("activity/questions-used"),
        },
      ],
    },
    {
      label: "Feedbacks",
      icon: <FeedbackIcon fontSize="small" />,
      onClick: () => routeHandle("feedbacks"),
    },
    {
      label: "Report",
      icon: <AssessmentIcon />,
      onClick: () => handleNestedItemClick(5),
      nestedItems: [
        {
          label: "Current Month",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("report/current-month"),
        },
        {
          label: "Six Months",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("report/six-months"),
        },
        {
          label: "One Year",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("report/one-year"),
        },
        {
          label: "Answers",
          icon: <KeyboardArrowRightIcon fontSize="small" />,
          onClick: () => routeHandle("report/answers"),
        },
      ],
    },
  ];
  const [openStates, setOpenStates] = useState(menuItems.map(() => false));
  return (
    <Paper
      sx={{
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
              style={{
                width: "30%",
                height: "auto",
              }}
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
            ADMIN
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
