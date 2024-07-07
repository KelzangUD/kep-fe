import React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "../../component/user/user_activity/Test";
import ReTest from "../../component/user/user_activity/ReTest";

const UserActivity = () => {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/retest" element={<ReTest />} />
      </Routes>
    </>
  );
};

export default UserActivity;
