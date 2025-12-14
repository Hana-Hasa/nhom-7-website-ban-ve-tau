'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Quản lý Chuyến tàu',
            href: '/admin/chuyen-tau',
            icon: '🚂',
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
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-xl font-bold text-blue-600">
                            🎫 Admin Panel
                        </Link>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">Website Bán Vé Tàu</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">Admin User</div>
                            <div className="text-xs text-gray-500">admin@example.com</div>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname?.startsWith(item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
