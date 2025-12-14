/* ===================================================================
   COMPONENT: FOOTER - CHÂN TRANG
   - Hiển thị thông tin công ty, liên kết nhanh, hỗ trợ khách hàng
   - Bao gồm các liên kết mạng xã hội
   - Responsive layout với grid system
   =================================================================== */

'use client';

// Import các thư viện cần thiết
import Link from 'next/link';      // Component navigation của Next.js
import Image from 'next/image';    // Component tối ưu hình ảnh

export default function Footer() {
  return (
    /* ===== LAYOUT CHÍNH - BỐ CỤC FOOTER =====
       - bg-xanh-duongdam: Màu nền xanh dương đậm
       - text-white: Text màu trắng */
    <footer className="bg-xanh-duongdam text-white">
      {/* Container chính với padding dọc 48px */}
      <div className="container mx-auto px-4 py-12">
        {/* ===== GRID LAYOUT 4 CỘT =====
            - grid-cols-1: 1 cột trên mobile
            - md:grid-cols-4: 4 cột trên desktop
            - gap-8: Khoảng cách 32px giữa các cột */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ===== BLOCK 1: THÔNG TIN CÔNG TY =====
              - Hiển thị logo, tên công ty, mô tả
              - Các icon mạng xã hội */}
          <div>
            {/* Container logo và tên với gap 12px */}
            <div className="flex items-center gap-3 mb-4">
              {/* Logo công ty với kích thước 10x10 (40px) */}
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-cong-ty.png"
                  alt="Vé Tàu Việt Logo"
                  width={75}
                  height={75}
                  className="object-contain"
                />
              </div>
              {/* Tên công ty */}
              <h3 className="text-xl font-bold">Vé Tàu Việt</h3>
            </div>

            {/* Mô tả ngắn về công ty
                - text-sm: Chữ nhỏ (14px)
                - opacity-90: Độ mờ 90% để tạo hiệu ứng nhẹ nhàng */}
            <p className="text-sm opacity-90 mb-4">
              Hệ thống bán vé tàu lửa trực tuyến hàng đầu Việt Nam.
              Chúng tôi mang đến trải nghiệm đặt vé tiện lợi, nhanh chóng và an toàn.
            </p>

            {/* ===== BLOCK: SOCIAL MEDIA LINKS =====
                - flex: Sắp xếp ngang
                - space-x-3: Khoảng cách 12px giữa các icon */}
            <div className="flex space-x-3">
              {/* Icon Facebook
                  - w-10 h-10: Kích thước 40x40px
                  - bg-white/10: Nền trắng trong suốt 10%
                  - rounded-full: Bo tròn hoàn toàn
                  - hover:bg-white/20: Hover tăng độ sáng lên 20%
                  - transition-colors: Hiệu ứng chuyển màu mượt mà */}
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                {/* SVG icon Facebook từ Simple Icons */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Icon Twitter/X với cùng style như Facebook */}
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                {/* SVG icon Twitter từ Simple Icons */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ===== BLOCK 2: LIÊN KẾT NHANH =====
              - Các link điều hướng đến các trang quan trọng */}
          <div>
            {/* Tiêu đề section với text lớn và bold */}
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>

            {/* Danh sách links
                - space-y-2: Khoảng cách dọc 8px giữa các item */}
            <ul className="space-y-2">
              {/* Từng link với hiệu ứng hover tăng opacity */}
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Về chúng tôi</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Tuyển dụng</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Chương trình khuyến mãi</a></li>
            </ul>
          </div>

          {/* ===== BLOCK 3: HỖ TRỢ KHÁCH HÀNG =====
              - Các link hướng dẫn và hỗ trợ */}
          <div>
            {/* Tiêu đề section */}
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h4>

            {/* Danh sách links hỗ trợ */}
            <ul className="space-y-2">
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Hướng dẫn đặt vé</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Phương thức thanh toán</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Hướng dẫn đổi vé</a></li>
              <li><a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Câu hỏi thường gặp</a></li>
              {/* Link Liên hệ sử dụng Next.js Link để routing */}
              <li><Link href="/lien-he" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Liên hệ</Link></li>
            </ul>
          </div>

          {/* ===== BLOCK 4: THÔNG TIN LIÊN HỆ =====
              - Địa chỉ, số điện thoại, email
              - Mỗi item có icon tương ứng */}
          <div>
            {/* Tiêu đề section */}
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>

            {/* Container các thông tin liên hệ
                - space-y-3: Khoảng cách dọc 12px */}
            <div className="space-y-3">

              {/* ===== ĐỊA CHỈ =====
                  - flex items-start: Căn top cho icon và text
                  - space-x-3: Khoảng cách ngang 12px */}
              <div className="flex items-start space-x-3">
                {/* Icon vị trí (location pin)
                    - mt-0.5: Margin top 2px để căn chỉnh với text
                    - flex-shrink-0: Không cho icon bị thu nhỏ */}
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {/* Text địa chỉ hiển thị trên 2 dòng */}
                <div>
                  <p className="text-sm">123 Nguyễn Huệ, Quận 1</p>
                  <p className="text-sm">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

              {/* ===== SỐ ĐIỆN THOẠI =====
                  - Layout ngang với icon và text */}
              <div className="flex items-center space-x-3">
                {/* Icon điện thoại */}
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {/* Số hotline */}
                <p className="text-sm">1900 1234</p>
              </div>

              {/* ===== EMAIL =====
                  - Layout ngang với icon và email */}
              <div className="flex items-center space-x-3">
                {/* Icon email (envelope) */}
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {/* Địa chỉ email hỗ trợ */}
                <p className="text-sm">support@vetauviet.vn</p>
              </div>
            </div>

          </div>
        </div>

        {/* ===== BOTTOM BAR - THANH CUỐI FOOTER =====
            - border-t: Đường viền trên
            - border-white/20: Màu trắng trong suốt 20%
            - mt-8 pt-8: Margin top và padding top 32px */}
        <div className="border-t border-white/20 mt-8 pt-8">
          {/* Container responsive
              - flex-col: Dọc trên mobile
              - md:flex-row: Ngang trên desktop
              - justify-between: Căn hai đầu
              - items-center: Căn giữa theo trục dọc */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright text */}
            <p className="text-sm opacity-90">
              © 2024 Vé Tàu Việt. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}