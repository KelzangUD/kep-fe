import React from "react";
import { Routes, Route } from "react-router-dom";
import AddQuestions from "../../component/admin/admin_activity/AddQuestions";
import ScheduleTest from "../../component/admin/admin_activity/ScheduleTest";

const Activity = () => {
  return (
    <>
      <Routes>
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/schedule-test" element={<ScheduleTest />} />
      </Routes>
    </>
  );
};

export default Activity;
