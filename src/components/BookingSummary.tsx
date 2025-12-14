/* ===================================================================
   COMPONENT: BOOKING SUMMARY - TỔNG KẾT ĐẶT VÉ
   - Hiển thị danh sách ghế đã chọn và tổng tiền
   - Sticky sidebar ở bên phải màn hình
   - Empty state khi chưa chọn ghế
   - Nút "Tiếp tục" để qua bước thanh toán
   =================================================================== */

import React from 'react';
import { Seat } from './SeatMap';  // Import type Seat từ SeatMap

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface BookingSummaryProps {
    selectedSeats: Seat[];      // Mảng các ghế đã được chọn
    onContinue: () => void;     // Callback khi click nút Tiếp tục
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ selectedSeats, onContinue }) => {
    // ===== TÍNH TỔNG TIỀN =====
    // Reduce: Cộng dồn giá của tất cả ghế đã chọn
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    return (
        /* ===== SIDEBAR CONTAINER =====
           - sticky top-4: Dính ở vị trí top 16px khi scroll
           - shadow-md: Đổ bóng vừa */
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            {/* Tiêu đề với viền dưới */}
            <h3 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">Thông tin vé</h3>

            {/* ===== CONDITIONAL RENDERING: EMPTY STATE / DANH SÁCH GHẾ ===== */}
            {selectedSeats.length === 0 ? (
                /* ===== EMPTY STATE - CHƯA CHỌN GHẾ ===== */
                <div className="text-center text-gray-500 py-8">
                    <p>Chưa có ghế nào được chọn</p>
                    <p className="text-sm mt-1">Vui lòng chọn ghế ở bảng bên trái</p>
                </div>
            ) : (
                /* ===== DANH SÁCH GHẾ ĐÃ CHỌN ===== */
                <div className="space-y-4">
                    {/* ===== SCROLLABLE LIST - DANH SÁCH CÓ SCROLL =====
                        - max-h-60: Chiều cao tối đa 240px
                        - overflow-y-auto: Scroll dọc khi vượt quá
                        - custom-scrollbar: Class tùy chỉnh cho scrollbar */}
                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {/* Map qua từng ghế đã chọn */}
                        {selectedSeats.map((seat) => (
                            /* Item ghế với viền đứt nét phân cách
                               - last:border-0: Item cuối không có viền */
                            <div key={seat.id} className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 last:border-0">
                                {/* Thông tin ghế */}
                                <div>
                                    {/* Số ghế */}
                                    <span className="font-bold text-[#003366]">Ghế {seat.number}</span>
                                    {/* Loại ghế (translate từ English sang Vietnamese) */}
                                    <span className="text-xs text-gray-500 block">{seat.type === 'Sleeper' ? 'Giường nằm' : 'Ghế mềm'}</span>
                                </div>
                                {/* Giá ghế với format Việt Nam */}
                                <span className="font-semibold text-[#CC0000]">{seat.price.toLocaleString()}đ</span>
                            </div>
                        ))}
                    </div>

                    {/* ===== FOOTER: TỔNG TIỀN VÀ NÚT TIẾP TỤC ===== */}
                    <div className="pt-4 border-t border-gray-200">
                        {/* Tổng tiền */}
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-gray-600 font-medium">Tổng tiền:</span>
                            {/* Tổng tiền lớn, màu đỏ, đậm */}
                            <span className="text-2xl font-bold text-[#CC0000]">{totalPrice.toLocaleString()}đ</span>
                        </div>

                        {/* ===== NÚT TIẾP TỤC =====
                            - w-full: Full width
                            - bg-[#CC0000]: Nền màu đỏ
                            - hover:bg-red-700: Đậm hơn khi hover
                            - transition-colors: Hiệu ứng chuyển màu mượt */}
                        <button
                            onClick={onContinue}
                            className="w-full bg-[#CC0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors duration-200 flex justify-center items-center gap-2"
                        >
                            <span>Tiếp tục</span>
                            {/* Icon mũi tên phải */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSummary;
