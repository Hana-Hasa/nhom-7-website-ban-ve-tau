'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useOrderContext } from '@/context/OrderContext';
import { Customer } from '@/types/train';

type CustomerStatus = 'Hoạt động' | 'Bị khóa';

interface CustomerWithStats extends Customer {
    registeredAt: string;
    totalOrders: number;
    totalSpending: number;
    status: CustomerStatus;
}

export default function CustomerListPage() {
    const { orders } = useOrderContext();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | ''>('');

    // Calculate customer stats from orders
    const customersWithStats = useMemo((): CustomerWithStats[] => {
        const customerMap = new Map<string, CustomerWithStats>();

        orders.forEach(order => {
            const { customer } = order;
            if (!customerMap.has(customer.id)) {
                customerMap.set(customer.id, {
                    ...customer,
                    registeredAt: '2025-11-01T00:00:00', // Mock
                    totalOrders: 0,
                    totalSpending: 0,
                    status: 'Hoạt động' as CustomerStatus,
                });
            }

            const customerStats = customerMap.get(customer.id)!;
            customerStats.totalOrders += 1;
            if (order.paymentStatus === 'Đã thanh toán') {
                customerStats.totalSpending += order.totalAmount;
            }
        });

        return Array.from(customerMap.values());
    }, [orders]);

    // Filter customers
    const filteredCustomers = customersWithStats.filter(customer => {
        if (searchKeyword) {
            const keyword = searchKeyword.toLowerCase();
            if (
                !customer.id.toLowerCase().includes(keyword) &&
                !customer.fullName.toLowerCase().includes(keyword) &&
                !customer.email.toLowerCase().includes(keyword) &&
                !customer.phone.includes(keyword)
            ) {
                return false;
            }
        }

        if (statusFilter && customer.status !== statusFilter) {
            return false;
        }

        return true;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Khách hàng</h1>
                <p className="text-gray-600 mt-1">
                    Tổng số: {filteredCustomers.length} khách hàng
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">Tổng khách hàng</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{customersWithStats.length}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700">Hoạt động</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                        {customersWithStats.filter(c => c.status === 'Hoạt động').length}
                    </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700">Tổng đơn hàng</div>
                    <div className="text-2xl font-bold text-blue-900 mt-1">
                        {customersWithStats.reduce((sum, c) => sum + c.totalOrders, 0)}
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700">Doanh thu</div>
                    <div className="text-xl font-bold text-purple-900 mt-1">
                        {(customersWithStats.reduce((sum, c) => sum + c.totalSpending, 0) / 1000000).toFixed(1)}M
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Tìm theo mã, tên, email, SĐT..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | '')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Bị khóa">Bị khóa</option>
                    </select>

                    {(searchKeyword || statusFilter) && (
                        <button
                            onClick={() => {
                                setSearchKeyword('');
                                setStatusFilter('');
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium text-left"
                        >
                            ✕ Xóa bộ lọc
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã KH
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Họ và tên
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số điện thoại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đăng ký
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đơn hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng chi tiêu
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
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                        Không tìm thấy khách hàng nào
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{customer.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{customer.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{customer.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-900">{customer.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(customer.registeredAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-medium text-gray-900">{customer.totalOrders}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {formatPrice(customer.totalSpending)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${customer.status === 'Hoạt động'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/khach-hang/${customer.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                >
                                                    Xem
                                                </Link>
                                                <Link
                                                    href={`/admin/khach-hang/${customer.id}/sua`}
                                                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                                                >
                                                    Sửa
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
