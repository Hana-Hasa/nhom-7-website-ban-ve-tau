/* ===================================================================
   PAGE: TRANG CHI TIẾT TIN TỨC (NEWS DETAIL PAGE)
   - Hiển thị nội dung đầy đủ của một bài viết
   - Breadcrumb navigation
   - Article header với metadata (category, date, author)
   - Featured image và content (HTML render)
   - Social share buttons
   - Related articles grid
   - Not found state nếu article không tồn tại
   =================================================================== */

'use client';

import { useParams } from 'next/navigation';  // Đọc dynamic route params
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getNewsById, getRelatedNews } from '@/data/newsData';  // Helper functions lấy data

export default function NewsDetailPage() {
    // ===== HOOKS: LẤY ARTICLE ID TỪ URL =====
    const params = useParams();
    const id = parseInt(params.id as string);  // Convert string → number

    // ===== DATA: LẤY ARTICLE VÀ RELATED ARTICLES =====
    const article = getNewsById(id);            // Lấy bài viết theo ID
    const relatedArticles = getRelatedNews(id, 3);  // Lấy 3 bài liên quan

    // ===== NOT FOUND STATE =====
    // Nếu không tìm thấy article, hiển thị trang 404
    if (!article) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />

                {/* Empty state với icon và message */}
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center py-16">
                        {/* Icon mặt buồn */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        {/* Message */}
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                            Không tìm thấy bài viết
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
                        </p>

                        {/* Back button */}
                        <Link
                            href="/tin-tuc"
                            className="inline-flex items-center gap-2 bg-xanh-duongdam text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Quay lại trang tin tức
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // ===== MAIN RENDER: HIỂN THỊ ARTICLE =====
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* ====== BREADCRUMB NAVIGATION =====
                    - Trang chủ > Tin tức > Tiêu đề bài viết */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center gap-2 text-sm">
                            {/* Link trang chủ */}
                            <Link href="/" className="text-gray-500 hover:text-xanh-duongdam transition-colors">
                                Trang chủ
                            </Link>
                            {/* Arrow separator */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {/* Link tin tức */}
                            <Link href="/tin-tuc" className="text-gray-500 hover:text-xanh-duongdam transition-colors">
                                Tin tức
                            </Link>
                            {/* Arrow separator */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {/* Tiêu đề bài viết hiện tại */}
                            <span className="text-gray-700 font-medium truncate">
                                {article.title}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* ===== ARTICLE CONTENT AREA ===== */}
                <article className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">

                        {/* ===== ARTICLE HEADER - METADATA & TITLE ===== */}
                        <header className="mb-8">
                            {/* Category badge và ngày đăng */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Category badge */}
                                <span className="bg-xanh-duongdam text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    {article.category}
                                </span>
                                {/* Ngày đăng */}
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {/* Format ngày dạng tiếng Việt */}
                                    <span>{new Date(article.date).toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>

                            {/* Tiêu đề chính */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                {article.title}
                            </h1>

                            {/* Tóm tắt */}
                            <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                {article.summary}
                            </p>

                            {/* Author info */}
                            <div className="flex items-center gap-3 pt-4 border-t">
                                {/* Avatar (chữ cái đầu) */}
                                <div className="w-12 h-12 bg-xanh-duongdam rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{article.author}</p>
                                    <p className="text-sm text-gray-500">Tác giả</p>
                                </div>
                            </div>
                        </header>

                        {/* ===== FEATURED IMAGE ===== */}
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* ===== ARTICLE CONTENT (HTML) =====
                            - dangerouslySetInnerHTML: Render HTML content
                            - Custom styles cho typography */}
                        <div
                            className="prose prose-lg max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            style={{
                                fontSize: '18px',
                                lineHeight: '1.8',
                                color: '#374151'
                            }}
                        />

                        {/* ===== SHARE SECTION =====
                            - Buttons chia sẻ Facebook, Twitter, Copy link */}
                        <div className="border-t border-b py-6 mb-12">
                            <h3 className="text-lg font-semibold mb-4">Chia sẻ bài viết</h3>
                            <div className="flex gap-3">
                                {/* Facebook button */}
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                                {/* Twitter button */}
                                <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                    Twitter
                                </button>
                                {/* Copy link button */}
                                <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    Sao chép
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* ===== RELATED ARTICLES SECTION =====
                    - Chỉ hiện nếu có bài viết liên quan */}
                {relatedArticles.length > 0 && (
                    <section className="bg-white py-12">
                        <div className="container mx-auto px-4">
                            {/* Tiêu đề section */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Bài viết liên quan
                            </h2>

                            {/* Grid 3 bài liên quan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedArticles.map((related) => (
                                    <NewsCard key={related.id} article={related} />
                                ))}
                            </div>

                            {/* Link xem tất cả tin tức */}
                            <div className="text-center mt-8">
                                <Link
                                    href="/tin-tuc"
                                    className="inline-flex items-center gap-2 bg-xanh-duongdam text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Xem tất cả tin tức
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
