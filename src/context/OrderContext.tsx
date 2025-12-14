'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '@/types/train';
import { initialOrderData } from '@/data/orderData';

interface OrderContextType {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
    isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'admin_orders_data';

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrdersState] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on mount
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

    // Save orders to localStorage whenever it changes
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

export function useOrderContext() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrderContext must be used within an OrderProvider');
    }
    return context;
}
