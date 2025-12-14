/* ===================================================================
   COMPONENT: ADMIN LAYOUT - BỐ CỤC TRANG ADMIN
   - Layout chính cho tất cả trang admin
   - Header sticky với logo và thông tin admin
   - Sidebar navigation với menu items
   - Active state highlighting cho menu
   - Main content area cho children
   =================================================================== */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';  // Hook lấy pathname hiện tại
import { ReactNode } from 'react';

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface AdminLayoutProps {
    children: ReactNode;  // Nội dung trang admin (page content)
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    // ===== HOOK: LẤY PATHNAME HIỆN TẠI =====
    // Dùng để highlight menu item đang active
    const pathname = usePathname();

    // ===== DATA: DANH SÁCH MENU ITEMS =====
    // Các trang quản lý trong admin panel
    const menuItems = [
        {
            title: 'Quản lý Chuyến tàu',
            href: '/admin/chuyen-tau',
            icon: '🚂',  // Emoji icon
        },
        {
            title: 'Quản lý Khách hàng',
            href: '/admin/khach-hang',
            icon: '👥',
        },
        {
            title: 'Quản lý Đơn hàng',
            href: '/admin/don-hang',
            icon: '📋',
        },
        {
            title: 'Quản lý Tin tức',
            href: '/admin/tin-tuc',
            icon: '📰',
        },
    ];

    return (
        // Container toàn màn hình với nền xám nhạt
        <div className="min-h-screen bg-gray-50">

            {/* ===== HEADER - THANH TIÊU ĐỀ ADMIN =====
                - sticky top-0: Dính ở đầu trang khi scroll
                - z-10: Đặt trên các elements khác */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center justify-between px-6 py-4">

                    {/* ===== LEFT SIDE: LOGO VÀ TÊN PANEL ===== */}
                    <div className="flex items-center gap-4">
                        {/* Link về trang admin dashboard */}
                        <Link href="/admin" className="flex items-center gap-2">
                            {/* Logo công ty */}
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/logo-cong-ty.png"
                                    alt="Vé Tàu Việt Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            {/* Tên admin panel */}
                            <span className="text-xl font-bold text-blue-600">Admin Panel</span>
                        </Link>

                        {/* Separator */}
                        <span className="text-gray-400">|</span>

                        {/* Tên website */}
                        <span className="text-gray-600">Website Bán Vé Tàu</span>
                    </div>

                    {/* ===== RIGHT SIDE: THÔNG TIN ADMIN VÀ NÚT VỀ TRANG CHỦ ===== */}
                    <div className="flex items-center gap-4">
                        {/* Thông tin admin đang đăng nhập */}
                        <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">Admin User</div>
                            <div className="text-xs text-gray-500">admin@example.com</div>
                        </div>

                        {/* Nút về trang chủ */}
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </header>

            {/* ===== LAYOUT CHÍNH: SIDEBAR + CONTENT ===== */}
            <div className="flex">

                {/* ===== SIDEBAR - MENU ĐIỀU HƯỚNG =====
                    - w-64: Chiều rộng cố định 256px
                    - min-h-[calc(100vh-73px)]: Chiều cao = màn hình - header
                    - sticky top-[73px]: Dính ở vị trí dưới header khi scroll */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {/* Map qua từng menu item */}
                            {menuItems.map((item) => {
                                // Kiểm tra menu item có active không
                                // Active nếu pathname bắt đầu với href của item
                                const isActive = pathname?.startsWith(item.href);

                                return (
                                    <li key={item.href}>
                                        {/* Link menu item với conditional styling */}
                                        <Link
                                            href={item.href}
                                            // Active: Nền xanh nhạt, chữ xanh đậm, đậm hơn, có bóng
                                            // Not active: Chữ xám, hover nền xám nhạt
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {/* Icon emoji */}
                                            <span className="text-xl">{item.icon}</span>
                                            {/* Tiêu đề menu */}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* ===== MAIN CONTENT AREA =====
                    - flex-1: Chiếm hết không gian còn lại
                    - p-8: Padding 32px */}
                <main className="flex-1 p-8">
                    {/* Render nội dung page con */}
                    {children}
                </main>
            </div>
        </div>
    );
}
