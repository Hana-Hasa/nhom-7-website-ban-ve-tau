'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useNews } from '@/context/NewsContext';
import { NewsStatus } from '@/data/newsData';
import Toast from '@/components/admin/Toast';

export default function NewsListPage() {
    const { news, deleteNews, changeStatus, toast, clearToast } = useNews();

    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState<NewsStatus | ''>('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(news.map(n => n.category)));
        return cats.sort();
    }, [news]);

    // Filter news
    const filteredNews = useMemo(() => {
        let result = [...news];

        // Search
        if (searchKeyword.trim()) {
            const keyword = searchKeyword.toLowerCase();
            result = result.filter(article =>
                article.title.toLowerCase().includes(keyword) ||
                article.summary.toLowerCase().includes(keyword) ||
                article.author.toLowerCase().includes(keyword) ||
                article.category.toLowerCase().includes(keyword)
            );
        }

        // Filter by category
        if (filterCategory) {
            result = result.filter(article => article.category === filterCategory);
        }

        // Filter by status
        if (filterStatus) {
            result = result.filter(article => article.status === filterStatus);
        }

        return result;
    }, [news, searchKeyword, filterCategory, filterStatus]);

    // Stats
    const stats = useMemo(() => {
        return {
            total: news.length,
            published: news.filter(n => n.status === 'Đã xuất bản').length,
            draft: news.filter(n => n.status === 'Nháp').length,
            hidden: news.filter(n => n.status === 'Ẩn').length,
        };
    }, [news]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getStatusColor = (status: NewsStatus) => {
        const colors = {
            'Nháp': 'bg-gray-100 text-gray-800',
            'Đã xuất bản': 'bg-green-100 text-green-800',
            'Ẩn': 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    const handleDelete = (id: number) => {
        deleteNews(id);
        setShowDeleteConfirm(null);
    };

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Tin tức</h1>
                    <p className="text-gray-600 mt-1">
                        Tổng số: {filteredNews.length} bài viết
                    </p>
                </div>
                <Link
                    href="/admin/tin-tuc/them-moi"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + Thêm bài viết mới
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Tổng bài viết</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700">Đã xuất bản</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">{stats.published}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-700">Nháp</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{stats.draft}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-sm text-red-700">Ẩn</div>
                    <div className="text-2xl font-bold text-red-900 mt-1">{stats.hidden}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề, tác giả..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as NewsStatus | '')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Đã xuất bản">Đã xuất bản</option>
                        <option value="Nháp">Nháp</option>
                        <option value="Ẩn">Ẩn</option>
                    </select>
                </div>

                {/* Clear filters */}
                {(searchKeyword || filterCategory || filterStatus) && (
                    <button
                        onClick={() => {
                            setSearchKeyword('');
                            setFilterCategory('');
                            setFilterStatus('');
                        }}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ✕ Xóa bộ lọc
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tiêu đề
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tác giả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đăng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lượt xem
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredNews.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        Không tìm thấy bài viết nào
                                    </td>
                                </tr>
                            ) : (
                                filteredNews.map((article) => (
                                    <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 max-w-md">
                                                {article.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{article.category}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{article.author}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{formatDate(article.date)}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">
                                                {article.views.toLocaleString('vi-VN')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/tin-tuc/${article.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                    target="_blank"
                                                >
                                                    Xem trước
                                                </Link>
                                                <Link
                                                    href={`/admin/tin-tuc/${article.id}/sua`}
                                                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                                                >
                                                    Sửa
                                                </Link>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(article.id)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Xác nhận xóa bài viết
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={clearToast}
                />
            )}
        </div>
    );
}
