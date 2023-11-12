import { Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import styles from "./NewsPagination.module.css";

export default function NewsPagination({ news, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(news.length / itemsPerPage);

  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {news.length !== 0 ? (
        <div className={styles.container}>
          <Grid container spacing={2}>
            {currentItems.map((singleNews) => (
              <Grid item xs={12} md={6} lg={3} key={singleNews.url}>
                <NewsCard singleNews={singleNews} />
              </Grid>
            ))}
          </Grid>

          <div className={styles.controls}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handleChange}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
