
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Mock Data for Features
const PROMOTIONS = [
    { code: 'SUMMER2025', discount: 50000, description: 'Giảm 50k cho hè rực rỡ' },
    { code: 'SV50', discount: 20000, description: 'Giảm 20k cho sinh viên' },
];

const RELATED_PRODUCTS = [
    { id: 'p1', name: 'Bánh mì kẹp thịt', price: 25000, image: '🥖' },
    { id: 'p2', name: 'Nước suối Aquafina', price: 10000, image: '💧' },
    { id: 'p3', name: 'Cà phê sữa đá', price: 15000, image: '☕' },
];

export default function PaymentPage() {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        citizenId: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('banking');
    const [isProcessing, setIsProcessing] = useState(false);

    // New Features State
    const [promoCode, setPromoCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState<{ product: typeof RELATED_PRODUCTS[0], quantity: number }[]>([]);

    // Calculate Totals
    const ticketTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const subTotal = ticketTotal + addonsTotal;
    const finalTotal = Math.max(0, subTotal - appliedDiscount);

    if (cartItems.length === 0 && selectedAddons.length === 0) {
        return (
            <div className="min-h-screen bg-[#E6F2FF] py-12 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <h2 className="text-xl font-bold text-[#003366] mb-2">Giỏ hàng trống</h2>
                    <p className="text-gray-600 mb-6">Bạn không có vé nào để thanh toán.</p>
                    <Link href="/" className="inline-block bg-[#CC0000] text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyPromo = (code: string) => {
        const promo = PROMOTIONS.find(p => p.code === code);
        if (promo) {
            setAppliedDiscount(promo.discount);
            alert(`Áp dụng mã ${code} thành công!`);
        } else if (code === 'KMRIENG123') {
            setAppliedDiscount(100000);
            alert('Áp dụng mã khuyến mãi riêng thành công!');
        } else {
            alert('Mã khuyến mãi không hợp lệ');
            setAppliedDiscount(0);
        }
    };

    const handleAddAddon = (product: typeof RELATED_PRODUCTS[0]) => {
        setSelectedAddons(prev => {
            const existing = prev.find(p => p.product.id === product.id);
            if (existing) {
                return prev.map(p => p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const handleRemoveAddon = (productId: string) => {
        setSelectedAddons(prev => prev.filter(p => p.product.id !== productId));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Đặt vé thành công! Mã đặt chỗ của bạn là: VE-123456');
        clearCart();
        // In a real app, we would also save the addons order
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#E6F2FF] py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-bold text-[#003366] mb-6 text-center md:text-left">
                    Thanh toán & Đặt vé
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Passenger Info */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#003366]">
                            <h2 className="text-xl font-bold text-[#003366] mb-4 flex items-center gap-2">
                                <span className="bg-[#003366] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                Thông tin người đặt vé
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#003366] ring-1 ring-transparent focus:ring-[#003366]"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#003366] ring-1 ring-transparent focus:ring-[#003366]"
                                        placeholder="0912345678"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#003366] ring-1 ring-transparent focus:ring-[#003366]"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Số CMND/CCCD *</label>
                                    <input
                                        type="text"
                                        name="citizenId"
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#003366] ring-1 ring-transparent focus:ring-[#003366]"
                                        placeholder="12 số"
                                        value={formData.citizenId}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Related Products - UPSell */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                            <h2 className="text-xl font-bold text-[#003366] mb-4 flex items-center gap-2">
                                <span className="text-xl">🍔</span>
                                Sản phẩm nên mua kèm
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {RELATED_PRODUCTS.map(product => (
                                    <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                        <div className="text-4xl mb-2">{product.image}</div>
                                        <h4 className="font-bold text-gray-800">{product.name}</h4>
                                        <p className="text-[#CC0000] font-bold mt-1">{product.price.toLocaleString()}đ</p>
                                        <button
                                            type="button"
                                            onClick={() => handleAddAddon(product)}
                                            className="mt-3 text-sm bg-blue-50 text-[#003366] px-4 py-2 rounded-full hover:bg-blue-100 font-bold transition-colors"
                                        >
                                            + Thêm
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#CC0000]">
                            <h2 className="text-xl font-bold text-[#003366] mb-4 flex items-center gap-2">
                                <span className="bg-[#CC0000] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                Phương thức thanh toán
                            </h2>

                            <div className="space-y-4">
                                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors bg-[#E6F2FF] border-[#003366]">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="banking"
                                        checked={paymentMethod === 'banking'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-5 w-5 text-[#003366]"
                                    />
                                    <div className="ml-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-gray-800">Chuyển khoản Ngân hàng (QR Code)</span>
                                    </div>
                                </label>

                                {/* Bank Transfer Details */}
                                {paymentMethod === 'banking' && (
                                    <div className="ml-9 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 animate-fadeIn">
                                        <p className="text-sm text-gray-600 mb-4">Vui lòng chuyển khoản theo thông tin dưới đây để hoàn tất đặt vé:</p>
                                        <div className="border border-gray-200 bg-white p-4 rounded-md">
                                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                    [QR Code]
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    <p><span className="text-gray-500 w-24 inline-block">Ngân hàng:</span> <span className="font-bold">Vietcombank</span></p>
                                                    <p><span className="text-gray-500 w-24 inline-block">Số tài khoản:</span> <span className="font-bold text-[#CC0000] text-lg">0123456789</span></p>
                                                    <p><span className="text-gray-500 w-24 inline-block">Chủ tài khoản:</span> <span className="font-bold">CTY CP VT DS VN</span></p>
                                                    <p><span className="text-gray-500 w-24 inline-block">Nội dung:</span> <span className="font-bold text-blue-600">DATVE {Date.now().toString().slice(-6)}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                            <h3 className="font-bold text-[#003366] text-lg mb-4 border-b pb-2">Tóm tắt đơn hàng</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start text-sm group">
                                        <div>
                                            <span className="font-bold block text-gray-700">Ghế {item.seatNumber}</span>
                                            <span className="text-xs text-gray-500">{item.coachName} - Tàu {item.trainId}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-[#CC0000]">{item.price.toLocaleString()}đ</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* Addons */}
                                {selectedAddons.map((addon) => (
                                    <div key={addon.product.id} className="flex justify-between items-start text-sm border-t pt-2 border-dashed">
                                        <div>
                                            <span className="font-bold block text-gray-700">{addon.product.name} (x{addon.quantity})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-600">{(addon.product.price * addon.quantity).toLocaleString()}đ</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAddon(addon.product.id)}
                                                className="text-gray-300 hover:text-red-500"
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Promotions */}
                            <div className="mb-6 pt-4 border-t border-gray-200">
                                <h4 className="font-bold text-[#003366] text-sm mb-2">Mã khuyến mãi</h4>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full text-sm uppercase"
                                        placeholder="Mã giảm giá"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleApplyPromo(promoCode)}
                                        className="bg-[#003366] text-white px-3 rounded text-sm whitespace-nowrap"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                                {/* Frequent Promos */}
                                <div className="flex flex-wrap gap-2">
                                    {PROMOTIONS.map(p => (
                                        <button
                                            key={p.code}
                                            type="button"
                                            onClick={() => handleApplyPromo(p.code)}
                                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-200 hover:bg-yellow-200"
                                            title={p.description}
                                        >
                                            {p.code}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-2 text-sm">
                                    <span className="text-gray-600">Tạm tính:</span>
                                    <span className="font-bold">{subTotal.toLocaleString()}đ</span>
                                </div>
                                {appliedDiscount > 0 && (
                                    <div className="flex justify-between items-center mb-2 text-sm text-green-600">
                                        <span>Giảm giá:</span>
                                        <span className="font-bold">-{appliedDiscount.toLocaleString()}đ</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-6 pt-2 border-t border-dashed">
                                    <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                                    <span className="text-2xl font-bold text-[#CC0000]">{finalTotal.toLocaleString()}đ</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full bg-[#CC0000] text-white font-bold py-3 px-4 rounded-lg shadow transition-all ${isProcessing ? 'opacity-70 cursor-wait' : 'hover:bg-red-700'}`}
                                >
                                    {isProcessing ? 'Đang xử lý...' : 'Hoàn tất đặt vé'}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-3">
                                    Bằng cách nhấn nút này, bạn đồng ý với các điều khoản của chúng tôi.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Mobile Sticky Button */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg z-50">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-bold text-[#CC0000] text-xl">{finalTotal.toLocaleString()}đ</span>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full bg-[#CC0000] text-white font-bold py-3 rounded-lg"
                >
                    {isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay'}
                </button>
            </div>
            <div className="h-24 md:hidden"></div>
        </div>
    );
}
