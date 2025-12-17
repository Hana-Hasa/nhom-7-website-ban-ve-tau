/* ===================================================================
   FILE: ROOT LAYOUT - LAYOUT GỐC CHO TOÀN BỘ WEBSITE
   ===================================================================
   Mục đích: Định nghĩa cấu trúc HTML chung cho TẤT CẢ các trang
   
   Vai trò:
   - Wrap toàn bộ ứng dụng với <html> và <body>
   - Cấu hình font chữ cho toàn bộ website
   - Thiết lập metadata (SEO): title, description, favicon
   - Bọc children trong CartProvider để share giỏ hàng
   
   Lưu ý:
   - File này chỉ render 1 LẦN duy nhất khi load website
   - Tất cả page.tsx sẽ được inject vào {children}
   - Không nên để logic phức tạp ở đây
   =================================================================== */

// ===== IMPORTS =====
import type { Metadata } from "next";              // Type cho metadata
import { Geist, Geist_Mono } from "next/font/google";  // Google Fonts
import "./globals.css";                            // CSS toàn cục
import { CartProvider } from "@/context/CartContext";  // Context giỏ hàng

// ===== CẤU HÌNH FONT CHỮ =====
// Font Geist Sans - Font chính cho text thông thường
const geistSans = Geist({
  variable: "--font-geist-sans",  // Tạo CSS variable để dùng trong Tailwind
  subsets: ["latin"],             // Chỉ load bộ ký tự Latin (tiết kiệm bandwidth)
});

// Font Geist Mono - Font monospace cho code/số
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",  // CSS variable cho font mono
  subsets: ["latin"],
});

// ===== METADATA - THÔNG TIN SEO =====
// Xuất metadata để Next.js tự động inject vào <head>
export const metadata: Metadata = {
  // Tiêu đề hiển thị trên tab browser
  title: "Vé Tàu Việt - Mua vé tàu lửa trực tuyến",

  // Mô tả cho Google search results
  description: "Hệ thống bán vé tàu lửa trực tuyến hàng đầu Việt Nam. Đặt vé nhanh chóng, tiện lợi với nhiều ưu đãi hấp dẫn.",

  // Các loại favicon cho các thiết bị khác nhau
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },  // Icon nhỏ
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },  // Icon vừa
      { url: '/favicon.ico', sizes: 'any' },                              // Icon mặc định
    ],
    shortcut: '/favicon.ico',              // Shortcut icon (legacy)
    apple: '/logo-cong-ty.png',            // Icon cho iOS/Safari
  },
};

// ===== ROOT LAYOUT COMPONENT =====
// Component này wrap TẤT CẢ các page trong website
export default function RootLayout({
  children,  // Các page.tsx sẽ được inject vào đây
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tag <html> - Root element của toàn bộ website
    // lang="vi" - Báo cho browser/screen reader biết ngôn ngữ là Tiếng Việt
    <html lang="vi">

      {/* Tag <body> - Chứa toàn bộ nội dung hiển thị
          - geistSans.variable: CSS var cho font sans
          - geistMono.variable: CSS var cho font mono
          - antialiased: Làm chữ hiển thị mượt hơn */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ===== CART PROVIDER - CONTEXT GIỎ HÀNG =====
            Wrap children trong CartProvider để:
            - Tất cả component con có thể access giỏ hàng
            - Share state giỏ hàng giữa các trang
            - Không cần prop drilling */}
        <CartProvider>
          {/* CHILDREN - NỘI DUNG CỤ THỂ CỦA TỪNG TRANG
              Đây chính là nơi các page.tsx được render:
              - / → src/app/page.tsx
              - /admin → src/app/admin/page.tsx
              - /dat-ve → src/app/dat-ve/page.tsx
              v.v... */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
