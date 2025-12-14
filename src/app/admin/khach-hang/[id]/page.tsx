'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useOrderContext } from '@/context/OrderContext';

export default function CustomerDetailPage() {
    const params = useParams();
    const customerId = params?.id as string;
    const { orders } = useOrderContext();

    const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'stats'>('info');

    // Find customer and their orders
    const { customer, customerOrders } = useMemo(() => {
        const customerOrders = orders.filter(o => o.customer.id === customerId);
        const customer = customerOrders[0]?.customer;
        return { customer, customerOrders };
    }, [orders, customerId]);

    if (!customer) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Không tìm thấy khách hàng</p>
                <Link href="/admin/khach-hang" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
                    ← Quay lại danh sách
                </Link>
            </div>
        );
    }

    const stats = {
        totalOrders: customerOrders.length,
        totalSpending: customerOrders
            .filter(o => o.paymentStatus === 'Đã thanh toán')
            .reduce((sum, o) => sum + o.totalAmount, 0),
        completedOrders: customerOrders.filter(o => o.orderStatus === 'Hoàn thành').length,
        cancelledOrders: customerOrders.filter(o => o.orderStatus === 'Đã hủy').length,
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN', {
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

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link href="/admin/khach-hang" className="hover:text-blue-600">
                        Quản lý Khách hàng
                    </Link>
                    <span>/</span>
                    <span>{customer.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{customer.fullName}</h1>
                        <p className="text-gray-600 mt-1">Mã: {customer.id}</p>
                    </div>
                    <Link
                        href={`/admin/khach-hang/${customerId}/sua`}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Sửa thông tin
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                    {[
                        { key: 'info' as const, label: 'Thông tin cá nhân', icon: '👤' },
                        { key: 'orders' as const, label: 'Lịch sử đơn hàng', icon: '📦' },
                        { key: 'stats' as const, label: 'Thống kê', icon: '📊' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === tab.key
                                    ? 'border-blue-600 text-blue-600 font-medium'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Thông tin cá nhân */}
                {activeTab === 'info' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Họ và tên</h3>
                            <p className="text-lg text-gray-900">{customer.fullName}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                            <p className="text-lg text-gray-900">{customer.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Số điện thoại</h3>
                            <p className="text-lg text-gray-900">{customer.phone}</p>
                        </div>
                        {customer.idNumber && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">CCCD/CMND</h3>
                                <p className="text-lg text-gray-900">{customer.idNumber}</p>
                            </div>
                        )}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Trạng thái tài khoản</h3>
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Hoạt động
                            </span>
                        </div>
                    </div>
                )}

                {/* Lịch sử đơn hàng */}
                {activeTab === 'orders' && (
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4">
                            Tổng số: {customerOrders.length} đơn hàng
                        </h3>
                        {customerOrders.length === 0 ? (
                            <p className="text-center py-12 text-gray-500">Chưa có đơn hàng nào</p>
                        ) : (
                            <div className="space-y-3">
                                {customerOrders.map((order) => (
                                    <div key={order.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-gray-900">{order.orderCode}</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                Chuyến tàu: {order.trainCode} - {order.trainName}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Ngày đặt: {formatDateTime(order.createdAt)}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'Chờ xử lý'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : order.orderStatus === 'Đã xác nhận'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : order.orderStatus === 'Hoàn thành'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'Đã thanh toán'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">{formatPrice(order.totalAmount)}</div>
                                            <Link
                                                href={`/admin/don-hang/${order.id}`}
                                                className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
                                            >
                                                Xem chi tiết →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Thống kê */}
                {activeTab === 'stats' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-600 mb-1">Tổng đơn hàng</h3>
                            <p className="text-3xl font-bold text-blue-900">{stats.totalOrders}</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <h3 className="text-sm font-medium text-purple-600 mb-1">Tổng chi tiêu</h3>
                            <p className="text-3xl font-bold text-purple-900">{formatPrice(stats.totalSpending)}</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-lg">
                            <h3 className="text-sm font-medium text-green-600 mb-1">Đơn hoàn thành</h3>
                            <p className="text-3xl font-bold text-green-900">{stats.completedOrders}</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-lg">
                            <h3 className="text-sm font-medium text-red-600 mb-1">Đơn đã hủy</h3>
                            <p className="text-3xl font-bold text-red-900">{stats.cancelledOrders}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
