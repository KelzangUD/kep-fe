import React from "react";
import { Routes, Route } from "react-router-dom";
import UserYearReport from "../../component/user/user_report/UserYearReport";

const UserReport = () => {
  return (
    <>
      <Routes>
        <Route path="/user-report" element={<UserYearReport />} />
      </Routes>
    </>
  );
};

export default UserReport;
