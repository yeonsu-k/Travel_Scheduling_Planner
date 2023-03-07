import React from "react";
import { Grid } from "@mui/material";
import CreateInfo from "features/schedule/create/CreateInfo";
import CreateSearch from "features/schedule/create/CreateSearch";
import CreateMap from "features/schedule/create/CreateMap";

function ScheduleCreatePage() {
  return (
    <>
      <Grid container columns={6.5} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={1.11} ml={0.5}>
          <CreateInfo />
        </Grid>
        <Grid item xs={4.3}>
          <CreateMap />
        </Grid>
        <Grid item xs={1.07}>
          <CreateSearch />
        </Grid>
      </Grid>
    </>
  );
}

export default ScheduleCreatePage;
