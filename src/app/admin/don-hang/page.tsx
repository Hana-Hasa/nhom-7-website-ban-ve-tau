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

            {/* ===== SECTION: BIỂU ĐỒ THỐNG KÊ DOANH THU THEO NGÀY =====
                - Hiển thị biểu đồ cột doanh thu 10 ngày gần nhất
                - Tự động tính toán từ danh sách đơn hàng đã filter
                - Chỉ tính đơn "Hoàn thành" và "Đã xác nhận"
                - Interactive tooltip khi hover */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thống kê doanh thu theo ngày</h2>

                {(() => {
                    // ===== BƯỚC 1: TÍNH TOÁN DOANH THU THEO NGÀY =====
                    // Tạo object để lưu doanh thu và số đơn hàng theo từng ngày
                    // Key: ngày (format: dd/mm), Value: { revenue: tổng tiền, count: số đơn }
                    const revenueByDate: { [date: string]: { revenue: number; count: number } } = {};

                    // Duyệt qua tất cả đơn hàng đã filter
                    filteredOrders.forEach(order => {
                        // Chỉ tính các đơn đã hoàn thành hoặc đã xác nhận
                        // Bỏ qua đơn "Chờ xử lý" và "Đã hủy"
                        if (order.orderStatus === 'Hoàn thành' || order.orderStatus === 'Đã xác nhận') {
                            // Format ngày theo chuẩn Việt Nam: dd/mm
                            const date = new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                            });

                            // Khởi tạo object cho ngày nếu chưa tồn tại
                            if (!revenueByDate[date]) {
                                revenueByDate[date] = { revenue: 0, count: 0 };
                            }

                            // Cộng dồn doanh thu và số đơn hàng
                            revenueByDate[date].revenue += order.totalAmount;
                            revenueByDate[date].count += 1;
                        }
                    });

                    // ===== BƯỚC 2: SẮP XẾP VÀ LẤY 10 NGÀY GẦN NHẤT =====
                    const chartData = Object.entries(revenueByDate)
                        .sort((a, b) => {
                            // Tách ngày và tháng từ chuỗi "dd/mm"
                            const [dayA, monthA] = a[0].split('/').map(Number);
                            const [dayB, monthB] = b[0].split('/').map(Number);
                            // Sắp xếp theo tháng, nếu cùng tháng thì sắp xếp theo ngày
                            return monthA === monthB ? dayA - dayB : monthA - monthB;
                        })
                        .slice(-10);  // Lấy 10 ngày cuối (mới nhất)

                    // ===== BƯỚC 3: TÌM GIÁ TRỊ MAX ĐỂ SCALE BIỂU ĐỒ =====
                    // Tìm doanh thu cao nhất để tính % chiều cao các cột
                    // Math.max(...arr, 1) đảm bảo min là 1 để tránh chia cho 0
                    const maxRevenue = Math.max(...chartData.map(([_, data]) => data.revenue), 1);

                    // ===== RENDER BIỂU ĐỒ HOẶC EMPTY STATE =====
                    return chartData.length > 0 ? (
                        <div className="space-y-4">
                            {/* ===== CONTAINER BIỂU ĐỒ =====
                                - h-64: Chiều cao cố định 256px
                                - flex items-end: Căn các cột xuống đáy (như trục X)
                                - gap-2: Khoảng cách 8px giữa các cột
                                - border-l-2 border-b-2: Vẽ trục Y và X */}
                            <div className="relative h-64 flex items-end gap-2 px-4 pb-8 border-l-2 border-b-2 border-gray-300">
                                {/* Duyệt qua dữ liệu từng ngày để render cột */}
                                {chartData.map(([date, data], index) => {
                                    // Tính % chiều cao cột dựa trên doanh thu so với max
                                    // VD: revenue = 1M, maxRevenue = 2M => heightPercent = 50%
                                    const heightPercent = (data.revenue / maxRevenue) * 100;

                                    return (
                                        <div
                                            key={index}
                                            className="flex-1 group relative flex flex-col items-center"
                                            style={{ height: '100%' }}
                                        >
                                            {/* ===== CỘT BIỂU ĐỒ (BAR) ===== */}
                                            <div className="w-full h-full flex items-end justify-center">
                                                <div
                                                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer relative"
                                                    style={{
                                                        height: `${heightPercent}%`,
                                                        minHeight: data.revenue > 0 ? '8px' : '0px'  // Min 8px để cột nhỏ vẫn visible
                                                    }}
                                                >
                                                    {/* ===== TOOLTIP - HIỂN THỊ KHI HOVER =====
                                                        - absolute bottom-full: Đặt phía trên cột
                                                        - opacity-0 group-hover:opacity-100: Ẩn/hiện khi hover vào cột
                                                        - pointer-events-none: Không block chuột, tránh flickering */}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                                                            {/* Ngày */}
                                                            <div className="font-semibold mb-1">{date}</div>
                                                            {/* Doanh thu - gọi hàm formatPrice để format VND */}
                                                            <div>Doanh thu: {formatPrice(data.revenue)}</div>
                                                            {/* Số đơn hàng */}
                                                            <div>Số đơn: {data.count}</div>

                                                            {/* Arrow pointing down - Tam giác CSS */}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                                                                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ===== NHÃN NGÀY (DATE LABEL) =====
                                                - absolute -bottom-6: Đặt dưới cột, ngoài border
                                                - whitespace-nowrap: Không wrap text */}
                                            <div className="text-xs text-gray-600 mt-2 absolute -bottom-6 whitespace-nowrap">
                                                {date}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* ===== TRỤC Y (Y-AXIS LABELS) =====
                                    - absolute left-0: Đặt bên trái biểu đồ
                                    - flex flex-col justify-between: Căn đều 3 nhãn (top, middle, bottom)
                                    - -ml-12: Margin âm để đẩy ra ngoài border */}
                                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 -ml-12">
                                    {/* Giá trị max (ở đỉnh) - format triệu VND */}
                                    <div>{(maxRevenue / 1000000).toFixed(1)}M</div>
                                    {/* Giá trị giữa (50% max) */}
                                    <div>{(maxRevenue / 2000000).toFixed(1)}M</div>
                                    {/* Giá trị 0 (ở đáy) */}
                                    <div>0</div>
                                </div>
                            </div>

                            {/* ===== LEGEND (CHÚ THÍCH) =====
                                - Hiển thị ý nghĩa màu sắc của biểu đồ */}
                            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    {/* Ô màu mẫu */}
                                    <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded"></div>
                                    {/* Text mô tả */}
                                    <span>Doanh thu (VND)</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ===== EMPTY STATE - KHÔNG CÓ DỮ LIỆU =====
                        // Hiển thị khi không có đơn hàng nào hoặc tất cả đơn bị filter out
                        <div className="text-center py-12 text-gray-500">
                            {/* Icon biểu đồ - SVG Heroicons */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            {/* Message */}
                            <p>Không có dữ liệu doanh thu</p>
                        </div>
                    );
                })()}
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
