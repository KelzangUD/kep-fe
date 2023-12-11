import React from "react";
import { Routes, Route } from "react-router-dom";
import Regions from "../../component/admin/admin_master/Regions";
import Extensions from "../../component/admin/admin_master/Extensions";
import Videos from "../../component/admin/admin_master/Videos";
import Audios from "../../component/admin/admin_master/Audios";

const Master = () => {
  return (
    <>
      <Routes>
        <Route path="/regions" element={<Regions />} />
        <Route path="/extensions" element={<Extensions />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/audios" element={<Audios />} />
      </Routes>
    </>
  );
};

export default Master;
