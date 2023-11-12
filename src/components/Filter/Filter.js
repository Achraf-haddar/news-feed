import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import SelectFilter from "../SelectFilter/SelectFilter";
import DateFilter from "../DateFilter/DateFilter";
import styles from "./Filter.module.css";

export default function Filter({
  isFeed,
  authors,
  categories,
  sources,
  onFilterChange,
  onResetFilter,
}) {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilterChange = () => {
    const filters = {
      author,
      category,
      source,
      fromDate,
      toDate,
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setAuthor("");
    setCategory("");
    setSource("");
    setFromDate("");
    setToDate("");
    onResetFilter();
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {isFeed === true ? (
        <SelectFilter
          title="Author"
          values={authors}
          currentValue={author}
          onSelect={setAuthor}
        />
      ) : null}

      <SelectFilter
        title="Category"
        values={categories}
        currentValue={category}
        onSelect={setCategory}
      />
      <SelectFilter
        title="Source"
        values={sources}
        currentValue={source}
        onSelect={setSource}
      />

      {isFeed === false ? (
        <>
          <DateFilter actualValue={fromDate} onDateSelect={setFromDate} />
          <DateFilter actualValue={toDate} onDateSelect={setToDate} />
        </>
      ) : null}

      <Grid item lg={1} md={2} xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
          className={styles.filterButton}
        >
          FILTER
        </Button>
      </Grid>
      <Grid item lg={1} md={2} xs={3}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleReset}
          className={styles.filterButton}
        >
          RESET
        </Button>
      </Grid>
    </Grid>
  );
}
