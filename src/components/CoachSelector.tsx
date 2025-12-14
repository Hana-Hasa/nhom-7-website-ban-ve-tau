/* ===================================================================
   COMPONENT: COACH SELECTOR - BỘ CHỌN TÒA TÀU
   - Hiển thị danh sách các tòa tàu theo chiều ngang
   - Có icon đầu tàu ở đầu
   - Highlight tòa đang được chọn
   - Hiển thị số ghế available/total cho mỗi tòa
   =================================================================== */

import React from 'react';

// ===== INTERFACE: ĐỊNH NGHĨA TÒA TÀU =====
interface Coach {
    id: number;          // ID của tòa
    name: string;        // Tên tòa (vd: "Ghế mềm", "Giường nằm")
    type: string;        // Loại tòa
    available: number;   // Số ghế còn trống
    total: number;       // Tổng số ghế
}

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface CoachSelectorProps {
    coaches: Coach[];              // Danh sách các tòa tàu
    selectedCoachId: number;       // ID tòa đang được chọn
    onSelectCoach: (id: number) => void;  // Callback khi chọn tòa
}

const CoachSelector: React.FC<CoachSelectorProps> = ({ coaches, selectedCoachId, onSelectCoach }) => {
    return (
        /* ===== HORIZONTAL SCROLL CONTAINER =====
           - flex-nowrap: Không xuống dòng
           - overflow-x-auto: Scroll ngang khi tràn
           - gap-4: Khoảng cách 16px giữa các items
           - custom-scrollbar: Class tùy chỉnh scrollbar */
        <div className="flex flex-nowrap overflow-x-auto gap-4 py-4 mb-6 custom-scrollbar">

            {/* ===== BLOCK: ĐẦU TÀU (LOCOMOTIVE) =====
                - flex-shrink-0: Không cho thu nhỏ khi hết chỗ */}
            <div className="flex-shrink-0 flex flex-col items-center">
                {/* Container đầu tàu với màu đen
                    - rounded-l-lg: Bo góc lớn bên trái
                    - rounded-r-md: Bo góc vừa bên phải
                    - relative: Để đặt bánh xe absolute */}
                <div className="w-24 h-12 bg-gray-800 rounded-l-lg rounded-r-md flex items-center justify-center shadow-md relative">
                    {/* Bánh xe trái (decorative) */}
                    <div className="absolute -bottom-1 left-2 h-3 w-3 bg-black rounded-full border border-gray-500"></div>
                    {/* Bánh xe phải (decorative) */}
                    <div className="absolute -bottom-1 right-2 h-3 w-3 bg-black rounded-full border border-gray-500"></div>
                    {/* Text "ĐẦU TÀU" */}
                    <span className="text-white text-xs font-bold">ĐẦU TÀU</span>
                </div>
            </div>

            {/* ===== DANH SÁCH CÁC TÒA TÀU ===== */}
            {coaches.map((coach) => (
                /* Button cho mỗi tòa tàu
                   - flex-shrink-0: Không thu nhỏ
                   - group: Cho phép children phản ứng với hover
                   - transform -translate-y-1: Nâng lên khi được chọn */
                <button
                    key={coach.id}
                    onClick={() => onSelectCoach(coach.id)}
                    className={`flex-shrink-0 flex flex-col items-center group transition-all duration-300 ${selectedCoachId === coach.id ? 'transform -translate-y-1' : ''
                        }`}
                >
                    {/* ===== COACH CARD =====
                        - Màu sắc thay đổi dựa trên selection state
                        - Selected: Nền xanh nhạt, viền xanh đậm
                        - Not selected: Nền trắng, viền xám, hover viền xanh */}
                    <div
                        className={`w-28 h-12 rounded-lg border-2 flex items-center justify-center relative shadow-sm transition-colors ${selectedCoachId === coach.id
                            ? 'bg-[#E6F2FF] border-[#003366]'
                            : 'bg-white border-gray-300 hover:border-[#003366]'
                            }`}
                    >
                        {/* Số tòa
                            - Màu xanh đậm khi selected, xám khi không */}
                        <span className={`font-bold ${selectedCoachId === coach.id ? 'text-[#003366]' : 'text-gray-600'}`}>Toa {coach.id}</span>

                        {/* Bánh xe trang trí bên trái */}
                        <div className="absolute -bottom-1 left-2 h-3 w-3 bg-gray-600 rounded-full"></div>
                        {/* Bánh xe trang trí bên phải */}
                        <div className="absolute -bottom-1 right-2 h-3 w-3 bg-gray-600 rounded-full"></div>
                    </div>

                    {/* ===== THÔNG TIN TÒA =====
                        - Tên tòa và số ghế available/total */}
                    <div className="mt-2 text-center">
                        {/* Tên tòa (vd: "Ghế mềm", "Giường nằm") */}
                        <span className="block text-xs font-medium text-gray-700">{coach.name}</span>
                        {/* Số ghế available/total */}
                        <span className="block text-[10px] text-gray-500">{coach.available}/{coach.total} chỗ</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default CoachSelector;
