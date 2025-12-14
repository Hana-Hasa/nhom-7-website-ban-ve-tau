/* ===================================================================
   COMPONENT: TRAIN INFO - THÔNG TIN CHUYẾN TÀU
   - Hiển thị thông tin tổng quan về chuyến tàu
   - Timeline visualization cho ga đi - ga đến
   - Icon tàu, mã tàu, thời gian, thời lượng
   - Responsive layout cho mobile và desktop
   =================================================================== */

import React from 'react';

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface TrainInfoProps {
  trainId: string;            // Mã tàu (vd: "SE1", "SE3")
  departureStation: string;   // Tên ga đi
  arrivalStation: string;     // Tên ga đến
  departureTime: string;      // Giờ khởi hành
  arrivalTime: string;        // Giờ đến
  duration: string;           // Thời lượng hành trình
}

const TrainInfo: React.FC<TrainInfoProps> = ({
  trainId,
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
  duration,
}) => {
  return (
    /* ===== CARD CONTAINER =====
       - border-l-4: Viền trái dày 4px màu xanh đậm (accent)
       - shadow-md: Đổ bóng vừa */
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[#003366]">

      {/* ===== MAIN LAYOUT =====
          - flex-col md:flex-row: Dọc trên mobile, ngang trên desktop
          - justify-between: Căn 2 đầu */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* ===== BLOCK: ICON VÀ MÃ TÀU ===== */}
        <div className="flex items-center gap-4">
          {/* Icon tàu trong vòng tròn xanh */}
          <div className="bg-[#003366] text-white p-3 rounded-full">
            {/* SVG icon building (đại diện cho tàu) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          {/* Thông tin tàu */}
          <div>
            {/* Mã tàu */}
            <h2 className="text-xl font-bold text-[#003366]">{trainId}</h2>
            {/* Loại tàu (hardcoded) */}
            <p className="text-gray-500 text-sm">Tàu khách thống nhất</p>
          </div>
        </div>

        {/* ===== BLOCK: TIMELINE GA ĐI - GA ĐẾN =====
            - flex-1: Chiếm hết không gian còn lại
            - w-full md:w-auto: Full width mobile, auto desktop */}
        <div className="flex-1 w-full md:w-auto px-4">

          {/* Header: Tên ga và thời lượng */}
          <div className="flex justify-between items-center text-sm font-semibold mb-1 text-gray-700">
            <span>{departureStation}</span>
            {/* Thời lượng màu đỏ ở giữa */}
            <span className="text-[#CC0000]">{duration}</span>
            <span>{arrivalStation}</span>
          </div>

          {/* ===== TIMELINE VISUALIZATION =====
              - relative: Để đặt các marker absolute */}
          <div className="relative flex items-center">
            {/* Thanh ngang màu xám (track) */}
            <div className="h-1 w-full bg-gray-200 rounded"></div>

            {/* Marker ga đi (vòng tròn trái)
                - absolute left-0: Đặt bên trái */}
            <div className="absolute left-0 h-3 w-3 bg-[#003366] rounded-full"></div>

            {/* Marker ga đến (vòng tròn phải)
                - absolute right-0: Đặt bên phải */}
            <div className="absolute right-0 h-3 w-3 bg-[#003366] rounded-full"></div>

            {/* Mũi tên ở giữa
                - transform -translate: Căn giữa hoàn hảo
                - bg-white px-2: Nền trắng để che thanh xám */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
              &rarr;
            </div>
          </div>

          {/* Footer: Giờ khởi hành và giờ đến */}
          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
            <span>{departureTime}</span>
            <span>{arrivalTime}</span>
          </div>
        </div>

        {/* ===== BLOCK: NGÀY ĐI =====
            - hidden md:block: Ẩn trên mobile, hiện trên desktop */}
        <div className="text-right hidden md:block">
          <span className="block text-xs text-gray-500">Ngày đi</span>
          {/* Ngày đi (hardcoded - nên được truyền vào props) */}
          <span className="font-bold text-[#003366]">15/12/2025</span>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
