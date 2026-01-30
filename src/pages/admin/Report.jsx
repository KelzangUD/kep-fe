import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrentMonth from "../../component/admin/admin_report/CurrentMonth";
import SixMonths from "../../component/admin/admin_report/SixMonths";
import OneYear from "../../component/admin/admin_report/OneYear";
import Answers from "../../component/admin/admin_report/Answers";
const Master = () => {
  return (
    <>
      <Routes>
        <Route path="/current-month" element={<CurrentMonth />} />
        <Route path="/six-months" element={<SixMonths />} />
        <Route path="/one-year" element={<OneYear />} />
        <Route path="/answers" element={<Answers />} />
      </Routes>
    </>
  );
};

export default Master;
