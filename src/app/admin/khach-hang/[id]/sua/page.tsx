'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrderContext } from '@/context/OrderContext';
import Toast from '@/components/admin/Toast';

export default function EditCustomerPage() {
    const params = useParams();
    const router = useRouter();
    const customerId = params?.id as string;
    const { orders, setOrders } = useOrderContext();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        idNumber: '',
    });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const customerOrders = orders.filter(o => o.customer.id === customerId);
        const customer = customerOrders[0]?.customer;
        if (customer) {
            setFormData({
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone,
                idNumber: customer.idNumber || '',
            });
        }
    }, [orders, customerId]);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update all orders with this customer
        const updatedOrders = orders.map(order => {
            if (order.customer.id === customerId) {
                return {
                    ...order,
                    customer: {
                        ...order.customer,
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        idNumber: formData.idNumber || undefined,
                    },
                };
            }
            return order;
        });

        setOrders(updatedOrders);
        showToast('Cập nhật thông tin khách hàng thành công', 'success');

        // Redirect after short delay
        setTimeout(() => {
            router.push(`/admin/khach-hang/${customerId}`);
        }, 1000);
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link href="/admin/khach-hang" className="hover:text-blue-600">
                        Quản lý Khách hàng
                    </Link>
                    <span>/</span>
                    <Link href={`/admin/khach-hang/${customerId}`} className="hover:text-blue-600">
                        Chi tiết
                    </Link>
                    <span>/</span>
                    <span>Chỉnh sửa</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa thông tin khách hàng</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CCCD/CMND
                        </label>
                        <input
                            type="text"
                            value={formData.idNumber}
                            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Link
                        href={`/admin/khach-hang/${customerId}`}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>

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
