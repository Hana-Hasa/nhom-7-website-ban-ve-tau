'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { NewsArticle, NewsStatus, getAllNews } from '@/data/newsData';

interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NewsContextType {
    news: NewsArticle[];
    addNews: (article: Omit<NewsArticle, 'id'>) => void;
    updateNews: (id: number, article: Partial<NewsArticle>) => void;
    deleteNews: (id: number) => void;
    getNewsById: (id: number) => NewsArticle | undefined;
    searchNews: (keyword: string) => NewsArticle[];
    filterByCategory: (category: string) => NewsArticle[];
    filterByStatus: (status: NewsStatus) => NewsArticle[];
    changeStatus: (id: number, status: NewsStatus) => void;
    toast: Toast | null;
    clearToast: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [toast, setToast] = useState<Toast | null>(null);

    // Initialize news from data
    useEffect(() => {
        const initialNews = getAllNews();
        setNews(initialNews);
    }, []);

    const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const clearToast = useCallback(() => {
        setToast(null);
    }, []);

    const addNews = useCallback((article: Omit<NewsArticle, 'id'>) => {
        const newId = Math.max(...news.map(n => n.id), 0) + 1;
        const newArticle: NewsArticle = {
            ...article,
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNews(prev => [newArticle, ...prev]);
        showToast('Thêm bài viết thành công');
    }, [news, showToast]);

    const updateNews = useCallback((id: number, articleUpdate: Partial<NewsArticle>) => {
        setNews(prev => prev.map(article =>
            article.id === id
                ? { ...article, ...articleUpdate, updatedAt: new Date().toISOString() }
                : article
        ));
        showToast('Cập nhật bài viết thành công');
    }, [showToast]);

    const deleteNews = useCallback((id: number) => {
        setNews(prev => prev.filter(article => article.id !== id));
        showToast('Xóa bài viết thành công');
    }, [showToast]);

    const getNewsById = useCallback((id: number) => {
        return news.find(article => article.id === id);
    }, [news]);

    const searchNews = useCallback((keyword: string) => {
        if (!keyword.trim()) return news;

        const lowerKeyword = keyword.toLowerCase();
        return news.filter(article =>
            article.title.toLowerCase().includes(lowerKeyword) ||
            article.summary.toLowerCase().includes(lowerKeyword) ||
            article.content.toLowerCase().includes(lowerKeyword) ||
            article.author.toLowerCase().includes(lowerKeyword) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
        );
    }, [news]);

    const filterByCategory = useCallback((category: string) => {
        if (!category) return news;
        return news.filter(article => article.category === category);
    }, [news]);

    const filterByStatus = useCallback((status: NewsStatus) => {
        if (!status) return news;
        return news.filter(article => article.status === status);
    }, [news]);

    const changeStatus = useCallback((id: number, status: NewsStatus) => {
        setNews(prev => prev.map(article =>
            article.id === id
                ? { ...article, status, updatedAt: new Date().toISOString() }
                : article
        ));
        showToast(`Thay đổi trạng thái thành "${status}" thành công`);
    }, [showToast]);

    const value: NewsContextType = {
        news,
        addNews,
        updateNews,
        deleteNews,
        getNewsById,
        searchNews,
        filterByCategory,
        filterByStatus,
        changeStatus,
        toast,
        clearToast,
    };

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
}
