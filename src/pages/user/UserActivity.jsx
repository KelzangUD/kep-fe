import React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "../../component/user/user_activity/Test";

const UserActivity = () => {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default UserActivity;
