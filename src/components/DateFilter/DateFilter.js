import { Grid, TextField } from "@mui/material";
import React from "react";

export default function DateFilter({ actualValue, onDateSelect }) {
  return (
    <Grid item lg={1} md={2} xs={12}>
      <TextField
        label="From Date"
        type="date"
        value={actualValue}
        onChange={(e) => onDateSelect(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        size="small"
      />
    </Grid>
  );
}
