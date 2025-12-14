/* ===================================================================
   COMPONENT: TOAST - THÔNG BÁO TỰ ĐỘNG ẨN
   - Notification toast hiện ở góc phải trên
   - 4 loại: success, error, info, warning với màu sắc khác nhau
   - Tự động ẩn sau duration (default 3s)
   - Có nút đóng thủ công
   - Animation slide-in từ phải
   =================================================================== */

'use client';

import { useEffect } from 'react';

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface ToastProps {
    message: string;                              // Nội dung thông báo
    type: 'success' | 'error' | 'info' | 'warning';  // Loại toast (màu sắc + icon)
    onClose: () => void;                          // Callback khi đóng toast
    duration?: number;                            // Thời gian tự động ẩn (ms)
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
    // ===== EFFECT: TỰ ĐỘNG ẨN SAU DURATION =====
    // Set timer để gọi onClose sau thời gian duration
    useEffect(() => {
        const timer = setTimeout(onClose, duration);

        // Cleanup: Xóa timer khi component unmount hoặc deps thay đổi
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // ===== MAPPING: MÀU NỀN THEO TYPE =====
    const bgColors = {
        success: 'bg-green-500',   // Xanh lá: Thành công
        error: 'bg-red-500',       // Đỏ: Lỗi
        info: 'bg-blue-500',       // Xanh dương: Thông tin
        warning: 'bg-yellow-500',  // Vàng: Cảnh báo
    };

    // ===== MAPPING: ICON THEO TYPE =====
    const icons = {
        success: '✓',  // Checkmark
        error: '✕',    // X
        info: 'ℹ',     // Information
        warning: '⚠',  // Warning triangle
    };

    return (
        /* ===== CONTAINER - VỊ TRÍ FIXED GÓC PHẢI TRÊN =====
           - fixed top-4 right-4: Đặt cố định góc phải trên, cách 16px
           - z-50: Layer cao nhất
           - animate-slide-in-right: Hiệu ứng trượt vào từ phải */
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">

            {/* ===== TOAST CARD =====
                - Màu nền động theo type
                - min-w-[300px] max-w-md: Chiều rộng tối thiểu 300px, tối đa 448px */}
            <div
                className={`${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
            >
                {/* Icon loại toast */}
                <div className="text-2xl font-bold">{icons[type]}</div>

                {/* Nội dung message - flex-1 để chiếm hết không gian còn lại */}
                <div className="flex-1">
                    <p className="font-medium">{message}</p>
                </div>

                {/* Nút đóng thủ công */}
                <button
                    onClick={onClose}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
                >
                    {/* Icon X */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
