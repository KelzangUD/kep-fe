import React from "react";
import { Routes, Route } from "react-router-dom";
import AddQuestions from "../../component/admin/admin_activity/AddQuestions";
import ScheduleTests from "../../component/admin/admin_activity/ScheduleTests";

const Activity = () => {
  return (
    <>
      <Routes>
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/schedule-tests" element={<ScheduleTests />} />
      </Routes>
    </>
  );
};

export default Activity;
