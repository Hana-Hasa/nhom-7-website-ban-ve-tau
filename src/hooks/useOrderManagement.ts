/**
 * HOOK: useOrderManagement
 * Hook quản lý đơn hàng:
 * - Get order by ID/code
 * - Confirm, Cancel order
 * - Print ticket (mock PDF)
 * - Filter orders (search, status, payment, date, train)
 * - Statistics (total, pending, confirmed, completed, cancelled, revenue)
 * - Toast notifications + Activity logging
 * 
 * @return { orders, getOrderById, confirmOrder, cancelOrder, printTicket,
 *           filterOrders, stats, toast }
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { useOrderContext } from '@/context/OrderContext';
import { useTrainContext } from '@/context/TrainContext';
import { Order, OrderFilters, OrderStatus, PaymentStatus } from '@/types/train';

export function useOrderManagement() {
    const { orders, setOrders } = useOrderContext();
    const { addActivityLog } = useTrainContext();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    // Show toast notification
    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Get order by ID
    const getOrderById = useCallback(
        (id: string): Order | undefined => {
            return orders.find((order) => order.id === id);
        },
        [orders]
    );

    // Get order by code
    const getOrderByCode = useCallback(
        (code: string): Order | undefined => {
            return orders.find((order) => order.orderCode === code);
        },
        [orders]
    );

    // Confirm order
    const confirmOrder = useCallback(
        (id: string): { success: boolean; message: string } => {
            const order = getOrderById(id);
            if (!order) {
                return { success: false, message: 'Không tìm thấy đơn hàng' };
            }

            // Validation: Must be paid
            if (order.paymentStatus !== 'Đã thanh toán') {
                return { success: false, message: 'Không thể xác nhận đơn hàng chưa thanh toán' };
            }

            // Validation: Must be pending
            if (order.orderStatus !== 'Chờ xử lý') {
                return { success: false, message: 'Chỉ có thể xác nhận đơn hàng đang chờ xử lý' };
            }

            const updatedOrder: Order = {
                ...order,
                orderStatus: 'Đã xác nhận',
                confirmedAt: new Date().toISOString(),
            };

            const updatedOrders = orders.map((o) => (o.id === id ? updatedOrder : o));
            setOrders(updatedOrders);

            addActivityLog({
                action: 'confirmed_order',
                entityType: 'train', // Using train as we don't have order entity type yet
                entityId: id,
                description: `Admin đã xác nhận đơn hàng ${order.orderCode}`,
                adminName: 'Admin',
                details: { orderCode: order.orderCode, trainCode: order.trainCode },
            });

            // Mock email sending
            console.log(`📧 Email xác nhận đơn hàng gửi đến ${order.customer.email}`);

            showToast('Xác nhận đơn hàng thành công', 'success');
            return { success: true, message: 'Xác nhận đơn hàng thành công' };
        },
        [orders, setOrders, addActivityLog, getOrderById, showToast]
    );

    // Cancel order
    const cancelOrder = useCallback(
        (id: string, reason: string): { success: boolean; message: string } => {
            const order = getOrderById(id);
            if (!order) {
                return { success: false, message: 'Không tìm thấy đơn hàng' };
            }

            // Validation: Cannot cancel completed orders
            if (order.orderStatus === 'Hoàn thành') {
                return { success: false, message: 'Không thể hủy đơn hàng đã hoàn thành' };
            }

            // Validation: Reason required
            if (!reason.trim()) {
                return { success: false, message: 'Vui lòng nhập lý do hủy' };
            }

            const updatedOrder: Order = {
                ...order,
                orderStatus: 'Đã hủy',
                cancelledAt: new Date().toISOString(),
                cancelReason: reason,
                paymentStatus: order.paymentStatus === 'Đã thanh toán' ? 'Hoàn tiền' : order.paymentStatus,
            };

            const updatedOrders = orders.map((o) => (o.id === id ? updatedOrder : o));
            setOrders(updatedOrders);

            addActivityLog({
                action: 'cancelled_order',
                entityType: 'train',
                entityId: id,
                description: `Admin đã hủy đơn hàng ${order.orderCode} - ${reason}`,
                adminName: 'Admin',
                details: { orderCode: order.orderCode, reason },
            });

            // Mock email sending
            console.log(`📧 Email thông báo hủy đơn gửi đến ${order.customer.email}`);

            // TODO: Restore seats to train (would need integration with TrainContext)
            console.log(`🪑 Hoàn lại ${order.tickets.length} ghế cho chuyến tàu ${order.trainCode}`);

            showToast('Hủy đơn hàng thành công', 'success');
            return { success: true, message: 'Hủy đơn hàng thành công' };
        },
        [orders, setOrders, addActivityLog, getOrderById, showToast]
    );

    // Print ticket (mock PDF generation)
    const printTicket = useCallback(
        (id: string): { success: boolean; message: string; pdfData?: any } => {
            const order = getOrderById(id);
            if (!order) {
                return { success: false, message: 'Không tìm thấy đơn hàng' };
            }

            // Validation: Must be confirmed
            if (order.orderStatus !== 'Đã xác nhận' && order.orderStatus !== 'Hoàn thành') {
                return { success: false, message: 'Chỉ có thể in vé cho đơn hàng đã xác nhận' };
            }

            // Mock PDF data
            const pdfData = {
                orderCode: order.orderCode,
                customer: order.customer,
                train: {
                    code: order.trainCode,
                    name: order.trainName,
                    departureTime: order.departureTime,
                },
                tickets: order.tickets,
                totalAmount: order.totalAmount,
                qrCodes: order.tickets.map(t => t.qrCode),
            };

            addActivityLog({
                action: 'printed_ticket',
                entityType: 'train',
                entityId: id,
                description: `Admin đã in vé cho đơn hàng ${order.orderCode}`,
                adminName: 'Admin',
            });

            console.log('🖨️ In vé điện tử:', pdfData);
            showToast('Tạo file vé thành công', 'success');

            return { success: true, message: 'Tạo file vé thành công', pdfData };
        },
        [getOrderById, addActivityLog, showToast]
    );

    // Filter orders
    const filterOrders = useCallback(
        (filters: OrderFilters): Order[] => {
            return orders.filter((order) => {
                // Search by keyword (order code or customer name)
                if (filters.searchKeyword) {
                    const keyword = filters.searchKeyword.toLowerCase();
                    if (
                        !order.orderCode.toLowerCase().includes(keyword) &&
                        !order.customer.fullName.toLowerCase().includes(keyword)
                    ) {
                        return false;
                    }
                }

                // Filter by order status
                if (filters.orderStatus && order.orderStatus !== filters.orderStatus) {
                    return false;
                }

                // Filter by payment status
                if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
                    return false;
                }

                // Filter by date range
                if (filters.startDate) {
                    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
                    if (orderDate < filters.startDate) {
                        return false;
                    }
                }

                if (filters.endDate) {
                    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
                    if (orderDate > filters.endDate) {
                        return false;
                    }
                }

                // Filter by train
                if (filters.trainId && order.trainId !== filters.trainId) {
                    return false;
                }

                return true;
            });
        },
        [orders]
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            total: orders.length,
            pending: orders.filter(o => o.orderStatus === 'Chờ xử lý').length,
            confirmed: orders.filter(o => o.orderStatus === 'Đã xác nhận').length,
            completed: orders.filter(o => o.orderStatus === 'Hoàn thành').length,
            cancelled: orders.filter(o => o.orderStatus === 'Đã hủy').length,
            totalRevenue: orders
                .filter(o => o.paymentStatus === 'Đã thanh toán')
                .reduce((sum, o) => sum + o.totalAmount, 0),
        };
    }, [orders]);

    return {
        orders,
        getOrderById,
        getOrderByCode,
        confirmOrder,
        cancelOrder,
        printTicket,
        filterOrders,
        stats,
        toast,
        showToast,
    };
}
