const mapNewsApi = (article) => ({
  source: article.source.name,
  category: "Unknown Category",
  author: article.author,
  title: article.title,
  description: article.description,
  url: article.url,
  urlToImage: article.urlToImage,
  publishedAt: article.publishedAt,
});

const mapGuardianApi = (article) => ({
  source: article.sectionName,
  category: article.type,
  author: "Unknown Author",
  title: article.webTitle,
  description: article.fields.trailText,
  url: article.webUrl,
  urlToImage: article.fields.thumbnail,
  publishedAt: article.webPublicationDate,
});

const mapNewYorkTimesApi = (article) => ({
  source: article.source,
  category: article.document_type,
  author:
    article.byline &&
    article.byline.original &&
    article.byline.original.length >= 3
      ? article.byline.original.slice(3)
      : "Unknown Author",
  title: article.headline.main,
  description: article.abstract,
  url: article.web_url,
  urlToImage: null,
  publishedAt: article.pub_date,
});

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok. URL: ${url}`);
  }
  return response.json();
};

export const getNews = async (searchQuery) => {
  const apiKeyNewsApi = "e66818f59f004143aaefdd815846bdcb";
  const apiKeyGuardianApi = "76a636a7-da6a-4c72-9d07-e6c8770b6eb7";
  const apiKeyNewYorkTimesApi = "Gt3aOXJ4rXKpwehH4wIfJL8OU48UCqKH";
  const keyword = searchQuery ? searchQuery : undefined;
  var urlNewsApi = undefined;
  var urlGuardianApi = undefined;
  var urlNewYorkTimesApi = undefined;
  if (keyword) {
    urlNewsApi = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKeyNewsApi}`;
    urlGuardianApi = `https://content.guardianapis.com/search?q=${searchQuery}&api-key=${apiKeyGuardianApi}&show-references=author&show-fields=trailText,thumbnail`;
    urlNewYorkTimesApi = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${apiKeyNewYorkTimesApi}`;
  } else {
    urlNewsApi = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyNewsApi}`;
    urlGuardianApi = `https://content.guardianapis.com/search?api-key=${apiKeyGuardianApi}&show-references=author&show-fields=trailText,thumbnail`;
    urlNewYorkTimesApi = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKeyNewYorkTimesApi}`;
  }

  try {
    const [dataNewsApi, dataGuardianApi, dataNewYorkTimesApi] =
      await Promise.all([
        fetchData(urlNewsApi),
        fetchData(urlGuardianApi),
        fetchData(urlNewYorkTimesApi),
      ]);

    const filteredNewsApiData = dataNewsApi.articles.map(mapNewsApi);
    const filteredGuardianApiData =
      dataGuardianApi.response.results.map(mapGuardianApi);
    const filteredNewYorkTimesApiData =
      dataNewYorkTimesApi.response.docs.map(mapNewYorkTimesApi);

    return filteredGuardianApiData.concat(
      filteredNewsApiData.concat(filteredNewYorkTimesApiData)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
