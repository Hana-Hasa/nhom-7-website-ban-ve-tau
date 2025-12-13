
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string; // Composite key: trainId-coachId-seatId
    seatNumber: number;
    seatType: string;
    price: number;
    trainId: string;
    departureStation: string;
    arrivalStation: string;
    departureTime: string;
    coachId: number;
    coachName: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (items: CartItem[]) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
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

    // Save to localStorage whenever cart changes
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('train_booking_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoading]);

    const addToCart = (newItems: CartItem[]) => {
        setCartItems((prevItems) => {
            // Filter out duplicates (if any) based on composite ID
            const existingIds = new Set(prevItems.map((item) => item.id));
            const uniqueNewItems = newItems.filter((item) => !existingIds.has(item.id));
            return [...prevItems, ...uniqueNewItems];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isLoading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
