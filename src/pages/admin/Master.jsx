import React from "react";
import { Routes, Route } from "react-router-dom";
import Regions from "../../component/admin/admin_master/Regions";
import Extensions from "../../component/admin/admin_master/Extensions";

const Master = () => {
  return (
    <>
      <Routes>
        <Route path="/regions" element={<Regions />} />
        <Route path="/extensions" element={<Extensions />} />
      </Routes>
    </>
  );
};

export default Master;
