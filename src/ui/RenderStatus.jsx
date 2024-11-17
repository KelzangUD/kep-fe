import React, { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  alignItems: "center",
  "& .icon": {
    color: "inherit",
  },
  "&.Active": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.Yes": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.No": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
  "&.Inactive": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
}));

const Status = memo((props) => {
  const { status } = props;

  let icon = null;
  if (status === "Inactive") {
    icon = <CloseIcon className="icon" />;
  } else if (status === "Active") {
    icon = <DoneIcon className="icon" />;
  } else if (status === "Yes") {
    icon = <CheckCircleIcon className="icon" />;
  } else if (status === "No") {
    icon = <CancelIcon className="icon" />;
  }

  let label = status;
  if (status === "།Inactive") {
    label = "In-Active";
  }

  return (
    <StyledChip
      className={status === "Not Shipped" ? "NotShipped" : status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});
const RenderStatus = (params) => {
  //   React.useEffect(() => {
  //     console.log(params);
  //   });
  if (params?.status == null) {
    return "";
  }
  return <Status status={params?.status} />;
};
export default RenderStatus;
