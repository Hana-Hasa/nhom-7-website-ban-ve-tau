'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useNews } from '@/context/NewsContext';
import { NewsStatus } from '@/data/newsData';

export default function EditNewsPage() {
    const router = useRouter();
    const params = useParams();
    const newsId = parseInt(params.id as string);
    const { getNewsById, updateNews } = useNews();

    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        image: '',
        category: '',
        author: '',
        tags: '',
        status: 'Nháp' as NewsStatus,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const categories = [
        'Tin tức',
        'Khuyến mãi',
        'Hướng dẫn',
        'Du lịch',
        'Công nghệ',
        'Chính sách',
        'An ninh',
        'Dịch vụ',
        'Đối tác',
        'Lịch sử',
        'Mẹo hay',
        'Quốc tế',
        'Môi trường',
        'Ẩm thực',
    ];

    useEffect(() => {
        const article = getNewsById(newsId);
        if (article) {
            setFormData({
                title: article.title,
                summary: article.summary,
                content: article.content,
                image: article.image,
                category: article.category,
                author: article.author,
                tags: article.tags.join(', '),
                status: article.status,
            });
            setLoading(false);
        } else {
            // Article not found, redirect back
            router.push('/admin/tin-tuc');
        }
    }, [newsId, getNewsById, router]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề không được để trống';
        }
        if (!formData.summary.trim()) {
            newErrors.summary = 'Tóm tắt không được để trống';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Nội dung không được để trống';
        }
        if (!formData.image.trim()) {
            newErrors.image = 'Ảnh đại diện không được để trống';
        }
        if (!formData.category) {
            newErrors.category = 'Vui lòng chọn danh mục';
        }
        if (!formData.author.trim()) {
            newErrors.author = 'Tác giả không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        updateNews(newsId, {
            title: formData.title,
            summary: formData.summary,
            content: formData.content,
            image: formData.image,
            category: formData.category,
            author: formData.author,
            tags: tagsArray,
            status: formData.status,
        });

        router.push('/admin/tin-tuc');
    };

    if (loading) {
        return (
            <div className="max-w-4xl">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600">Đang tải...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Sửa bài viết</h1>
                <p className="text-gray-600 mt-1">
                    Cập nhật thông tin bài viết
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Nhập tiêu đề bài viết"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                {/* Author */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tác giả <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.author ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Nhập tên tác giả"
                    />
                    {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
                </div>

                {/* Summary */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tóm tắt <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        rows={3}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.summary ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Nhập tóm tắt ngắn gọn về bài viết"
                    />
                    {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={12}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm ${errors.content ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Nhập nội dung bài viết (hỗ trợ HTML)"
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                    <p className="mt-1 text-sm text-gray-500">
                        Bạn có thể sử dụng các thẻ HTML như &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, v.v.
                    </p>
                </div>

                {/* Image */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ảnh đại diện (URL) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.image ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="/path/to/image.jpg"
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    <p className="mt-1 text-sm text-gray-500">
                        Nhập đường dẫn ảnh tương đối hoặc URL tuyệt đối
                    </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tag1, tag2, tag3"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Nhập các tag cách nhau bằng dấu phẩy
                    </p>
                </div>

                {/* Status */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as NewsStatus })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="Nháp">Nháp</option>
                        <option value="Đã xuất bản">Đã xuất bản</option>
                        <option value="Ẩn">Ẩn</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                    <Link
                        href="/admin/tin-tuc"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
}
