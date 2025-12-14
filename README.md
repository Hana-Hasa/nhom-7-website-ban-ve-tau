# Website Bán Vé Tàu Đường Sắt Việt Nam

## Giới Thiệu Đồ Án

Đây là đồ án môn **Thiết Kế Website Thương Mại Điện Tử** của **Nhóm 7**, được phát triển nhằm xây dựng một hệ thống đặt vé tàu trực tuyến hiện đại và tiện lợi cho người dùng Việt Nam.

---
## Thành Viên Nhóm 7

| STT | Họ và Tên | MSSV |
|-----|-----------|------|
| 1 | Đỗ Thùy Vân | 31221023419 |
| 2 | Trần Thị Ngọc Huyền | 88214020018 |
| 3 | Trần Thị Kim Ngân | HCMVB120202058 |
| 4 | Lê Minh Đức | 31221024904 |

---

## Thông Tin Đồ Án

**Tên đồ án:** Thiết kế Website Bán Vé Tàu Đường Sắt Việt Nam

**Mô tả:**  
Website cung cấp nền tảng trực tuyến để khách hàng có thể tìm kiếm, đặt vé và thanh toán vé tàu đường sắt một cách nhanh chóng, tiện lợi. Hệ thống hỗ trợ nhiều tuyến đường khác nhau trên toàn quốc, cho phép người dùng lựa chọn chỗ ngồi, quản lý đơn hàng và theo dõi lịch sử giao dịch.

**Mục tiêu:**
- Xây dựng giao diện người dùng thân thiện, dễ sử dụng và responsive trên mọi thiết bị
- Cung cấp tính năng tìm kiếm và đặt vé tàu trực tuyến nhanh chóng
- Tích hợp hệ thống chọn chỗ ngồi trực quan
- Quản lý đơn hàng, giỏ hàng và lịch sử mua vé
- Cung cấp thông tin chi tiết về các tuyến tàu, lịch trình và giá vé
- Tích hợp hệ thống thanh toán an toàn
- Quản lý tài khoản người dùng và bộ sưu tập vé yêu thích
- Cung cấp tin tức và thông tin hữu ích về đường sắt Việt Nam

---

## Công Nghệ Áp Dụng

Dự án được xây dựng với các công nghệ hiện đại:

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework với App Router
- **[React 18](https://react.dev/)** - Thư viện UI component-based
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **CSS Variables** - Hỗ trợ theming và dark mode
- **Responsive Design** - Tương thích với mọi kích thước màn hình

### State Management & Context
- **React Context API** - Quản lý state toàn cục cho giỏ hàng, tài khoản, tin tức

### Font & Icons
- **[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)** - Tối ưu hóa font tự động
- **Geist Font Family** - Font hiện đại của Vercel

### Development Tools
- **ESLint** - Code linting và quality control
- **PostCSS** - CSS processing

---

## Cấu Trúc Đồ Án

```
nhom-7-website-ban-ve-tau/
├── src/
│   ├── app/              # Pages và routing (App Router)
│   │   ├── dat-ve/       # Trang đặt vé và chọn ghế
│   │   ├── gio-hang/     # Trang giỏ hàng
│   │   ├── thanh-toan/   # Trang thanh toán
│   │   ├── tai-khoan/    # Trang quản lý tài khoản
│   │   ├── tin-tuc/      # Trang tin tức
│   │   └── layout.tsx    # Layout wrapper chung
│   ├── components/       # React components tái sử dụng
│   │   ├── Header.tsx    # Header navigation
│   │   ├── Footer.tsx    # Footer
│   │   └── ...
│   ├── contexts/         # React Context providers
│   │   ├── CartContext.tsx
│   │   ├── AccountContext.tsx
│   │   └── NewsContext.tsx
│   └── data/            # Dữ liệu tĩnh và mock data
├── public/              # Static assets (images, logos)
├── docs/                # Tài liệu dự án (Gherkin specs)
└── Huong-dan-cho-nha-phat-trien.md  # Hướng dẫn phát triển
```

---

## Các Tính Năng Chính

### 1. **Trang Chủ**
- Giới thiệu dịch vụ
- Tìm kiếm vé nhanh
- Tin tức nổi bật
- Các tuyến tàu phổ biến

### 2. **Đặt Vé**
- Tìm kiếm chuyến tàu theo tuyến và ngày
- Lọc và sắp xếp kết quả
- Chọn chỗ ngồi trực quan
- Hiển thị sơ đồ toa tàu

### 3. **Giỏ Hàng & Thanh Toán**
- Quản lý vé trong giỏ hàng
- Áp dụng mã giảm giá
- Thanh toán trực tuyến an toàn

### 4. **Quản Lý Tài Khoản**
- Dashboard thống kê
- Lịch sử đơn hàng
- Bộ sưu tập vé yêu thích
- Quản lý thông tin cá nhân

### 5. **Tin Tức**
- Tin tức về đường sắt
- Khuyến mãi và sự kiện
- Hướng dẫn sử dụng

### 6. **Quản Trị (Admin)**
- Quản lý bài viết tin tức
- CRUD operations cho articles

---

## Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
- Node.js 18.x trở lên
- npm, yarn, pnpm hoặc bun

### Cài Đặt

1. Clone repository:
```bash
git clone https://github.com/Hana-Hasa/nhom-7-website-ban-ve-tau.git
cd nhom-7-website-ban-ve-tau
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Chạy Development Server

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build Production

```bash
npm run build
npm start
```

---

## Tài Liệu Tham Khảo

- [Next.js Documentation](https://nextjs.org/docs) - Hướng dẫn Next.js
- [React Documentation](https://react.dev/) - Hướng dẫn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Hướng dẫn Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Hướng dẫn TypeScript

---

## Giấy Phép

Dự án này được phát triển cho mục đích học tập tại Đại học Kinh tế TP.HCM (UEH).

---

**© 2024 Nhóm 7 - Website Bán Vé Tàu Đường Sắt Việt Nam**
