import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getNewsData } from '../../services/newsService';

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        setStatus('loading');
        const data = await getNewsData({ signal: controller.signal });
        setArticles(data);
        setActiveIndex(0);
        setStatus('success');
      } catch (error) {
        if (axios.isCancel(error) || error.name === 'CanceledError') return;
        setStatus('error');
      }
    };

    fetchNews();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (articles.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % articles.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [articles.length]);

  const activeArticle = articles[activeIndex];

  const publishedAt = useMemo(() => {
    if (!activeArticle?.publishedAt) return '';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(activeArticle.publishedAt));
  }, [activeArticle?.publishedAt]);

  const title = status === 'loading'
    ? 'Loading latest headlines...'
    : status === 'error'
      ? 'News unavailable'
      : activeArticle.title;

  const description = status === 'loading'
    ? 'Fetching the latest stories for you.'
    : status === 'error'
      ? 'Unable to load headlines right now. Please check your API key or network connection.'
      : activeArticle.description;

  return (
    <article className="flex min-h-[440px] flex-1 flex-col overflow-hidden rounded-app bg-white text-[#111111] shadow-panel">
      <div className="relative h-[220px] bg-black">
        {(activeArticle?.image || status !== 'success') && (
          <img
            src={activeArticle?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=720&q=80'}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
          <h3 className="text-base font-bold leading-tight text-white">{title}</h3>
          <p className="mt-1 text-[10px] text-white/85">{publishedAt || 'Latest headlines'}</p>
        </div>
      </div>

      <div className="app-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
        <p className="text-[11px] font-medium leading-relaxed text-[#272727]">
          {description}
        </p>
      </div>
    </article>
  );
};

export default NewsCard;
