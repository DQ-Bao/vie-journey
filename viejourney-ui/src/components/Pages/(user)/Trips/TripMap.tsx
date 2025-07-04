import { Box } from "@mui/material";
import React from "react";
import Map from "../../../Maps/Map";

const TripMap: React.FC = () => {
  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Map
        position="relative"
        defaultCenter={{ lat: 48.8566, lng: 2.3522 }} // Paris
        defaultZoom={13}
        containerStyle={{ width: "100%", height: "100%" }}
        detailed={true}
      />
    </Box>
  );
};

export default TripMap;
