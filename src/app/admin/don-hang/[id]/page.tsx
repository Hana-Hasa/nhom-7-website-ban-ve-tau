'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;

    const { getOrderById, confirmOrder, cancelOrder, printTicket, toast, showToast } = useOrderManagement();
    const order = getOrderById(orderId);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    if (!order) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Không tìm thấy đơn hàng</p>
                <Link href="/admin/don-hang" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
                    ← Quay lại danh sách
                </Link>
            </div>
        );
    }

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

    const handleConfirm = () => {
        const result = confirmOrder(orderId);
        if (!result.success) {
            showToast(result.message, 'error');
        }
        setShowConfirmDialog(false);
    };

    const handleCancel = () => {
        if (!cancelReason.trim()) {
            showToast('Vui lòng nhập lý do hủy', 'error');
            return;
        }
        const result = cancelOrder(orderId, cancelReason);
        if (!result.success) {
            showToast(result.message, 'error');
        }
        setShowCancelDialog(false);
        setCancelReason('');
    };

    const handlePrint = () => {
        const result = printTicket(orderId);
        if (result.success && result.pdfData) {
            console.log('PDF Data:', result.pdfData);
            // In real app, would trigger PDF download
            showToast('Tạo file vé thành công. Kiểm tra console để xem dữ liệu PDF mock.', 'success');
        } else {
            showToast(result.message, 'error');
        }
    };

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link href="/admin/don-hang" className="hover:text-blue-600">
                        Quản lý Đơn hàng
                    </Link>
                    <span>/</span>
                    <span>{order.orderCode}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
                        <p className="text-gray-600 mt-1">Mã: {order.orderCode}</p>
                    </div>
                    <div className="flex gap-3">
                        {order.orderStatus === 'Chờ xử lý' && order.paymentStatus === 'Đã thanh toán' && (
                            <button
                                onClick={() => setShowConfirmDialog(true)}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Xác nhận đơn
                            </button>
                        )}
                        {(order.orderStatus === 'Đã xác nhận' || order.orderStatus === 'Hoàn thành') && (
                            <button
                                onClick={handlePrint}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                In vé
                            </button>
                        )}
                        {order.orderStatus !== 'Hoàn thành' && order.orderStatus !== 'Đã hủy' && (
                            <button
                                onClick={() => setShowCancelDialog(true)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Hủy đơn
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin đơn hàng</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Mã đơn hàng</div>
                                <div className="font-medium text-gray-900">{order.orderCode}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Ngày đặt</div>
                                <div className="font-medium text-gray-900">{formatDateTime(order.createdAt)}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Trạng thái đơn hàng</div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === 'Chờ xử lý' ? 'bg-yellow-100 text-yellow-800' :
                                        order.orderStatus === 'Đã xác nhận' ? 'bg-blue-100 text-blue-800' :
                                            order.orderStatus === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                    }`}>
                                    {order.orderStatus}
                                </span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Trạng thái thanh toán</div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'Chưa thanh toán' ? 'bg-gray-100 text-gray-800' :
                                        order.paymentStatus === 'Đã thanh toán' ? 'bg-green-100 text-green-800' :
                                            'bg-orange-100 text-orange-800'
                                    }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                            {order.confirmedAt && (
                                <div>
                                    <div className="text-sm text-gray-600">Ngày xác nhận</div>
                                    <div className="font-medium text-gray-900">{formatDateTime(order.confirmedAt)}</div>
                                </div>
                            )}
                            {order.cancelledAt && (
                                <div>
                                    <div className="text-sm text-gray-600">Ngày hủy</div>
                                    <div className="font-medium text-gray-900">{formatDateTime(order.cancelledAt)}</div>
                                </div>
                            )}
                        </div>
                        {order.cancelReason && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                <div className="text-sm font-medium text-red-800">Lý do hủy:</div>
                                <div className="text-sm text-red-700 mt-1">{order.cancelReason}</div>
                            </div>
                        )}
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin khách hàng</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Họ và tên</div>
                                <div className="font-medium text-gray-900">{order.customer.fullName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Email</div>
                                <div className="font-medium text-gray-900">{order.customer.email}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Số điện thoại</div>
                                <div className="font-medium text-gray-900">{order.customer.phone}</div>
                            </div>
                            {order.customer.idNumber && (
                                <div>
                                    <div className="text-sm text-gray-600">CCCD/CMND</div>
                                    <div className="font-medium text-gray-900">{order.customer.idNumber}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Train Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin chuyến tàu</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Mã chuyến tàu</div>
                                <div className="font-medium text-gray-900">{order.trainCode}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Tên chuyến tàu</div>
                                <div className="font-medium text-gray-900">{order.trainName}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-sm text-gray-600">Thời gian khởi hành</div>
                                <div className="font-medium text-gray-900">{formatDateTime(order.departureTime)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Tickets */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Danh sách vé ({order.tickets.length})</h2>
                        <div className="space-y-3">
                            {order.tickets.map((ticket, index) => (
                                <div key={ticket.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium text-gray-900">Vé #{index + 1} - {ticket.passengerName}</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                CCCD: {ticket.passengerIdNumber}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Toa {ticket.carriageNumber} - Ghế {ticket.seatNumber}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Loại vé: {ticket.ticketType}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">{formatPrice(ticket.price)}</div>
                                            {ticket.qrCode && (
                                                <div className="text-xs text-gray-500 mt-1">QR: {ticket.qrCode}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Payment Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Thanh toán</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Số lượng vé</span>
                                <span className="font-medium text-gray-900">{order.tickets.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phương thức</span>
                                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                                    <span className="text-xl font-bold text-blue-600">{formatPrice(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Xác nhận đơn hàng"
                message={`Bạn có chắc chắn muốn xác nhận đơn hàng ${order.orderCode}? Email xác nhận sẽ được gửi đến khách hàng.`}
                confirmText="Xác nhận"
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirmDialog(false)}
                type="info"
            />

            {/* Cancel Dialog */}
            {showCancelDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Hủy đơn hàng</h3>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do hủy <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="VD: Khách hàng yêu cầu hủy do thay đổi kế hoạch"
                        />
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowCancelDialog(false);
                                    setCancelReason('');
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
