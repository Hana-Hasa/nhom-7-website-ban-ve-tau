
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data
const USER_INFO = {
    name: 'Nguyễn Thành Đạt',
    email: 'dat.nguyen@example.com',
    phone: '0912345678',
    memberLevel: 'Thành viên Bạc',
    points: 1250,
};

const STATS = {
    viewed: 12,
    purchased: 5,
    processing: 1,
};

const RECENT_ORDERS = [
    { id: 'VE-123456', date: '13/12/2025', route: 'Sài Gòn - Hà Nội', amount: 1350000, status: 'Hoàn thành' },
    { id: 'VE-789012', date: '01/12/2025', route: 'Đà Nẵng - Huế', amount: 150000, status: 'Đang xử lý' },
];

const WISHLIST = [
    { id: 1, trainId: 'SE1', route: 'Sài Gòn - Hà Nội', time: '06:00', price: 450000, image: '🚆' },
    { id: 2, trainId: 'SPT2', route: 'Sài Gòn - Phan Thiết', time: '06:40', price: 180000, image: '🏖️' },
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'wishlist' | 'settings'>('dashboard');

    return (
        <div className="min-h-screen bg-[#E6F2FF] py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Mobile Menu */}
                    <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
                        <div className="text-center mb-6 pb-6 border-b">
                            <div className="w-20 h-20 bg-[#003366] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                                {USER_INFO.name.charAt(0)}
                            </div>
                            <h2 className="font-bold text-[#003366] text-lg">{USER_INFO.name}</h2>
                            <p className="text-sm text-gray-500">{USER_INFO.memberLevel}</p>
                            <p className="text-xs text-[#CC0000] font-bold mt-1">{USER_INFO.points} điểm</p>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-[#E6F2FF] text-[#003366] font-bold border-l-4 border-[#003366]' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                📊 Thống kê & Đơn hàng
                            </button>
                            <button
                                onClick={() => setActiveTab('wishlist')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'wishlist' ? 'bg-[#E6F2FF] text-[#003366] font-bold border-l-4 border-[#003366]' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                ❤️ Danh sách yêu thích
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'settings' ? 'bg-[#E6F2FF] text-[#003366] font-bold border-l-4 border-[#003366]' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                ⚙️ Cài đặt tài khoản
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 flex items-center gap-3 mt-4 border-t pt-4">
                                🚪 Đăng xuất
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6 min-h-[500px]">
                        {activeTab === 'dashboard' && (
                            <div className="animate-fadeIn">
                                <h1 className="text-2xl font-bold text-[#003366] mb-6">Tổng quan tài khoản</h1>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h3 className="text-gray-500 text-sm mb-1">Đã mua</h3>
                                        <p className="text-2xl font-bold text-[#003366]">{STATS.purchased} vé</p>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                        <h3 className="text-gray-500 text-sm mb-1">Đang xử lý</h3>
                                        <p className="text-2xl font-bold text-yellow-600">{STATS.processing} vé</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        <h3 className="text-gray-500 text-sm mb-1">Đã xem gần đây</h3>
                                        <p className="text-2xl font-bold text-purple-600">{STATS.viewed} sản phẩm</p>
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <h3 className="font-bold text-[#003366] text-lg mb-4">Đơn hàng gần đây</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                                <th className="p-3 rounded-tl-lg">Mã vé</th>
                                                <th className="p-3">Ngày đặt</th>
                                                <th className="p-3">Hành trình</th>
                                                <th className="p-3">Tổng tiền</th>
                                                <th className="p-3 rounded-tr-lg">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RECENT_ORDERS.map(order => (
                                                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                                    <td className="p-3 font-medium text-[#003366]">{order.id}</td>
                                                    <td className="p-3 text-gray-600">{order.date}</td>
                                                    <td className="p-3 text-gray-800">{order.route}</td>
                                                    <td className="p-3 font-bold text-[#CC0000]">{order.amount.toLocaleString()}đ</td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="animate-fadeIn">
                                <h1 className="text-2xl font-bold text-[#003366] mb-6">Danh sách yêu thích ({WISHLIST.length})</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {WISHLIST.map(item => (
                                        <div key={item.id} className="border rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                                            <div className="text-4xl bg-gray-100 w-16 h-16 flex items-center justify-center rounded-lg">
                                                {item.image}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-[#003366]">{item.route}</h3>
                                                        <p className="text-xs text-gray-500">Tàu {item.trainId} - {item.time}</p>
                                                    </div>
                                                    <button className="text-red-500 hover:text-red-700">♥️</button>
                                                </div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="font-bold text-[#CC0000]">{item.price.toLocaleString()}đ</span>
                                                    <Link href="/" className="text-xs bg-[#003366] text-white px-3 py-1 rounded hover:bg-blue-800">
                                                        Đặt ngay
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="animate-fadeIn">
                                <h1 className="text-2xl font-bold text-[#003366] mb-6">Cài đặt tài khoản</h1>
                                <form className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                        <input type="text" defaultValue={USER_INFO.name} className="w-full border rounded p-2 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" defaultValue={USER_INFO.email} className="w-full border rounded p-2 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                        <input type="tel" defaultValue={USER_INFO.phone} className="w-full border rounded p-2 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]" />
                                    </div>
                                    <button className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                                        Lưu thay đổi
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
