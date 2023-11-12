import { useState, useEffect } from "react";
import { getNews } from "../services/NewsAPI";

export default function useNewsData(keyword) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      var apiData = null;
      try {
        if (keyword !== undefined) {
          if (keyword === "") {
            setLoading(false);
            setNews([]);
          } else {
            setLoading(true);
            apiData = await getNews(keyword);
            setNews(apiData);
          }
        } else {
          apiData = await getNews();
          setNews(apiData);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        console.log("hello");
        setApiError(true);
        // Handle errors or implement a retry mechanism
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  return { news, loading, apiError };
}
