/* ===================================================================
   COMPONENT: NEWS CARD - THẺ HIỂN THỊ BÀI VIẾT TIN TỨC
   - Hiển thị preview của bài viết tin tức (hình, tiêu đề, tóm tắt, ngày)
   - Hiệu ứng hover: scale image, lift card, change colors
   - Badge category ở góc trên ảnh
   - Link đến trang chi tiết bài viết
   =================================================================== */

import Link from 'next/link';
import { NewsArticle } from '@/data/newsData';  // Type definition cho bài viết

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface NewsCardProps {
    article: NewsArticle;  // Object chứa thông tin bài viết
}

export default function NewsCard({ article }: NewsCardProps) {
    return (
        /* ===== WRAPPER LINK - ĐIỀU HƯỚNG ĐẾN CHI TIẾT =====
           - Link đến /tin-tuc/{id}
           - group: Cho phép children phản ứng với hover của parent */
        <Link href={`/tin-tuc/${article.id}`} className="group">
            {/* ===== CARD CONTAINER =====
                - article tag: Semantic HTML cho bài viết
                - h-full flex flex-col: Đảm bảo card có chiều cao đồng nhất trong grid
                - hover:shadow-2xl: Tăng bóng khi hover
                - hover:-translate-y-2: Nâng card lên 8px khi hover
                - transition-all duration-300: Hiệu ứng chuyển mượt 300ms */}
            <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">

                {/* ===== BLOCK: HÌNH ẢNH BÀI VIẾT =====
                    - relative: Để đặt badge category ở góc
                    - h-48: Chiều cao cố định 192px
                    - overflow-hidden: Clip hình để scale không tràn */}
                <div className="relative h-48 overflow-hidden">
                    {/* Hình ảnh với hiệu ứng scale khi hover parent
                        - group-hover:scale-110: Phóng to 110% khi hover card
                        - transition-transform duration-500: Hiệu ứng scale mượt 500ms */}
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badge category
                        - absolute top-3 left-3: Đặt ở góc trên trái
                        - rounded-full: Bo tròn hoàn toàn */}
                    <div className="absolute top-3 left-3 bg-xanh-duongdam text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                    </div>
                </div>

                {/* ===== BLOCK: NỘI DUNG BÀI VIẾT =====
                    - flex-grow: Chiếm hết không gian còn lại
                    - flex flex-col: Layout dọc cho nội dung */}
                <div className="p-5 flex-grow flex flex-col">

                    {/* Tiêu đề bài viết
                        - line-clamp-2: Giới hạn 2 dòng, cắt bớt nếu dài
                        - group-hover:text-xanh-duongdam: Đổi màu khi hover card */}
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-xanh-duongdam transition-colors">
                        {article.title}
                    </h3>

                    {/* Tóm tắt bài viết
                        - line-clamp-3: Giới hạn 3 dòng
                        - flex-grow: Đẩy footer xuống dưới cùng */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {article.summary}
                    </p>

                    {/* ===== FOOTER: NGÀY ĐĂNG VÀ LINK ĐỌC THÊM =====
                        - border-t: Viền trên phân cách với nội dung */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">

                        {/* Ngày đăng với icon calendar */}
                        <div className="flex items-center gap-2">
                            {/* Icon lịch */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {/* Format ngày theo locale Việt Nam */}
                            <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                        </div>

                        {/* Link "Đọc thêm" với icon mũi tên
                            - group-hover:gap-2: Tăng khoảng cách khi hover (hiệu ứng mũi tên chạy) */}
                        <div className="flex items-center gap-1 text-xanh-duongdam font-medium group-hover:gap-2 transition-all">
                            <span>Đọc thêm</span>
                            {/* Icon mũi tên phải */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

