import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../component/admin/admin_system_setting/User";

const SystemSetting = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
};

export default SystemSetting;
