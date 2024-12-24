import React, { createContext, useState, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <CommonContext.Provider value={{ sideMenuOpen, setSideMenuOpen, isMdUp }}>
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => useContext(CommonContext);
