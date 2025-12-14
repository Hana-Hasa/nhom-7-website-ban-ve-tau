/**
 * CART CONTEXT - QUẢN LÝ GIỎ HÀNG
 * Context quản lý giỏ hàng vé tàu với các chức năng:
 * - Thêm/xóa vé vào giỏ hàng
 * - Lưu giỏ hàng vào localStorage (persist data)
 * - Clear toàn bộ giỏ hàng
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Interface CartItem - Thông tin một vé tàu trong giỏ hàng
 * Mỗi item đại diện cho một ghế được chọn
 */
export interface CartItem {
    id: string; // Composite key: trainId-coachId-seatId (unique identifier)
    seatNumber: number; // Số ghế
    seatType: string; // Loại ghế (VIP, thường, nằm...)
    price: number; // Giá vé
    trainId: string; // ID chuyến tàu
    departureStation: string; // Ga đi
    arrivalStation: string; // Ga đến
    departureTime: string; // Thời gian khởi hành
    coachId: number; // ID toa tàu
    coachName: string; // Tên toa tàu
}

/**
 * Interface CartContextType - API của Cart Context
 * Định nghĩa các functions và state có thể dùng từ context
 */
interface CartContextType {
    cartItems: CartItem[]; // Danh sách vé trong giỏ
    addToCart: (items: CartItem[]) => void; // Thêm vé vào giỏ
    removeFromCart: (itemId: string) => void; // Xóa vé khỏi giỏ
    clearCart: () => void; // Xóa toàn bộ giỏ hàng
    isLoading: boolean; // Loading state khi load từ localStorage
}

// Tạo Context với type undefined initially
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider Component
 * Provider bao bọc toàn bộ app để cung cấp cart state
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * useEffect: Load giỏ hàng từ localStorage khi component mount
     * Chỉ chạy 1 lần khi app khởi động
     */
    useEffect(() => {
        const savedCart = localStorage.getItem('train_booking_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart data:', error);
            }
        }
        setIsLoading(false);
    }, []);

    /**
     * useEffect: Tự động lưu giỏ hàng vào localStorage mỗi khi có thay đổi
     * Chỉ save sau khi đã load xong (isLoading = false)
     */
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('train_booking_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoading]);

    /**
     * Thêm vé vào giỏ hàng
     * - Filter ra các vé trùng lặp (dựa vào ID)
     * - Chỉ thêm vé chưa có trong giỏ
     */
    const addToCart = (newItems: CartItem[]) => {
        setCartItems((prevItems) => {
            const existingIds = new Set(prevItems.map((item) => item.id));
            const uniqueNewItems = newItems.filter((item) => !existingIds.has(item.id));
            return [...prevItems, ...uniqueNewItems];
        });
    };

    /**
     * Xóa vé khỏi giỏ hàng theo ID
     */
    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    /**
     * Xóa toàn bộ giỏ hàng (ví dụ sau khi thanh toán thành công)
     */
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isLoading }}>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook useCart
 * Dùng để access cart context từ bất kỳ component nào
 * Throw error nếu dùng ngoài CartProvider
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
