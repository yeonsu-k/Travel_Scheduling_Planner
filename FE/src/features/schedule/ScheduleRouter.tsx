import React from "react";
import { Route, Routes } from "react-router-dom";
import MapPage from "pages/MapPage";
import ScheduleEditPage from "pages/ScheduleEditPage";

const ScheduleRouter = () => {
  return (
    <>
      <Routes>
        <Route path="create" element={<MapPage />} />
        <Route path="edit" element={<ScheduleEditPage />} />
      </Routes>
    </>
  );
};

export default ScheduleRouter;
