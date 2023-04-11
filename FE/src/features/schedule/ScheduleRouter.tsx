import React from "react";
import { Route, Routes } from "react-router-dom";
import ScheduleCreatePage from "pages/ScheduleCreatePage";
import ScheduleEditPage from "pages/ScheduleEditPage";

const ScheduleRouter = () => {
  return (
    <>
      <Routes>
        <Route path="create" element={<ScheduleCreatePage />} />
        <Route path="edit" element={<ScheduleEditPage />} />
      </Routes>
    </>
  );
};

export default ScheduleRouter;
