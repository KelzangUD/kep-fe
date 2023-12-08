import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../components/admin/User";
import AddQuestions from "../../components/admin/AddQuestions";
import ScheduleTest from "../../components/admin/ScheduleTest";

const Master = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/schedule-test" element={<ScheduleTest />} />
      </Routes>
    </>
  );
};

export default Master;
