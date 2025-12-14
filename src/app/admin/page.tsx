import Link from 'next/link';

export default function AdminHomePage() {
    const cards = [
        {
            title: 'Quản lý Chuyến tàu',
            description: 'Xem, thêm, sửa, xóa chuyến tàu và quản lý toa tàu, ghế ngồi',
            href: '/admin/chuyen-tau',
            icon: '🚂',
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-700',
        },
        {
            title: 'Quản lý Khách hàng',
            description: 'Quản lý thông tin khách hàng, xem lịch sử đặt vé',
            href: '/admin/khach-hang',
            icon: '👥',
            color: 'bg-green-50 border-green-200',
            textColor: 'text-green-700',
        },
        {
            title: 'Quản lý Đơn hàng',
            description: 'Xem và xử lý đơn hàng, xác nhận, hủy, hoàn tiền',
            href: '/admin/don-hang',
            icon: '📋',
            color: 'bg-purple-50 border-purple-200',
            textColor: 'text-purple-700',
        },
        {
            title: 'Quản lý Tin tức',
            description: 'Quản lý bài viết, danh mục tin tức',
            href: '/admin/tin-tuc',
            icon: '📰',
            color: 'bg-orange-50 border-orange-200',
            textColor: 'text-orange-700',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Chào mừng đến Admin Panel
                </h1>
                <p className="text-gray-600">
                    Quản lý toàn bộ hệ thống website bán vé tàu
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className={`block p-6 rounded-xl border-2 ${card.color} hover:shadow-lg transition-all duration-200 hover:scale-105`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">{card.icon}</div>
                            <div className="flex-1">
                                <h2 className={`text-xl font-bold ${card.textColor} mb-2`}>
                                    {card.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {card.description}
                                </p>
                            </div>
                            <div className={card.textColor}>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Tổng chuyến tàu</div>
                    <div className="text-2xl font-bold text-gray-900">10</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Khách hàng</div>
                    <div className="text-2xl font-bold text-gray-900">-</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Đơn hàng</div>
                    <div className="text-2xl font-bold text-gray-900">-</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Bài viết</div>
                    <div className="text-2xl font-bold text-gray-900">-</div>
                </div>
            </div>
        </div>
    );
}
