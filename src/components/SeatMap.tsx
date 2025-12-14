/* ===================================================================
   COMPONENT: SEAT MAP - SƠ ĐỒ CHỖ NGỒI
   - Hiển thị grid các ghế trên tàu
   - 3 trạng thái: Trống (available), Đã đặt (occupied), Đang chọn (selected)
   - Responsive grid: 4-8 cột tùy màn hình
   - Legend giải thích màu sắc
   - Hiển thị số ghế còn trống
   =================================================================== */

import React from 'react';

// ===== EXPORT INTERFACE: ĐỊNH NGHĨA GHẾ =====
// Export để các component khác (như BookingSummary) có thể dùng
export interface Seat {
    id: string;                                     // ID duy nhất của ghế
    number: number;                                 // Số ghế hiển thị
    type: 'SoftSeat' | 'HardSeat' | 'Sleeper';      // Loại ghế
    status: 'available' | 'occupied' | 'selected';  // Trạng thái ghế
    price: number;                                  // Giá ghế
}

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface SeatMapProps {
    seats: Seat[];                           // Mảng tất cả các ghế
    onToggleSeat: (seatId: string) => void;  // Callback khi click ghế
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, onToggleSeat }) => {
    // ===== FUNCTION: XÁC ĐỊNH MÀU SẮC GHẾ =====
    // Return className dựa trên status và type của ghế
    const getSeatColor = (status: string, type: string) => {
        // Ghế đã đặt: Màu xám, không cho click
        if (status === 'occupied') return 'bg-gray-300 cursor-not-allowed text-gray-400';

        // Ghế đang chọn: Màu đỏ, chữ trắng
        if (status === 'selected') return 'bg-[#CC0000] text-white border-[#CC0000]';

        // Ghế available (trống):
        // - Giường nằm (Sleeper): Viền xanh đậm, hover nền xanh nhạt
        if (type === 'Sleeper') return 'bg-white border-[#003366] text-[#003366] hover:bg-[#E6F2FF]';

        // - Ghế thường: Viền xám, hover viền và chữ xanh
        return 'bg-white border-gray-400 text-gray-700 hover:border-[#003366] hover:text-[#003366]';
    };

    return (
        /* ===== CONTAINER CHÍNH ===== */
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Tiêu đề */}
            <h3 className="text-lg font-bold text-[#003366] mb-4">Sơ đồ chỗ ngồi</h3>

            {/* ===== LEGEND - CHÚ GIẢI MÀU SẮC =====
                - flex-wrap: Xuống dòng khi cần
                - justify-center: Căn giữa */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-600 justify-center">
                {/* Ghế trống */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-gray-400 bg-white"></div>
                    <span>Ghế trống</span>
                </div>

                {/* Đang chọn */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#CC0000]"></div>
                    <span>Đang chọn</span>
                </div>

                {/* Đã đặt */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-300"></div>
                    <span>Đã đặt</span>
                </div>
            </div>

            {/* ===== GRID SƠ ĐỒ GHẾ =====
                - grid-cols-4: 4 cột trên mobile
                - md:grid-cols-6: 6 cột trên tablet
                - lg:grid-cols-8: 8 cột trên desktop
                - gap-4: Khoảng cách 16px
                - justify-items-center: Căn giữa mỗi item */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
                {/* Map qua từng ghế */}
                {seats.map((seat) => (
                    /* ===== BUTTON GHẾ =====
                       - disabled: Không cho click nếu đã đặt
                       - onClick: Toggle ghế khi click
                       - title: Tooltip hiện số ghế và giá */
                    <button
                        key={seat.id}
                        disabled={seat.status === 'occupied'}
                        onClick={() => onToggleSeat(seat.id)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 ${getSeatColor(
                            seat.status,
                            seat.type
                        )}`}
                        title={`Ghế ${seat.number} - ${seat.price.toLocaleString()}đ`}
                    >
                        {/* Hiển thị số ghế */}
                        {seat.number}
                    </button>
                ))}
            </div>

            {/* ===== FOOTER: THÔNG TIN SỐ GHẾ TRỐNG =====
                - border-t: Viền trên phân cách */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                {/* Filter và đếm số ghế có status = 'available' */}
                Toa này có {seats.filter(s => s.status === 'available').length} chỗ trống
            </div>
        </div>
    );
};

export default SeatMap;
