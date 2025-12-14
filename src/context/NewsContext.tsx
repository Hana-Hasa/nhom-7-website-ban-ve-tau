/**
 * NEWS CONTEXT - QUẢN LÝ TIN TỨC
 * Context quản lý tin tức/bài viết với đầy đủ CRUD operations:
 * - Add, Update, Delete tin tức
 * - Search theo keyword (title, summary, content, author, tags)
 * - Filter theo category, status
 * - Change status (Nháp, Đã xuất bản, Ẩn)
 * - Toast notifications cho user feedback
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { NewsArticle, NewsStatus, getAllNews } from '@/data/newsData';

/** Interface Toast - Thông báo hiển thị cho user */
interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

/** Interface NewsContextType - API của News Context */
interface NewsContextType {
    news: NewsArticle[]; // Danh sách tin tức
    addNews: (article: Omit<NewsArticle, 'id'>) => void; // Thêm tin tức mới
    updateNews: (id: number, article: Partial<NewsArticle>) => void; // Cập nhật tin tức
    deleteNews: (id: number) => void; // Xóa tin tức
    getNewsById: (id: number) => NewsArticle | undefined; // Lấy tin tức theo ID
    searchNews: (keyword: string) => NewsArticle[]; // Tìm kiếm tin tức
    filterByCategory: (category: string) => NewsArticle[]; // Lọc theo danh mục
    filterByStatus: (status: NewsStatus) => NewsArticle[]; // Lọc theo trạng thái
    changeStatus: (id: number, status: NewsStatus) => void; // Thay đổi trạng thái
    toast: Toast | null; // Toast notification hiện tại
    clearToast: () => void; // Xóa toast
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [toast, setToast] = useState<Toast | null>(null);

    /** useEffect: Khởi tạo news data từ file data khi mount */
    useEffect(() => {
        const initialNews = getAllNews();
        setNews(initialNews);
    }, []);

    /** Hiển thị toast notification, tự động ẩn sau 3 giây */
    const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    /** Xóa toast ngay lập tức */
    const clearToast = useCallback(() => {
        setToast(null);
    }, []);

    /**
     * Thêm tin tức mới
     * - Auto generate ID (max + 1)
     * - Tự động thêm createdAt, updatedAt
     * - Thêm vào đầu danh sách (newest first)
     */
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

    /**
     * Cập nhật tin tức
     * - Merge với data cũ (Partial update)
     * - Tự động update updatedAt timestamp
     */
    const updateNews = useCallback((id: number, articleUpdate: Partial<NewsArticle>) => {
        setNews(prev => prev.map(article =>
            article.id === id
                ? { ...article, ...articleUpdate, updatedAt: new Date().toISOString() }
                : article
        ));
        showToast('Cập nhật bài viết thành công');
    }, [showToast]);

    /** Xóa tin tức theo ID */
    const deleteNews = useCallback((id: number) => {
        setNews(prev => prev.filter(article => article.id !== id));
        showToast('Xóa bài viết thành công');
    }, [showToast]);

    /** Lấy tin tức theo ID (dùng cho trang chi tiết) */
    const getNewsById = useCallback((id: number) => {
        return news.find(article => article.id === id);
    }, [news]);

    /**
     * Tìm kiếm tin tức theo keyword
     * Tìm trong: title, summary, content, author, tags
     */
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

    /** Lọc tin tức theo danh mục */
    const filterByCategory = useCallback((category: string) => {
        if (!category) return news;
        return news.filter(article => article.category === category);
    }, [news]);

    /** Lọc tin tức theo trạng thái (Nháp, Đã xuất bản, Ẩn) */
    const filterByStatus = useCallback((status: NewsStatus) => {
        if (!status) return news;
        return news.filter(article => article.status === status);
    }, [news]);

    /**
     * Thay đổi trạng thái tin tức
     * Dùng để publish/unpublish bài viết
     */
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

/** Custom hook useNews - Access news context */
export function useNews() {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
}
