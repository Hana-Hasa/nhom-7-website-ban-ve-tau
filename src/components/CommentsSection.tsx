/* ===================================================================
   COMPONENT: COMMENTS SECTION - ĐÁNH GIÁ VÀ BÌNH LUẬN
   - Hiển thị danh sách bình luận hiện có
   - Form thêm đánh giá mới với star rating
   - Avatar người dùng (initial letter)
   - Textarea để nhập nội dung bình luận
   =================================================================== */

import React, { useState } from 'react';

// ===== DATA: MOCK COMMENTS =====
// Dữ liệu giả lập các bình luận có sẵn
const mockComments = [
    { id: 1, user: 'Nguyễn Văn A', rating: 5, content: 'Tàu sạch sẽ, nhân viên thân thiện.', date: '10/12/2025' },
    { id: 2, user: 'Trần Thị B', rating: 4, content: 'Ghế ngồi thoải mái, nhưng wifi hơi yếu.', date: '11/12/2025' },
];

const CommentsSection: React.FC = () => {
    // ===== STATE: RATING NGƯỜI DÙNG ĐANG CHỌN =====
    // Lưu số sao người dùng chọn (1-5), mặc định 5
    const [rating, setRating] = useState(5);

    return (
        // Container chính
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Tiêu đề */}
            <h3 className="text-lg font-bold text-[#003366] mb-4 border-b pb-2">Đánh giá & Bình luận</h3>

            {/* ===== DANH SÁCH BÌNH LUẬN HIỆN CÓ ===== */}
            <div className="space-y-4 mb-8">
                {/* Map qua từng comment */}
                {mockComments.map((comment) => (
                    // Item comment
                    <div key={comment.id} className="flex gap-3">
                        {/* Avatar (chữ cái đầu của tên) */}
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                            {comment.user.charAt(0)}
                        </div>

                        {/* Nội dung comment */}
                        <div className="bg-gray-50 flex-1 p-3 rounded-lg">
                            {/* Header: Tên, rating, ngày */}
                            <div className="flex justify-between items-start">
                                <div>
                                    {/* Tên người dùng */}
                                    <span className="font-bold text-sm block text-gray-800">{comment.user}</span>

                                    {/* Hiển thị sao rating */}
                                    <div className="flex text-yellow-500 text-xs mb-1">
                                        {/* Tạo mảng 5 phần tử và map qua */}
                                        {[...Array(5)].map((_, i) => (
                                            // Sao đầy (★) nếu i < rating, sao rỗng (☆) nếu không
                                            <span key={i}>{i < comment.rating ? '★' : '☆'}</span>
                                        ))}
                                    </div>
                                </div>
                                {/* Ngày đăng */}
                                <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>

                            {/* Nội dung bình luận */}
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== FORM THÊM ĐÁNH GIÁ MỚI ===== */}
            <div>
                {/* Tiêu đề form */}
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Viết đánh giá của bạn</h4>

                {/* ===== STAR RATING SELECTOR =====
                    - Người dùng click vào sao để chọn rating */}
                <div className="flex gap-2 mb-3">
                    {/* Map qua các số 1-5 */}
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            // Màu vàng nếu star <= rating hiện tại, xám nếu không
                            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                {/* ===== TEXTAREA NHẬP BÌNH LUẬN ===== */}
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                    rows={3}
                    placeholder="Chia sẻ trải nghiệm của bạn về chuyến tàu này..."
                ></textarea>

                {/* ===== NÚT GỬI ĐÁNH GIÁ ===== */}
                <div className="mt-2 text-right">
                    <button className="bg-[#003366] text-white text-sm font-semibold py-2 px-4 rounded hover:bg-[#002244] transition-colors">
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentsSection;
