import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function SelectFilter({
  title,
  values,
  currentValue,
  onSelect,
}) {
  return (
    <Grid item lg={1} md={2} xs={12}>
      <FormControl size="small" fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select
          value={currentValue}
          label={title}
          onChange={(e) => onSelect(e.target.value)}
        >
          {values.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
