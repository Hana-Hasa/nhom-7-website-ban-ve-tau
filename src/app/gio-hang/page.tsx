
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#E6F2FF] py-12 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-xl font-bold text-[#003366] mb-2">Giỏ hàng của bạn đang trống</h2>
                    <p className="text-gray-600 mb-6">Bạn chưa chọn vé nào. Hãy tìm chuyến tàu phù hợp ngay nhé!</p>
                    <Link href="/" className="inline-block bg-[#CC0000] text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                        Tìm vé ngay
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E6F2FF] py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#003366]">Giỏ hàng của tôi ({cartItems.length})</h1>
                    <button
                        onClick={clearCart}
                        className="text-red-500 text-sm hover:underline"
                    >
                        Xóa tất cả
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 border-l-4 border-[#003366]">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#E6F2FF] text-[#003366] text-xs font-bold px-2 py-1 rounded">Tàu {item.trainId}</span>
                                        <span className="text-gray-500 text-sm">{item.departureTime}, Ngày 15/12/2025</span>
                                    </div>
                                    <h3 className="font-bold text-[#003366] text-lg">{item.departureStation} - {item.arrivalStation}</h3>
                                    <p className="text-sm text-gray-700 mt-1">
                                        Toa {item.coachName} - <span className="font-bold">Ghế {item.seatNumber}</span> - {item.seatType === 'Sleeper' ? 'Giường nằm' : 'Ghế mềm'}
                                    </p>
                                </div>
                                <div className="flex md:flex-col items-center justify-between md:items-end gap-2">
                                    <span className="font-bold text-[#CC0000] text-lg">{item.price.toLocaleString()}đ</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                        title="Xóa vé này"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                            <h3 className="font-bold text-[#003366] text-lg mb-4 border-b pb-2">Thông tin thanh toán</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">tạm tính:</span>
                                <span className="font-bold">{totalPrice.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Phí dịch vụ:</span>
                                <span className="font-bold">0đ</span>
                            </div>
                            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                                <span className="text-lg font-bold text-[#003366]">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-[#CC0000]">{totalPrice.toLocaleString()}đ</span>
                            </div>

                            <Link href="/thanh-toan" className="block w-full text-center bg-[#CC0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors mb-3">
                                Thanh toán ngay
                            </Link>
                            <Link href="/" className="block text-center text-[#003366] text-sm hover:underline">
                                Tiếp tục mua vé
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
