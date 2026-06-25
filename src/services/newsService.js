import axios from 'axios';

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const normalizeArticle = (article, index) => ({
  id: article.url || `${article.title}-${index}`,
  title: article.title || 'Latest headline',
  description: article.description || article.content || 'No summary is available for this story.',
  image: article.image || article.urlToImage || '',
  publishedAt: article.publishedAt || '',
});

export const getNewsData = async ({ signal } = {}) => {
  const usesGNews = Boolean(GNEWS_API_KEY);
  const usesNewsApi = Boolean(NEWS_API_KEY);

  if (!usesGNews && !usesNewsApi) {
    throw new Error('News API key is missing.');
  }

  const response = await axios.get(
    usesGNews ? 'https://gnews.io/api/v4/top-headlines' : 'https://newsapi.org/v2/top-headlines',
    {
      signal,
      params: usesGNews
        ? { token: GNEWS_API_KEY, lang: 'en', country: 'in', max: 10 }
        : { apiKey: NEWS_API_KEY, language: 'en', country: 'us', pageSize: 10 },
    },
  );

  const articles = response.data?.articles || [];

  if (!articles.length) {
    throw new Error('No news headlines found.');
  }

  return articles.map(normalizeArticle);
};
