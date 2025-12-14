/* ===================================================================
   PAGE: TRANG DANH SÁCH TIN TỨC (NEWS LIST PAGE)
   - Hiển thị grid tin tức với NewsCard component
   - Pagination để phân trang
   - Hero section với gradient background
   - Empty state khi không có bài viết
   =================================================================== */

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';  // Component card tin tức
import { getNewsByPage } from '@/data/newsData';  // Hàm lấy tin tức theo trang

export default function NewsPage() {
    // ===== STATE: PAGINATION =====
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 8;  // 8 bài viết mỗi trang

    // ===== DATA: LẤY TIN TỨC THEO TRANG =====
    const { articles, totalPages } = getNewsByPage(currentPage, itemsPerPage);

    // ===== HANDLER: ĐỔI TRANG =====
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes - Cuộn lên đầu trang khi đổi trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ===== MAIN RENDER =====
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* ===== HERO SECTION - TIÊU ĐỀ TRANG ===== */}
                <section className="bg-gradient-to-r from-xanh-duongdam to-blue-700 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Tin tức & Sự kiện
                            </h1>
                            <p className="text-xl text-blue-100">
                                Cập nhật thông tin mới nhất về đường sắt, du lịch và các chương trình khuyến mãi hấp dẫn
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== NEWS GRID SECTION ===== */}
                <section className="container mx-auto px-4 py-12">
                    {/* Grid 4 cột responsive: 1 (mobile) -> 2 (tablet) -> 3 (desktop) -> 4 (xl) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>

                    {/* ===== PAGINATION - PHÂN TRANG =====
                        - Chỉ hiển khi có nhiều hơn 1 trang */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            {/* Nút Previous */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-xanh-duongdam hover:bg-xanh-duongdam hover:text-white shadow-md'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Page Numbers - Tạo mảng từ 1 đến totalPages */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                                        ? 'bg-xanh-duongdam text-white shadow-lg scale-110'  // Active state
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'  // Inactive state
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Nút Next */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-xanh-duongdam hover:bg-xanh-duongdam hover:text-white shadow-md'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* ===== EMPTY STATE - KHÔNG CÓ BÀI VIẾT =====
                        - Hiển thị khi articles.length === 0 */}
                    {articles.length === 0 && (
                        <div className="text-center py-16">
                            {/* Icon document */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Không có bài viết nào
                            </h3>
                            <p className="text-gray-500">
                                Vui lòng quay lại sau để xem tin tức mới nhất
                            </p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
