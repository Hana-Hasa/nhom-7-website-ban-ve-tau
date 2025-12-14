/* ===================================================================
   COMPONENT: CONFIRM DIALOG - HỘP THOẠI XÁC NHẬN
   - Modal xác nhận trước khi thực hiện hành động nguy hiểm
   - 3 loại: danger (đỏ), warning (vàng), info (xanh)
   - Overlay làm mờ background
   - Animation fade-in và slide-up
   - Buttons: Hủy (Cancel) và Xác nhận (Confirm)
   =================================================================== */

'use client';

import { ReactNode } from 'react';

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface ConfirmDialogProps {
    isOpen: boolean;              // Trạng thái hiển thị dialog
    title: string;                // Tiêu đề dialog
    message: string;              // Nội dung thông báo
    confirmText?: string;         // Text nút xác nhận (default: "Xác nhận")
    cancelText?: string;          // Text nút hủy (default: "Hủy")
    onConfirm: () => void;        // Callback khi click Xác nhận
    onCancel: () => void;         // Callback khi click Hủy
    type?: 'danger' | 'warning' | 'info';  // Loại dialog (màu sắc)
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Xác nhận',  // Default value
    cancelText = 'Hủy',
    onConfirm,
    onCancel,
    type = 'warning',  // Default type là warning
}: ConfirmDialogProps) {
    // ===== EARLY RETURN: ẨN DIALOG NẾU KHÔNG MỞ =====
    if (!isOpen) return null;

    // ===== MAPPING: MÀU SẮC THEO TYPE =====
    // Định nghĩa màu nút Xác nhận dựa trên type
    const typeColors = {
        danger: 'bg-red-600 hover:bg-red-700',      // Đỏ: Hành động nguy hiểm (xóa)
        warning: 'bg-yellow-600 hover:bg-yellow-700',  // Vàng: Cảnh báo
        info: 'bg-blue-600 hover:bg-blue-700',      // Xanh: Thông tin
    };

    return (
        /* ===== OVERLAY - LỚP PHỦ ĐEN MỜ =====
           - fixed inset-0: Phủ toàn màn hình
           - z-50: Layer cao nhất
           - bg-black bg-opacity-50: Nền đen trong suốt 50%
           - animate-fade-in: Hiệu ứng mờ dần */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">

            {/* ===== DIALOG BOX =====
                - max-w-md: Chiều rộng tối đa 448px
                - animate-slide-up: Hiệu ứng trượt lên từ dưới */}
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up">
                <div className="p-6">
                    {/* Tiêu đề dialog */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

                    {/* Nội dung thông báo */}
                    <p className="text-gray-600 mb-6">{message}</p>

                    {/* ===== BUTTONS: HỦY VÀ XÁC NHẬN =====
                        - justify-end: Căn phải
                        - gap-3: Khoảng cách 12px */}
                    <div className="flex justify-end gap-3">
                        {/* Nút Hủy - màu xám */}
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                        >
                            {cancelText}
                        </button>

                        {/* Nút Xác nhận - màu động theo type */}
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 text-white ${typeColors[type]} rounded-lg transition-colors font-medium`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
