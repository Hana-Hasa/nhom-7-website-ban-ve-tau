/**
 * ORDER CONTEXT - QUẢN LÝ ĐƠN HÀNG
 * Context quản lý đơn hàng:
 * - Lưu trữ danh sách orders
 * - Sync với localStorage
 * - Cung cấp data cho trang admin quản lý đơn hàng
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '@/types/train';
import { initialOrderData } from '@/data/orderData';

/** Interface OrderContextType - API của Order Context */
interface OrderContextType {
    orders: Order[]; // Danh sách đơn hàng
    setOrders: (orders: Order[]) => void; // Cập nhật orders và lưu localStorage
    isLoading: boolean; // Loading state
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'admin_orders_data';

/**
 * OrderProvider Component
 * Provider bao bọc app để cung cấp order state
 */
export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrdersState] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * useEffect: Load orders từ localStorage khi mount
     * - Nếu có data: load lên
     * - Nếu chưa có: khởi tạo với initialOrderData (mock)
     */
    useEffect(() => {
        try {
            const storedOrders = localStorage.getItem(STORAGE_KEY);

            if (storedOrders) {
                setOrdersState(JSON.parse(storedOrders));
            } else {
                // Initialize with mock data if no stored data
                setOrdersState(initialOrderData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrderData));
            }
        } catch (error) {
            console.error('Error loading orders from localStorage:', error);
            setOrdersState(initialOrderData);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * setOrders - Cập nhật orders và tự động lưu vào localStorage
     * Dùng function này thay vì setOrdersState để đảm bảo sync
     */
    const setOrders = (newOrders: Order[]) => {
        setOrdersState(newOrders);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));
        } catch (error) {
            console.error('Error saving orders to localStorage:', error);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                setOrders,
                isLoading,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

/** Custom hook useOrderContext - Access order context */
export function useOrderContext() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrderContext must be used within an OrderProvider');
    }
    return context;
}
