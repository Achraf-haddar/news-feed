import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewsPagination from "../../components/NewsPagination/NewsPagination";
import Filter from "../../components/Filter/Filter";
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";
import { compareDates, formatTimestamp } from "../../utils/timestampProcessing";
import useNewsData from "../../hooks/useNewsData";
import styles from "./Search.module.css";

const pages = ["feed", "search"];

export default function Search({ toggleDarkMode, isDarkMode }) {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { news, loading, apiError } = useNewsData(searchKeyword);
  const [categories, setCategories] = useState();
  const [sources, setSources] = useState();
  const [filteredNews, setFilteredNews] = useState();

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async (e) => {
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    setSources([...new Set(news.map((item) => item.source))]);
    setCategories([...new Set(news.map((item) => item.category))]);
  }, [news]);

  const handleFilterChange = (filters) => {
    const filtered = news.filter(
      (item) =>
        (!filters.category || item.category === filters.category) &&
        (!filters.source || item.source === filters.source) &&
        (!filters.toDate ||
          compareDates(
            formatTimestamp(item.publishedAt),
            formatTimestamp(filters.fromDate)
          ) === 1 ||
          compareDates(
            formatTimestamp(item.publishedAt),
            formatTimestamp(filters.fromDate)
          ) === 0) &&
        (!filters.toDate ||
          compareDates(
            formatTimestamp(item.publishedAt),
            formatTimestamp(filters.toDate)
          ) === -1 ||
          compareDates(
            formatTimestamp(item.publishedAt),
            formatTimestamp(filters.toDate)
          ) === 0)
    );
    setFilteredNews(filtered);
  };

  const handleResetFilter = () => {
    setFilteredNews(news);
  };

  return (
    <>
      <HeaderMenu
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        pages={pages}
      />
      {/* <Grid
        container
        direction="row"
        justifyContent="center"
        className={styles.container}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          onChange={handleChange}
          className={styles.searchField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Search
        </Button>
      </Grid> */}
      <div style={{ marginTop: "10px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          className={styles.container}
        >
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              onChange={handleChange}
              className={styles.searchField}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              className={styles.searchButton}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>

      {loading && (
        <div className={styles.loading}>
          <CircularProgress color="primary" className={styles.loading} />
        </div>
      )}
      {!loading && apiError && (
        <div className={styles.error}>
          Error from the API. Please try again in few seconds.
        </div>
      )}

      <div className={styles.filterContainer}>
        {news.length !== 0 ? (
          <Filter
            isFeed={false}
            categories={categories}
            sources={sources}
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        ) : null}
      </div>
      {news.length !== 0 ? (
        <div className={styles.newsPagination}>
          <NewsPagination
            news={filteredNews ? filteredNews : news}
            itemsPerPage={8}
          />
        </div>
      ) : null}
    </>
  );
}
