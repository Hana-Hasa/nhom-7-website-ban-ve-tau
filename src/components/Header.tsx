/* ===================================================================
   COMPONENT: HEADER - THANH ĐIỀU HƯỚNG CHÍNH
   - Hiển thị logo, menu điều hướng, giỏ hàng và tài khoản người dùng
   - Responsive: Tự động chuyển đổi giữa menu desktop và mobile
   - Sticky: Luôn hiển thị ở đầu trang khi cuộn
   =================================================================== */

'use client';

// Import các thư viện cần thiết
import { useState } from 'react';      // Hook quản lý state
import Link from 'next/link';           // Component navigation của Next.js
import Image from 'next/image';         // Component tối ưu hình ảnh
import { useCart } from '@/context/CartContext';  // Context quản lý giỏ hàng

export default function Header() {
  // ===== STATE MANAGEMENT - QUẢN LÝ TRẠNG THÁI =====
  // State điều khiển việc mở/đóng menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lấy danh sách items trong giỏ hàng từ CartContext
  const { cartItems } = useCart();

  return (
    /* ===== LAYOUT CHÍNH - BỐ CỤC HEADER =====
       - bg-xanh-duongdam: Màu nền xanh dương đậm
       - shadow-lg: Đổ bóng lớn tạo hiệu ứng nổi
       - sticky top-0: Dính ở đầu trang khi cuộn (fixed position)
       - z-50: Độ ưu tiên hiển thị cao nhất */
    <header className="bg-xanh-duongdam shadow-lg sticky top-0 z-50">
      {/* Container giới hạn chiều rộng và căn giữa nội dung */}
      <div className="container mx-auto px-4">
        {/* Flexbox layout: Logo trái, Menu phải, chiều cao 64px */}
        <div className="flex items-center justify-between h-16">

          {/* ===== BLOCK: LOGO VÀ TÊN THƯƠNG HIỆU =====
              - Khi click vào sẽ điều hướng về trang chủ */}
          <Link href="/" className="flex items-center space-x-3">
            {/* Container chứa logo với kích thước cố định */}
            <div className="relative" style={{ width: '75px', marginTop: '0px' }}>
              {/* Sử dụng Next.js Image để tối ưu hình ảnh */}
              <Image
                src="/logo-cong-ty.png"
                alt="Vé Tàu Việt Logo"
                width={75}
                height={75}
                className="object-contain"
              />
            </div>

            {/* Text thương hiệu bên cạnh logo */}
            <div className="text-white">
              <h1 className="text-xl font-bold">Vé Tàu Việt</h1>
              <p className="text-xs opacity-90">Mua vé tàu lửa trực tuyến</p>
            </div>
          </Link>

          {/* ===== BLOCK: MENU ĐIỀU HƯỚNG DESKTOP =====
              - hidden md:flex: Ẩn trên mobile, hiện từ màn hình medium trở lên
              - space-x-8: Khoảng cách 32px giữa các item */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Link Trang chủ với hiệu ứng hover chuyển màu */}
            <Link href="/" className="text-white hover:text-xanh-duongnhat transition-colors">
              Trang chủ
            </Link>

            {/* Link Tin tức với hiệu ứng transition mượt mà */}
            <Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors">
              Tin tức
            </Link>

            {/* ===== BLOCK: ICON GIỎ HÀNG VỚI BADGE SỐ LƯỢNG =====
                - relative: Làm container cho badge absolute
                - group: Cho phép các element con phản ứng với hover của parent */}
            <Link href="/gio-hang" className="relative group">
              {/* SVG icon giỏ hàng với hiệu ứng hover đổi màu */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-xanh-duongnhat transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>

              {/* Badge hiển thị số lượng sản phẩm trong giỏ
                  - Chỉ hiện khi có items (conditional rendering)
                  - Position absolute để đặt ở góc trên phải của icon */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-do text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* ===== BLOCK: THÔNG TIN TÀI KHOẢN NGƯỜI DÙNG =====
                - Hiển thị avatar và tên người dùng */}
            <Link href="/tai-khoan" className="flex items-center gap-2 text-white hover:text-xanh-duongnhat transition-colors font-medium">
              {/* Avatar tròn với chữ cái đầu tiên của tên */}
              <div className="w-8 h-8 rounded-full bg-white text-[#003366] flex items-center justify-center font-bold">D</div>
              <span>Huyen Tran</span>
            </Link>
          </nav>

          {/* ===== BLOCK: NÚT MỞ MENU MOBILE =====
              - md:hidden: Chỉ hiện trên mobile, ẩn từ medium trở lên
              - onClick: Toggle state mở/đóng menu */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* SVG icon hamburger/close với animation chuyển đổi */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Hiệu ứng: Hiện icon X khi menu mở, hiện hamburger khi đóng */}
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ===== BLOCK: MENU ĐIỀU HƯỚNG MOBILE =====
            - Chỉ hiển thị khi isMenuOpen = true (conditional rendering)
            - md:hidden: Ẩn trên desktop
            - flex-col: Sắp xếp các link theo chiều dọc */}
        {isMenuOpen && (
          <div className="md:hidden bg-xanh-duongdam py-4">
            <nav className="flex flex-col space-y-3">
              {/* Link Trang chủ với padding và hiệu ứng hover */}
              <Link href="/" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2">
                Trang chủ
              </Link>

              {/* Link Tin tức */}
              <Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2">
                Tin tức
              </Link>

              {/* Link Giỏ hàng với icon và số lượng */}
              <Link href="/gio-hang" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Giỏ hàng {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>

              {/* Link Tài khoản với avatar nhỏ hơn */}
              <Link href="/tai-khoan" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-[#003366] flex items-center justify-center font-bold text-sm">D</div>
                Tài khoản
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}