'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTrainManagement } from '@/hooks/useTrainManagement';
import { Train, TrainFilters, TrainStatus } from '@/types/train';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

export default function TrainListPage() {
    const { trains, deleteTrain, filterTrains, availableRoutes, toast, showToast } = useTrainManagement();

    const [filters, setFilters] = useState<TrainFilters>({});
    const [deleteTarget, setDeleteTarget] = useState<Train | null>(null);

    const filteredTrains = filterTrains(filters);

    const handleDelete = (train: Train) => {
        setDeleteTarget(train);
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            const result = deleteTrain(deleteTarget.id);
            if (!result.success) {
                showToast(result.message, 'error');
            }
            setDeleteTarget(null);
        }
    };

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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
    };

    const getStatusColor = (status: TrainStatus) => {
        const colors = {
            'Hoạt động': 'bg-green-100 text-green-800',
            'Tạm dừng': 'bg-yellow-100 text-yellow-800',
            'Đã hủy': 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    return (
        <div className="max-w-7xl">
            {/* Header */}
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

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã hoặc tên..."
                        value={filters.searchKeyword || ''}
                        onChange={(e) => setFilters({ ...filters, searchKeyword: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Route filter */}
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

                    {/* Status filter */}
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

                    {/* Date filter */}
                    <input
                        type="date"
                        value={filters.departureDate || ''}
                        onChange={(e) => setFilters({ ...filters, departureDate: e.target.value || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Clear filters */}
                {(filters.searchKeyword || filters.route || filters.status || filters.departureDate) && (
                    <button
                        onClick={() => setFilters({})}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ✕ Xóa bộ lọc
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
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
                        <tbody className="divide-y divide-gray-200">
                            {filteredTrains.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        Không tìm thấy chuyến tàu nào
                                    </td>
                                </tr>
                            ) : (
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

            {/* Confirm Delete Dialog */}
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

            {/* Toast */}
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
