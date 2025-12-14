/* ===================================================================
   PAGE: TRANG LIÊN HỆ (CONTACT PAGE)
   - Thông tin liên hệ (3 cards: địa chỉ, hotline, email)
   - Kênh social media (Facebook, Zalo, Email, Hotline)
   - FAQ accordion (Câu hỏi thường gặp)
   - CTA section (Đề nghị gọi hotline hoặc email)
   =================================================================== */

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllFAQs } from '@/data/faqData';  // Lấy danh sách FAQ

export default function ContactPage() {
    // ===== STATE: FAQ ACCORDION =====
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);  // ID của FAQ đang mở (hoặc null)
    const faqs = getAllFAQs();  // Lấy tất cả FAQ từ data

    // ===== HANDLER: BẬT/TẮT FAQ =====
    const toggleFAQ = (id: number) => {
        setOpenFAQ(openFAQ === id ? null : id);  // Nếu đang mở thì đóng, nếu đang đóng thì mở
    };

    // ===== MAIN RENDER =====
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* ===== HERO SECTION ===== */}
                <section className="bg-gradient-to-r from-xanh-duongdam to-blue-700 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Liên hệ & Hỗ trợ
                            </h1>
                            <p className="text-xl text-blue-100">
                                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== CONTACT INFO CARDS (3 CARDS) =====
                    - Grid 3 cột responsive: 1 (mobile) -> 3 (desktop) */}
                <section className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Thông tin liên hệ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                        {/* Card 1: Địa chỉ */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                {/* Icon: Location pin */}
                                <div className="w-16 h-16 bg-xanh-duongdam rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Địa chỉ văn phòng</h3>
                                <p className="text-gray-600">
                                    Số 118 Lê Lợi, Phường Bến Thành,<br />
                                    Quận 1, TP. Hồ Chí Minh
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Hotline */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                {/* Icon: Phone */}
                                <div className="w-16 h-16 bg-xanh-duongdam rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline 24/7</h3>
                                <a
                                    href="tel:19006469"
                                    className="text-xanh-duongdam hover:text-blue-700 font-semibold text-lg transition-colors"
                                >
                                    1900 6469
                                </a>
                                <p className="text-gray-500 text-sm mt-1">Hỗ trợ 24/7</p>
                            </div>
                        </div>

                        {/* Card 3: Email */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                {/* Icon: Mail */}
                                <div className="w-16 h-16 bg-xanh-duongdam rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                <a
                                    href="mailto:hotro@vetauviet.vn"
                                    className="text-xanh-duongdam hover:text-blue-700 font-semibold transition-colors break-all"
                                >
                                    hotro@vetauviet.vn
                                </a>
                                <p className="text-gray-500 text-sm mt-1">Phản hồi trong 24h</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SOCIAL CHANNELS GRID (4 KÊNH) =====
                    - Grid 4 cột responsive
                    - Facebook, Zalo, Email, Hotline */}
                <section className="bg-white py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Kết nối với chúng tôi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">

                            {/* Facebook Button */}
                            <a
                                href="https://facebook.com/vetauviet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors group"
                            >
                                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <div>
                                    <p className="font-semibold">Facebook</p>
                                    <p className="text-sm opacity-90">@vetauviet</p>
                                </div>
                            </a>

                            {/* Zalo Button */}
                            <a
                                href="https://zalo.me/19006469"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-sky-500 text-white p-4 rounded-lg hover:bg-sky-600 transition-colors group"
                            >
                                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path fill="white" d="M12 6c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2.1 4.5L7 19l2.5-1.1c.8.3 1.6.4 2.5.4 3.3 0 6-2.7 6-6s-2.7-6-6-6zm3 7.5h-6v-1h6v1zm0-2h-6v-1h6v1z" />
                                </svg>
                                <div>
                                    <p className="font-semibold">Zalo</p>
                                    <p className="text-sm opacity-90">1900 6469</p>
                                </div>
                            </a>

                            {/* Email Button */}
                            <a
                                href="mailto:hotro@vetauviet.vn"
                                className="flex items-center gap-3 bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-sm opacity-90">Gửi email</p>
                                </div>
                            </a>

                            {/* Hotline Button */}
                            <a
                                href="tel:19006469"
                                className="flex items-center gap-3 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="font-semibold">Hotline</p>
                                    <p className="text-sm opacity-90">Gọi ngay</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ SECTION (ACCORDION) ===== */}
                <section className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Câu hỏi thường gặp
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến
                    </p>

                    {/* FAQ Accordion List */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Question Button - Bấm để mở/đóng */}
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        {/* Badge số thứ tự */}
                                        <span className="flex-shrink-0 w-6 h-6 bg-xanh-duongdam text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                            {faq.id}
                                        </span>
                                        {/* Câu hỏi */}
                                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    </div>
                                    {/* Icon chevron (xoay 180 khi mở) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 text-xanh-duongdam flex-shrink-0 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Answer - Mở/đóng với animation */}
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-4 pt-2 bg-gray-50 border-t">
                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                        {/* Category badge */}
                                        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-xanh-duongdam text-xs font-semibold rounded-full">
                                            {faq.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== CTA: VẪN CẦN HỖ TRỢ? =====
                        - Hiển thị sau FAQ để đề nghị liên hệ */}
                    <div className="mt-12 text-center bg-gradient-to-r from-xanh-duongdam to-blue-700 text-white rounded-xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-3">Vẫn cần hỗ trợ?</h3>
                        <p className="mb-6 text-blue-100">
                            Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Hotline Button */}
                            <a
                                href="tel:19006469"
                                className="bg-white text-xanh-duongdam px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Gọi hotline
                            </a>
                            {/* Email Button */}
                            <a
                                href="mailto:hotro@vetauviet.vn"
                                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-xanh-duongdam transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Gửi email
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
