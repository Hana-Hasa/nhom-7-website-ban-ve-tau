/**
 * TRANG CHỦ ADMIN DASHBOARD
 * Trang tổng quan của hệ thống quản trị admin
 * Hiển thị các module chính và thống kê tổng quan
 */

'use client';

import Link from 'next/link';
import { useTrainContext } from '@/context/TrainContext';
import { useOrderContext } from '@/context/OrderContext';
import { useNews } from '@/context/NewsContext';

export default function AdminHomePage() {
    // Lấy dữ liệu từ các context để hiển thị thống kê
    const { trains } = useTrainContext();
    const { orders } = useOrderContext();
    const { news } = useNews();

    // Tính số lượng khách hàng unique từ orders
    const uniqueCustomers = new Set(orders.map(order => order.customer.email)).size;
    // Danh sách các module quản lý chính
    // Mỗi card đại diện cho một module (chuyến tàu, khách hàng, đơn hàng, tin tức)
    const cards = [
        {
            title: 'Quản lý Chuyến tàu',
            description: 'Xem, thêm, sửa, xóa chuyến tàu và quản lý toa tàu, ghế ngồi',
            href: '/admin/chuyen-tau', // Link đến trang quản lý chuyến tàu
            icon: '🚂',
            color: 'bg-blue-50 border-blue-200', // Màu nền và viền xanh dương
            textColor: 'text-blue-700', // Màu chữ xanh dương
        },
        {
            title: 'Quản lý Khách hàng',
            description: 'Quản lý thông tin khách hàng, xem lịch sử đặt vé',
            href: '/admin/khach-hang',
            icon: '👥',
            color: 'bg-green-50 border-green-200', // Màu nền và viền xanh lá
            textColor: 'text-green-700',
        },
        {
            title: 'Quản lý Đơn hàng',
            description: 'Xem và xử lý đơn hàng, xác nhận, hủy, hoàn tiền',
            href: '/admin/don-hang',
            icon: '📋',
            color: 'bg-purple-50 border-purple-200', // Màu nền và viền tím
            textColor: 'text-purple-700',
        },
        {
            title: 'Quản lý Tin tức',
            description: 'Quản lý bài viết, danh mục tin tức',
            href: '/admin/tin-tuc',
            icon: '📰',
            color: 'bg-orange-50 border-orange-200', // Màu nền và viền cam
            textColor: 'text-orange-700',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Section - Tiêu đề và mô tả trang */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Chào mừng đến Admin Panel
                </h1>
                <p className="text-gray-600">
                    Quản lý toàn bộ hệ thống website bán vé tàu
                </p>
            </div>

            {/* Module Cards Grid - Lưới các card module chính */}
            {/* Responsive: 1 cột trên mobile, 2 cột trên desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className={`block p-6 rounded-xl border-2 ${card.color} hover:shadow-lg transition-all duration-200 hover:scale-105`}
                    >
                        {/* Card Content - Icon, Title, Description và Arrow */}
                        <div className="flex items-start gap-4">
                            {/* Icon Module */}
                            <div className="text-4xl">{card.icon}</div>

                            {/* Nội dung Card */}
                            <div className="flex-1">
                                <h2 className={`text-xl font-bold ${card.textColor} mb-2`}>
                                    {card.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {card.description}
                                </p>
                            </div>

                            {/* Arrow Icon - Mũi tên chỉ hướng */}
                            <div className={card.textColor}>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Stats Section - Thống kê nhanh */}
            {/* Hiển thị tổng quan số liệu: chuyến tàu, khách hàng, đơn hàng, bài viết */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Thống kê Chuyến tàu */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Tổng chuyến tàu</div>
                    <div className="text-2xl font-bold text-gray-900">{trains.length}</div>
                </div>

                {/* Thống kê Khách hàng */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Khách hàng</div>
                    <div className="text-2xl font-bold text-gray-900">{uniqueCustomers}</div>
                </div>

                {/* Thống kê Đơn hàng */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Đơn hàng</div>
                    <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                </div>

                {/* Thống kê Bài viết */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Bài viết</div>
                    <div className="text-2xl font-bold text-gray-900">{news.length}</div>
                </div>
            </div>
        </div>
    );
}
