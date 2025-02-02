import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function CustomCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          width: 300, // Adjust width
          height: 300, // Adjust height
          "& .MuiPickersDay-root": {
            width: 36, // Adjust day size
            height: 36, // Adjust day size
          },
        }}
      />
    </LocalizationProvider>
  );
}
