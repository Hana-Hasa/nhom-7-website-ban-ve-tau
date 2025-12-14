/**
 * TRANG QUẢN LÝ CHUYẾN TÀU - DANH SÁCH
 * Hiển thị danh sách tất cả chuyến tàu với các chức năng:
 * - Tìm kiếm theo mã, tên
 * - Lọc theo tuyến đường, trạng thái, ngày khởi hành
 * - Xem chi tiết, sửa, xóa chuyến tàu
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTrainManagement } from '@/hooks/useTrainManagement';
import { Train, TrainFilters, TrainStatus } from '@/types/train';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

export default function TrainListPage() {
    // ====== HOOKS ======
    // Hook quản lý chuyến tàu: cung cấp dữ liệu trains, các hàm CRUD và toast notifications
    const { trains, deleteTrain, filterTrains, availableRoutes, toast, showToast } = useTrainManagement();

    // ====== STATE MANAGEMENT ======
    // State lưu các bộ lọc: searchKeyword, route, status, departureDate
    const [filters, setFilters] = useState<TrainFilters>({});

    // State lưu chuyến tàu đang được chọn để xóa (hiển thị confirm dialog)
    const [deleteTarget, setDeleteTarget] = useState<Train | null>(null);

    // Lọc danh sách chuyến tàu theo filters hiện tại
    const filteredTrains = filterTrains(filters);

    // ====== EVENT HANDLERS ======
    /**
     * Xử lý khi người dùng click nút Xóa
     * Hiển thị dialog xác nhận xóa
     */
    const handleDelete = (train: Train) => {
        setDeleteTarget(train);
    };

    /**
     * Xử lý khi người dùng xác nhận xóa chuyến tàu
     * Gọi deleteTrain từ hook và hiển thị thông báo nếu có lỗi
     */
    const confirmDelete = () => {
        if (deleteTarget) {
            const result = deleteTrain(deleteTarget.id);
            if (!result.success) {
                showToast(result.message, 'error');
            }
            setDeleteTarget(null); // Đóng dialog
        }
    };

    // ====== HELPER FUNCTIONS ======
    /**
     * Format ngày giờ theo định dạng Việt Nam
     * VD: 14/12/2024, 18:30
     */
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    /**
     * Format giá tiền theo định dạng Việt Nam
     * VD: 500.000 VND
     */
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
    };

    /**
     * Lấy màu sắc cho badge trạng thái
     * Hoạt động: xanh lá | Tạm dừng: vàng | Đã hủy: đỏ
     */
    const getStatusColor = (status: TrainStatus) => {
        const colors = {
            'Hoạt động': 'bg-green-100 text-green-800',
            'Tạm dừng': 'bg-yellow-100 text-yellow-800',
            'Đã hủy': 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    // ====== RENDER UI ======
    return (
        <div className="max-w-7xl">
            {/* ====== HEADER SECTION ====== */}
            {/* Tiêu đề trang và nút thêm mới */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Chuyến tàu</h1>
                    <p className="text-gray-600 mt-1">
                        Tổng số: {filteredTrains.length} chuyến tàu
                    </p>
                </div>
                <Link
                    href="/admin/chuyen-tau/them-moi"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    Thêm chuyến tàu mới
                </Link>
            </div>

            {/* ====== SEARCH & FILTER SECTION ====== */}
            {/* Các bộ lọc: tìm kiếm, tuyến đường, trạng thái, ngày */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Ô tìm kiếm theo mã hoặc tên chuyến tàu */}
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã hoặc tên..."
                        value={filters.searchKeyword || ''}
                        onChange={(e) => setFilters({ ...filters, searchKeyword: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Dropdown lọc theo tuyến đường */}
                    <select
                        value={filters.route || ''}
                        onChange={(e) => setFilters({ ...filters, route: e.target.value || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả tuyến đường</option>
                        {availableRoutes.map((route) => (
                            <option key={route} value={route}>
                                {route}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown lọc theo trạng thái (Hoạt động, Tạm dừng, Đã hủy) */}
                    <select
                        value={filters.status || ''}
                        onChange={(e) => setFilters({ ...filters, status: (e.target.value as TrainStatus) || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Tạm dừng">Tạm dừng</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>

                    {/* Date picker lọc theo ngày khởi hành */}
                    <input
                        type="date"
                        value={filters.departureDate || ''}
                        onChange={(e) => setFilters({ ...filters, departureDate: e.target.value || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Nút xóa bộ lọc - chỉ hiện khi có ít nhất 1 filter active */}
                {(filters.searchKeyword || filters.route || filters.status || filters.departureDate) && (
                    <button
                        onClick={() => setFilters({})}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ✕ Xóa bộ lọc
                    </button>
                )}
            </div>

            {/* ====== DATA TABLE SECTION ====== */}
            {/* Bảng hiển thị danh sách chuyến tàu */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Table Header - Tiêu đề các cột */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên chuyến tàu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tuyến đường
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khởi hành
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ghế
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        {/* Table Body - Dữ liệu chuyến tàu */}
                        <tbody className="divide-y divide-gray-200">
                            {/* Hiển thị thông báo nếu không có kết quả */}
                            {filteredTrains.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        Không tìm thấy chuyến tàu nào
                                    </td>
                                </tr>
                            ) : (
                                /* Render từng dòng chuyến tàu */
                                filteredTrains.map((train) => (
                                    <tr key={train.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{train.code}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{train.name}</div>
                                            <div className="text-sm text-gray-500">{train.trainType}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{train.from} → {train.to}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDateTime(train.departureTime)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {train.availableSeats} / {train.totalSeats}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatPrice(train.basePrice)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
                                                {train.status}
                                            </span>
                                        </td>
                                        {/* Cột Actions: Chi tiết, Sửa, Xóa */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/chuyen-tau/${train.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    Chi tiết
                                                </Link>
                                                <Link
                                                    href={`/admin/chuyen-tau/${train.id}/sua`}
                                                    className="text-green-600 hover:text-green-700 font-medium"
                                                >
                                                    Sửa
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(train)}
                                                    className="text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ====== CONFIRM DELETE DIALOG ====== */}
            {/* Dialog xác nhận xóa chuyến tàu */}
            <ConfirmDialog
                isOpen={deleteTarget !== null}
                title="Xác nhận xóa chuyến tàu"
                message={`Bạn có chắc chắn muốn xóa chuyến tàu ${deleteTarget?.code}?`}
                confirmText="Xác nhận xóa"
                cancelText="Hủy"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
                type="danger"
            />

            {/* ====== TOAST NOTIFICATION ====== */}
            {/* Hiển thị thông báo thành công/lỗi */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => { }}
                />
            )}
        </div>
    );
}
