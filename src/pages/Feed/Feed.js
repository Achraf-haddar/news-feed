import React, { useEffect, useState } from "react";
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";
import { getNews } from "../../services/api";
import Filter from "../../components/Filter/Filter";
import NewsPagination from "../../components/NewsPagination/NewsPagination";
import { CircularProgress } from "@mui/material";
import useNewsData from "../../hooks/useNewsData";
import styles from "./Feed.module.css";

const pages = ["feed", "search"];

export default function Feed({ toggleDarkMode, isDarkMode }) {
  const { news, loading, apiError } = useNewsData();
  const [categories, setCategories] = useState();
  const [sources, setSources] = useState();
  const [authors, setAuthors] = useState();
  const [filteredNews, setFilteredNews] = useState();

  useEffect(() => {
    setSources([...new Set(news.map((item) => item.source))]);
    setCategories([...new Set(news.map((item) => item.category))]);
    setAuthors([...new Set(news.map((item) => item.author))]);
  }, [news]);

  const handleFilterChange = (filters) => {
    const filtered = news.filter(
      (item) =>
        (!filters.category || item.category === filters.category) &&
        (!filters.source || item.source === filters.source) &&
        (!filters.author || item.author === filters.author)
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
      <div className={styles.loading}>
        {loading && (
          <CircularProgress color="primary" style={{ marginLeft: "10px" }} />
        )}
        {apiError === true && (
          <div>Error from the API. Please try again in few seconds.</div>
        )}
      </div>
      <div className={styles.filterDiv}>
        {news.length !== 0 ? (
          <Filter
            isFeed={true}
            categories={categories}
            sources={sources}
            authors={authors}
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        ) : null}
      </div>
      {news.length !== 0 ? (
        <div className={styles.newsPagination}>
          <NewsPagination
            news={filteredNews ? filteredNews : news}
            itemsPerPage={12}
          />
        </div>
      ) : null}
    </>
  );
}
