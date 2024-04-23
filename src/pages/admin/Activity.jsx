import React from "react";
import { Routes, Route } from "react-router-dom";
import AddQuestions from "../../component/admin/admin_activity/AddQuestions";
import ScheduleTests from "../../component/admin/admin_activity/ScheduleTests";
import QuestionsUsed from "../../component/admin/admin_activity/QuestionsUsed";

const Activity = () => {
  return (
    <>
      <Routes>
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/schedule-tests" element={<ScheduleTests />} />
        <Route path="/questions-used" element={<QuestionsUsed />} />
      </Routes>
    </>
  );
};

export default Activity;
