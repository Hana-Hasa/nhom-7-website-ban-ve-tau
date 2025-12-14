/**
 * TRANG QUẢN LÝ ĐƠN HÀNG
 * Hiển thị danh sách đơn hàng với:
 * - Thống kê: tổng đơn, chờ xử lý, đã xác nhận, hoàn thành, doanh thu
 * - Tìm kiếm và lọc: theo mã/tên, trạng thái đơn, trạng thái thanh toán, ngày
 * - Bảng danh sách đơn hàng với link xem chi tiết
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import { OrderFilters, OrderStatus, PaymentStatus } from '@/types/train';
import Toast from '@/components/admin/Toast';

export default function OrderListPage() {
    // Hook quản lý đơn hàng: danh sách orders, filter, stats, toast
    const { orders, filterOrders, stats, toast } = useOrderManagement();

    // State lưu bộ lọc hiện tại
    const [filters, setFilters] = useState<OrderFilters>({});

    // Danh sách đơn hàng sau khi filter
    const filteredOrders = filterOrders(filters);

    // ====== HELPER FUNCTIONS ======
    /** Format ngày giờ theo định dạng Việt Nam */
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

    /** Format giá tiền */
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
    };

    /** Lấy màu cho badge trạng thái đơn hàng */
    const getOrderStatusColor = (status: OrderStatus) => {
        const colors = {
            'Chờ xử lý': 'bg-yellow-100 text-yellow-800',
            'Đã xác nhận': 'bg-blue-100 text-blue-800',
            'Hoàn thành': 'bg-green-100 text-green-800',
            'Đã hủy': 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    /** Lấy màu cho badge trạng thái thanh toán */
    const getPaymentStatusColor = (status: PaymentStatus) => {
        const colors = {
            'Chưa thanh toán': 'bg-gray-100 text-gray-800',
            'Đã thanh toán': 'bg-green-100 text-green-800',
            'Hoàn tiền': 'bg-orange-100 text-orange-800',
        };
        return colors[status];
    };

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
                <p className="text-gray-600 mt-1">
                    Tổng số: {filteredOrders.length} đơn hàng
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Tổng đơn hàng</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-700">Chờ xử lý</div>
                    <div className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700">Đã xác nhận</div>
                    <div className="text-2xl font-bold text-blue-900 mt-1">{stats.confirmed}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700">Hoàn thành</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">{stats.completed}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700">Doanh thu</div>
                    <div className="text-xl font-bold text-purple-900 mt-1">
                        {(stats.totalRevenue / 1000000).toFixed(1)}M
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn hoặc tên khách..."
                        value={filters.searchKeyword || ''}
                        onChange={(e) => setFilters({ ...filters, searchKeyword: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Order Status */}
                    <select
                        value={filters.orderStatus || ''}
                        onChange={(e) => setFilters({ ...filters, orderStatus: (e.target.value as OrderStatus) || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả trạng thái đơn</option>
                        <option value="Chờ xử lý">Chờ xử lý</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>

                    {/* Payment Status */}
                    <select
                        value={filters.paymentStatus || ''}
                        onChange={(e) => setFilters({ ...filters, paymentStatus: (e.target.value as PaymentStatus) || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả trạng thái thanh toán</option>
                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                        <option value="Hoàn tiền">Hoàn tiền</option>
                    </select>

                    {/* Date Range Start */}
                    <input
                        type="date"
                        value={filters.startDate || ''}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value || undefined })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Từ ngày"
                    />
                </div>

                {/* Clear filters */}
                {(filters.searchKeyword || filters.orderStatus || filters.paymentStatus || filters.startDate) && (
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
                                    Mã đơn hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chuyến tàu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số vé
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thanh toán
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
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        Không tìm thấy đơn hàng nào
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{order.orderCode}</div>
                                            <div className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{order.customer.fullName}</div>
                                            <div className="text-sm text-gray-500">{order.customer.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{order.trainCode}</div>
                                            <div className="text-sm text-gray-500">{formatDateTime(order.departureTime)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-gray-900 font-medium">{order.tickets.length}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {formatPrice(order.totalAmount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/admin/don-hang/${order.id}`}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                            >
                                                Chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
