# 📚 HƯỚNG DẪN CHO NHÀ PHÁT TRIỂN - WEBSITE BÁN VÉ TÀU

> **Tài liệu này dành cho**: Các thành viên trong nhóm 7 để hiểu cách dự án được thiết lập, cấu trúc code, và cách chỉnh sửa đơn giản.
>
> **Lưu ý**: Tài liệu được viết đơn giản, dễ hiểu cho người mới học lập trình.

---

## 📖 MỤC LỤC

1. [Giới thiệu dự án](#1-giới-thiệu-dự-án)
2. [Thiết lập ban đầu](#2-thiết-lập-ban-đầu)
3. [Cấu trúc dự án](#3-cấu-trúc-dự-án)
4. [Cách tạo một trang mới](#4-cách-tạo-một-trang-mới)
5. [Hướng dẫn chỉnh sửa cơ bản](#5-hướng-dẫn-chỉnh-sửa-cơ-bản)
6. [Ví dụ thực tế](#6-ví-dụ-thực-tế)
7. [Câu hỏi thường gặp](#7-câu-hỏi-thường-gặp)

---

## 1. GIỚI THIỆU DỰ ÁN

### 🎯 Dự án là gì?
Website **Vé Tàu Việt** là một trang web bán vé tàu lửa trực tuyến được xây dựng bằng công nghệ **Next.js** và **React**.

### 🛠️ Công nghệ sử dụng
- **Next.js 16**: Framework để xây dựng website
- **React 19**: Thư viện tạo giao diện người dùng
- **TypeScript**: Ngôn ngữ lập trình (giống JavaScript nhưng chặt chẽ hơn)
- **Tailwind CSS**: Thư viện CSS để tạo giao diện đẹp

### 🌐 Các trang chính
- **Trang chủ** (`/`): Hiển thị danh sách vé tàu
- **Tìm kiếm** (`/search`): Tìm kiếm vé tàu
- **Tin tức** (`/tin-tuc`): Các bài viết tin tức
- **Giỏ hàng** (`/gio-hang`): Xem giỏ hàng
- **Thanh toán** (`/thanh-toan`): Thanh toán đơn hàng
- **Tài khoản** (`/tai-khoan`): Quản lý tài khoản
- **Admin** (`/admin`): Quản trị hệ thống

---

## 2. THIẾT LẬP BAN ĐẦU

### 📋 Yêu cầu trước khi bắt đầu
1. **Node.js**: Cài đặt từ [nodejs.org](https://nodejs.org) (phiên bản 20 trở lên)
2. **Visual Studio Code**: Trình soạn thảo code từ [code.visualstudio.com](https://code.visualstudio.com)

### 🚀 Các bước chạy dự án

#### Bước 1: Mở Terminal
- Trong VS Code, nhấn **Ctrl + `** (phím backtick bên dưới Esc)
- Hoặc vào menu **Terminal → New Terminal**

#### Bước 2: Cài đặt các thư viện cần thiết
```bash
npm install
```
> **Giải thích**: Lệnh này sẽ tải về tất cả các thư viện mà dự án cần (đã được liệt kê trong file `package.json`)

#### Bước 3: Chạy website ở môi trường phát triển
```bash
npm run dev
```
> **Giải thích**: Lệnh này sẽ khởi động server development. Website sẽ chạy tại địa chỉ `http://localhost:3000`

#### Bước 4: Xem website
- Mở trình duyệt (Chrome, Firefox, Edge...)
- Vào địa chỉ: `http://localhost:3004`
- Mỗi khi bạn chỉnh sửa code và lưu file, website sẽ tự động cập nhật!

### 🛑 Dừng chạy website
- Trong Terminal, nhấn **Ctrl + C**
- Gõ `y` và nhấn Enter để xác nhận

---

## 3. CẤU TRÚC DỰ ÁN

### 📁 Sơ đồ thư mục quan trọng

```
nhom-7-website-ban-ve-tau/
├── public/                    ← Chứa hình ảnh, icon, logo
│   ├── logo-cong-ty.png      ← Logo công ty
│   ├── tau-se1.jpg           ← Hình ảnh tàu SE1
│   └── ...
│
├── src/                       ← Toàn bộ code của website
│   ├── app/                   ← Các trang của website
│   │   ├── page.tsx          ← Trang chủ (/)
│   │   ├── layout.tsx        ← Bố cục chung cho tất cả trang
│   │   ├── globals.css       ← File CSS toàn cục (màu sắc, hiệu ứng)
│   │   │
│   │   ├── search/           ← Trang tìm kiếm
│   │   │   └── page.tsx
│   │   │
│   │   ├── tin-tuc/          ← Trang tin tức
│   │   │   └── page.tsx
│   │   │
│   │   ├── gio-hang/         ← Trang giỏ hàng
│   │   │   └── page.tsx
│   │   │
│   │   ├── thanh-toan/       ← Trang thanh toán
│   │   │   └── page.tsx
│   │   │
│   │   ├── tai-khoan/        ← Trang tài khoản
│   │   │   └── page.tsx
│   │   │
│   │   └── admin/            ← Trang quản trị
│   │       └── ...
│   │
│   ├── components/           ← Các thành phần tái sử dụng
│   │   ├── Header.tsx        ← Thanh điều hướng trên cùng
│   │   ├── Footer.tsx        ← Chân trang
│   │   ├── ProductCard.tsx   ← Card hiển thị vé tàu
│   │   ├── Slider.tsx        ← Slider hình ảnh trang chủ
│   │   └── ...
│   │
│   ├── context/              ← Quản lý dữ liệu toàn cục
│   │   ├── CartContext.tsx   ← Quản lý giỏ hàng
│   │   └── ...
│   │
│   ├── data/                 ← Dữ liệu mẫu
│   │   └── ...
│   │
│   ├── hooks/                ← Custom hooks
│   │   └── ...
│   │
│   └── types/                ← Định nghĩa kiểu dữ liệu
│       └── ...
│
├── package.json              ← Danh sách thư viện và script
└── README.md                 ← Hướng dẫn cơ bản
```

### 🔍 Giải thích chi tiết

#### 📂 Thư mục `public/`
- **Mục đích**: Chứa tất cả file tĩnh như hình ảnh, icon, logo
- **Cách sử dụng**: Đặt file vào đây và gọi bằng đường dẫn `/tên-file.jpg`
- **Ví dụ**: File `public/logo-cong-ty.png` → Dùng trong code: `src="/logo-cong-ty.png"`

#### 📂 Thư mục `src/app/`
- **Mục đích**: Chứa tất cả các trang của website
- **Quy tắc quan trọng**:
  - Mỗi thư mục con = 1 đường dẫn (route)
  - File `page.tsx` = Nội dung của trang đó
  - File `layout.tsx` = Bố cục chung (Header, Footer...)

**Ví dụ cụ thể:**
```
src/app/tin-tuc/page.tsx  →  Website: /tin-tuc
src/app/gio-hang/page.tsx →  Website: /gio-hang
```

#### 📂 Thư mục `src/components/`
- **Mục đích**: Chứa các "mảnh ghép" có thể tái sử dụng ở nhiều trang khác nhau
- **Ví dụ**: `Header.tsx` được dùng ở tất cả các trang

#### 📂 File `globals.css`
- **Mục đích**: Định nghĩa màu sắc, hiệu ứng cho toàn bộ website
- **Nội dung quan trọng**:
  ```css
  --xanh-duongdam: #003366;    /* Màu xanh chủ đạo */
  --xanh-duongnhat: #E6F2FF;   /* Màu xanh nhạt */
  --do: #CC0000;                /* Màu đỏ */
  --xam: #f5f5f5;               /* Màu xám nền */
  ```

---

## 4. CÁCH TẠO MỘT TRANG MỚI

### 📝 Hướng dẫn từng bước

#### Ví dụ: Tạo trang "Giới thiệu" với đường dẫn `/gioi-thieu`

**Bước 1: Tạo thư mục mới**
- Vào thư mục `src/app/`
- Tạo thư mục mới tên `gioi-thieu`

**Bước 2: Tạo file `page.tsx`**
- Trong thư mục `gioi-thieu`, tạo file `page.tsx`

**Bước 3: Viết code cho trang**

```tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GioiThieu() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Thanh điều hướng */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-xanh-duongdam mb-4">
          Giới thiệu về Vé Tàu Việt
        </h1>
        <p className="text-gray-700">
          Đây là trang giới thiệu của chúng tôi...
        </p>
      </main>

      {/* Chân trang */}
      <Footer />
    </div>
  );
}
```

**Bước 4: Kiểm tra kết quả**
- Mở trình duyệt
- Vào địa chỉ: `http://localhost:3004/gioi-thieu`
- Bạn sẽ thấy trang mới xuất hiện!

### 🔗 Thêm link điều hướng vào Header

Để người dùng có thể truy cập trang mới từ menu, cần thêm link vào `Header.tsx`:

```tsx
// Mở file src/components/Header.tsx
// Tìm đoạn code menu và thêm:

<Link href="/gioi-thieu" className="text-white hover:text-xanh-duongnhat transition-colors">
  Giới thiệu
</Link>
```

---

## 5. HƯỚNG DẪN CHỈNH SỬA CƠ BẢN

### 🎨 A. Thay đổi màu sắc

#### Cách 1: Thay đổi màu chủ đạo của toàn website

**File cần sửa:** `src/app/globals.css`

**Ví dụ: Đổi màu xanh dương đậm sang màu xanh lá**

1. Mở file `globals.css`
2. Tìm dòng:
   ```css
   --xanh-duongdam: #003366;
   ```
3. Đổi thành:
   ```css
   --xanh-duongdam: #2E7D32;  /* Màu xanh lá */
   ```
4. Lưu file → Website tự động cập nhật!

> **Lưu ý**: Toàn bộ website sử dụng màu này (Header, Button, Link...) sẽ đổi màu theo

#### Cách 2: Đổi màu của một phần tử cụ thể

**Ví dụ: Đổi màu nền của Header**

1. Mở file `src/components/Header.tsx`
2. Tìm dòng:
   ```tsx
   <header className="bg-xanh-duongdam shadow-lg sticky top-0 z-50">
   ```
3. Đổi `bg-xanh-duongdam` thành màu khác:
   ```tsx
   <header className="bg-red-600 shadow-lg sticky top-0 z-50">
   ```
   
**Bảng màu Tailwind CSS thông dụng:**
- `bg-blue-600` → Xanh dương
- `bg-red-600` → Đỏ
- `bg-green-600` → Xanh lá
- `bg-gray-600` → Xám
- `bg-yellow-600` → Vàng

### ✨ B. Thay đổi hiệu ứng

#### Ví dụ 1: Đổi hiệu ứng hover của Button

**File cần sửa:** `src/app/globals.css`

**Hiện tại:**
```css
.btn-primary:hover {
  background-color: #002244;
  transform: translateY(-2px);  /* Nổi lên 2px */
}
```

**Muốn đổi thành hiệu ứng phóng to:**
```css
.btn-primary:hover {
  background-color: #002244;
  transform: scale(1.1);  /* Phóng to 110% */
}
```

**Muốn đổi thành hiệu ứng xoay nhẹ:**
```css
.btn-primary:hover {
  background-color: #002244;
  transform: rotate(2deg);  /* Xoay 2 độ */
}
```

#### Ví dụ 2: Đổi hiệu ứng hover của hình ảnh sản phẩm

**File cần sửa:** `src/app/globals.css`

**Hiện tại (phóng to 110%):**
```css
.product-image:hover {
  transform: scale(1.1);
}
```

**Muốn phóng to nhiều hơn:**
```css
.product-image:hover {
  transform: scale(1.2);  /* Phóng to 120% */
}
```

**Muốn thêm hiệu ứng làm mờ:**
```css
.product-image:hover {
  transform: scale(1.1);
  opacity: 0.8;  /* Độ mờ 80% */
}
```

#### Ví dụ 3: Thay đổi tốc độ chuyển động (transition)

Tìm dòng:
```css
.product-image {
  transition: transform 0.3s ease;  /* 0.3 giây */
}
```

Đổi thành:
```css
.product-image {
  transition: transform 0.6s ease;  /* 0.6 giây (chậm hơn) */
}
```

hoặc:
```css
.product-image {
  transition: transform 0.1s ease;  /* 0.1 giây (nhanh hơn) */
}
```

### 📐 C. Thay đổi Layout (Bố cục)

#### Ví dụ 1: Đổi số lượng cột hiển thị sản phẩm

**File cần sửa:** Trang hiển thị danh sách sản phẩm (ví dụ: `src/app/page.tsx`)

Giả sử có đoạn code:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Các ProductCard */}
</div>
```

**Giải thích:**
- `grid-cols-1`: Trên mobile: 1 cột
- `md:grid-cols-2`: Trên tablet: 2 cột
- `lg:grid-cols-4`: Trên desktop: 4 cột

**Muốn hiển thị 3 cột trên desktop:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Muốn hiển thị 2 cột trên mọi màn hình:**
```tsx
<div className="grid grid-cols-2 gap-6">
```

#### Ví dụ 2: Thay đổi khoảng cách giữa các phần tử

**Tìm:** `gap-6` (khoảng cách 24px)

**Đổi thành:**
- `gap-2` → 8px (gần nhau hơn)
- `gap-4` → 16px
- `gap-8` → 32px (xa nhau hơn)

#### Ví dụ 3: Thay đổi padding (khoảng cách lề trong)

**Ví dụ trong Header:**
```tsx
<div className="container mx-auto px-4">
```

- `px-4` → Padding trái phải 16px

**Đổi thành:**
- `px-2` → 8px (hẹp hơn)
- `px-6` → 24px (rộng hơn)
- `px-8` → 32px (rộng hơn nữa)

### 🗑️ D. Bỏ bớt nút hoặc phần tử

#### Ví dụ 1: Ẩn nút "Tin tức" trên Header

**File cần sửa:** `src/components/Header.tsx`

**Tìm đoạn code:**
```tsx
<Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors">
  Tin tức
</Link>
```

**Cách 1: Xóa hoàn toàn** (Copy toàn bộ đoạn code trên và xóa đi)

**Cách 2: Ẩn tạm thời** (Comment)
```tsx
{/* 
<Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors">
  Tin tức
</Link>
*/}
```

> **Lưu ý**: Nhớ tìm và xóa/ẩn cả 2 chỗ: Menu Desktop VÀ Menu Mobile

#### Ví dụ 2: Ẩn icon giỏ hàng

**Trong Header.tsx, tìm:**
```tsx
<Link href="/gio-hang" className="relative group">
  <svg ...>...</svg>
  {cartItems.length > 0 && (
    <span>...</span>
  )}
</Link>
```

**Cách ẩn:**
```tsx
{/* 
<Link href="/gio-hang" className="relative group">
  ...
</Link>
*/}
```

#### Ví dụ 3: Bỏ phần "Sản phẩm bán chạy" trên trang chủ

**File cần sửa:** `src/app/page.tsx`

**Tìm đoạn code:**
```tsx
<ProductList
  title="Sản phẩm/Dịch vụ bán chạy"
  products={bestSellingProducts}
/>
```

**Comment hoặc xóa:**
```tsx
{/* 
<ProductList
  title="Sản phẩm/Dịch vụ bán chạy"
  products={bestSellingProducts}
/>
*/}
```

---

## 6. VÍ DỤ THỰC TẾ

### 📌 Ví dụ 1: Đổi Logo của Website

**Bước 1:** Chuẩn bị logo mới
- Đặt file logo vào thư mục `public/`
- Ví dụ: `public/logo-moi.png`

**Bước 2:** Mở file `src/components/Header.tsx`

**Bước 3:** Tìm dòng:
```tsx
<Image
  src="/logo-cong-ty.png"
  alt="Vé Tàu Việt Logo"
  width={75}
  height={75}
  className="object-contain"
/>
```

**Bước 4:** Đổi `src`:
```tsx
<Image
  src="/logo-moi.png"
  alt="Vé Tàu Việt Logo"
  width={75}
  height={75}
  className="object-contain"
/>
```

**Bước 5:** Lưu file → Kiểm tra trên trình duyệt

### 📌 Ví dụ 2: Thay đổi text "Vé Tàu Việt" thành "Train Ticket"

**File cần sửa:** `src/components/Header.tsx`

**Tìm:**
```tsx
<div className="text-white">
  <h1 className="text-xl font-bold">Vé Tàu Việt</h1>
  <p className="text-xs opacity-90">Mua vé tàu lửa trực tuyến</p>
</div>
```

**Đổi thành:**
```tsx
<div className="text-white">
  <h1 className="text-xl font-bold">Train Ticket</h1>
  <p className="text-xs opacity-90">Book train tickets online</p>
</div>
```

### 📌 Ví dụ 3: Thay đổi tiêu đề trang chủ

**File cần sửa:** `src/app/page.tsx`

**Tìm:**
```tsx
<ProductList
  title="Sản phẩm/Dịch vụ xu hướng"
  products={trendingProducts}
/>
```

**Đổi thành:**
```tsx
<ProductList
  title="Vé tàu HOT nhất hiện nay 🔥"
  products={trendingProducts}
/>
```

### 📌 Ví dụ 4: Thay đổi giá của một sản phẩm

**File cần sửa:** `src/app/page.tsx`

**Tìm đoạn data:**
```tsx
const trendingProducts = [
  {
    id: 1,
    name: "Tàu SE1 - Hà Nội → TP.HCM",
    route: "Ga Hà Nội - Ga Sài Gòn",
    originalPrice: 1850000,
    discountedPrice: 1295000,
    discountPercent: 30,
    ...
  },
  ...
];
```

**Đổi giá:**
```tsx
originalPrice: 2000000,      // Giá gốc mới
discountedPrice: 1500000,    // Giá giảm mới
discountPercent: 25,         // % giảm giá mới
```

### 📌 Ví dụ 5: Thay đổi màu nút "Đặt ngay"

**File cần sửa:** Tìm trong các component có nút "Đặt ngay" (ví dụ `ProductCard.tsx`)

**Giả sử có:**
```tsx
<button className="bg-xanh-duongdam text-white px-6 py-2 rounded hover:bg-opacity-90">
  Đặt ngay
</button>
```

**Đổi màu nền thành đỏ:**
```tsx
<button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
  Đặt ngay
</button>
```

**Đổi màu nền thành xanh lá:**
```tsx
<button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
  Đặt ngay
</button>
```

---

## 7. CÂU HỎI THƯỜNG GẶP

### ❓ Tôi sửa code nhưng website không thay đổi?

**Giải pháp:**
1. Kiểm tra xem đã lưu file chưa (Ctrl + S)
2. Kiểm tra Terminal có đang chạy `npm run dev` không
3. Refresh lại trình duyệt (Ctrl + F5)
4. Nếu vẫn không được, dừng server (Ctrl + C) và chạy lại `npm run dev`

### ❓ Làm sao biết tên class CSS của Tailwind?

**Tài liệu tham khảo:**
- Website chính thức: [tailwindcss.com](https://tailwindcss.com/docs)
- Hoặc Google: "tailwind css [tên thuộc tính]"

**Ví dụ:**
- Muốn đổi màu text: Google "tailwind css text color"
- Muốn đổi kích thước: Google "tailwind css font size"

### ❓ Tôi làm hỏng code, làm sao khôi phục?

**Giải pháp:**
1. **Nếu chưa commit Git:**
   - Trong VS Code, mở Source Control (Ctrl + Shift + G)
   - Click chuột phải vào file bị lỗi → **Discard Changes**

2. **Nếu đã commit:**
   - Xem lại lịch sử commit
   - Restore về commit trước đó

3. **Cách an toàn nhất:**
   - Trước khi sửa code, tạo một nhánh Git mới
   - Nếu sửa lỗi, có thể quay lại nhánh cũ

### ❓ Làm sao tìm đoạn code cần sửa?

**Cách 1: Tìm kiếm theo text**
- Nhấn **Ctrl + Shift + F** trong VS Code
- Gõ đoạn text cần tìm (ví dụ: "Vé Tàu Việt")
- VS Code sẽ hiện tất cả file chứa text đó

**Cách 2: Tìm theo tên file**
- Nhấn **Ctrl + P**
- Gõ tên file cần tìm (ví dụ: "Header.tsx")

**Cách 3: Tìm theo component**
- Mở file `page.tsx` của trang cần sửa
- Xem các component được import
- Mở file component tương ứng

### ❓ Website báo lỗi "Module not found", phải làm sao?

**Nguyên nhân:** Thiếu thư viện hoặc đường dẫn import sai

**Giải pháp:**
1. Chạy lại `npm install`
2. Kiểm tra đường dẫn import có đúng không
3. Khởi động lại server (`npm run dev`)

### ❓ File nào là quan trọng nhất không được xóa?

**Các file quan trọng:**
- `package.json` → Thông tin dự án và thư viện
- `src/app/layout.tsx` → Bố cục chung
- `src/app/globals.css` → Style toàn cục
- `src/context/CartContext.tsx` → Quản lý giỏ hàng

> **Lưu ý:** Nếu không chắc chắn, đừng xóa bất kỳ file nào!

### ❓ Làm sao để hiểu code người khác viết?

**Mẹo:**
1. **Đọc comment:** Các file đã được comment tiếng Việt chi tiết
2. **Xem cấu trúc:** Hiểu component nào làm gì
3. **Thử sửa nhỏ:** Đổi text, màu sắc để xem thay đổi
4. **Hỏi team leader:** Đừng ngại hỏi khi không hiểu!

### ❓ Tôi muốn thêm tính năng mới, bắt đầu từ đâu?

**Quy trình gợi ý:**
1. **Phác thảo:** Viết ra tính năng cần làm
2. **Tìm hiểu:** Xem tính năng tương tự đã có
3. **Tạo nhánh Git mới:** Để dễ quay lại nếu lỗi
4. **Code từng bước nhỏ:** Không làm quá nhiều cùng lúc
5. **Test thường xuyên:** Sau mỗi thay đổi, kiểm tra luôn
6. **Hỏi team:** Nếu gặp khó khăn

---

## 8. SO SÁNH CÔNG NGHỆ: Kiến thức học vs Dự án thực tế

> **Mục đích**: Giúp các bạn hiểu rõ mối liên hệ giữa những gì đã học với những gì đang áp dụng trong dự án, để tự tin trình bày với thầy.

### 📊 Bảng so sánh tổng quan

| Công nghệ đã học | Công nghệ trong dự án | Tỷ lệ áp dụng | Ghi chú |
|------------------|----------------------|---------------|---------|
| **React** | React 19 | ✅ 100% | Hoàn toàn khớp! |
| **Responsive Web Design** | Tailwind CSS (responsive) | ✅ 95% | Áp dụng đầy đủ |
| **Advanced JavaScript** | TypeScript + Modern JS | ✅ 110% | Nâng cao hơn! |
| **Bootstrap 3** | Tailwind CSS 4 | 🟡 80% | Framework tương tự |
| **Sass** | CSS Variables | 🟡 70% | Concept giống nhau |
| **jQuery** | React (thay thế) | ❌ 0% | Có lý do chính đáng |

### ✅ **1. REACT - ÁP DỤNG HOÀN TOÀN**

#### Kiến thức đã học
- Component-based architecture (kiến trúc dựa trên component)
- State management (quản lý trạng thái)
- Props và composition
- Lifecycle và Hooks

#### Áp dụng trong dự án
**✨ Ví dụ cụ thể từ code:**

```tsx
// File: src/components/Header.tsx
'use client';

import { useState } from 'react';      // Hook quản lý state
import { useCart } from '@/context/CartContext';  // Custom Hook

export default function Header() {
  // State để quản lý menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Lấy dữ liệu giỏ hàng từ Context
  const { cartItems } = useCart();
  
  return (
    // JSX - cú pháp của React
    <header className="bg-xanh-duongdam">
      {/* Component tái sử dụng */}
    </header>
  );
}
```

#### Khi trình bày với thầy
> *"Em có áp dụng React để xây dựng các component như `Header`, `Footer`, `ProductCard`, `Slider`. Ví dụ component `Header` sử dụng `useState` để quản lý menu mobile, và `useContext` để quản lý giỏ hàng toàn cục. React giúp code dễ tái sử dụng và bảo trì."*

---

### ✅ **2. RESPONSIVE WEB DESIGN - ÁP DỤNG HOÀN TOÀN**

#### Kiến thức đã học
- Mobile-first approach
- Media queries
- Flexible layouts (grid, flexbox)
- Breakpoints cho các màn hình khác nhau

#### Áp dụng trong dự án
**✨ Ví dụ cụ thể từ code:**

```tsx
// File: src/components/ProductList.tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

**Giải thích:**
- `grid-cols-1`: Mobile (< 768px) → 1 cột
- `md:grid-cols-2`: Tablet (≥ 768px) → 2 cột  
- `lg:grid-cols-4`: Desktop (≥ 1024px) → 4 cột

```css
/* File: src/app/globals.css - Media queries */
@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
```

#### Khi trình bày với thầy
> *"Website em làm responsive hoàn toàn, tự động thích ứng với mọi kích thước màn hình từ mobile đến desktop. Em sử dụng Tailwind CSS với các breakpoint như `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` để điều chỉnh layout theo màn hình."*

---

### ✅ **3. ADVANCED JAVASCRIPT - NÂNG CAO HƠN**

#### Kiến thức đã học
- ES6+ features (Arrow functions, Destructuring, Spread operator)
- Async/Await
- Array methods (map, filter, reduce)
- Modules (import/export)

#### Áp dụng trong dự án
**✨ TypeScript - JavaScript nâng cao với type safety:**

```typescript
// File: src/types/index.ts
// TypeScript: Định nghĩa kiểu dữ liệu rõ ràng
interface Product {
  id: number;
  name: string;
  route: string;
  originalPrice: number;
  discountedPrice?: number;
  image: string;
  rating: number;
}
```

**✨ Modern JavaScript features:**

```tsx
// File: src/app/page.tsx

// Arrow Function + Destructuring
const { cartItems } = useCart();

// Array map method
{trendingProducts.map((product) => (
  <ProductCard key={product.id} product={product} />
))}

// Spread operator
const updatedCart = [...cartItems, newItem];

// Async/Await (trong Context)
const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Khi trình bày với thầy
> *"Em sử dụng TypeScript - một phiên bản nâng cao của JavaScript với type safety, giúp phát hiện lỗi sớm hơn. Dự án áp dụng đầy đủ các tính năng JS hiện đại như Arrow Functions, Destructuring, Async/Await, và Array Methods như map, filter."*

---

### 🟡 **4. BOOTSTRAP → TAILWIND CSS (Framework tương tự)**

#### Kiến thức đã học: Bootstrap 3
- Grid system (12 columns)
- Pre-built components (buttons, cards, modals)
- Utility classes
- Responsive utilities

#### Dự án sử dụng: Tailwind CSS 4
- Utility-first approach
- Customizable
- Responsive modifiers
- Modern và linh hoạt hơn

**✨ So sánh cụ thể:**

```html
<!-- BOOTSTRAP 3 -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <button class="btn btn-primary btn-lg">Đặt vé ngay</button>
    </div>
  </div>
</div>

<!-- TAILWIND CSS (trong dự án) -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2">
    <button class="bg-xanh-duongdam text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
      Đặt vé ngay
    </button>
  </div>
</div>
```

**Điểm giống nhau:**
- ✅ Đều là CSS framework
- ✅ Đều hỗ trợ responsive design
- ✅ Đều có utility classes
- ✅ Đều có grid system

**Điểm khác:**
- Tailwind linh hoạt hơn, có thể tùy chỉnh mọi thứ
- Bootstrap có sẵn component, Tailwind build từ đầu
- Tailwind file CSS nhỏ hơn (chỉ build những gì dùng)

#### Khi trình bày với thầy
> *"Thay vì Bootstrap, em sử dụng Tailwind CSS - một CSS framework hiện đại hơn. Cả hai đều giúp xây dựng giao diện responsive nhanh chóng, nhưng Tailwind linh hoạt hơn với utility-first approach, phù hợp với React và dễ customize theo design riêng."*

---

### 🟡 **5. SASS → CSS VARIABLES (Concept tương tự)**

#### Kiến thức đã học: Sass
- Variables để quản lý màu sắc, font
- Nesting (lồng CSS)
- Mixins (tái sử dụng code)
- Functions

#### Dự án sử dụng: CSS Variables
- CSS Variables (Custom Properties)
- Global theme management
- Dynamic theming

**✨ So sánh cụ thể:**

```scss
/* SASS (cách học) */
$primary-color: #003366;
$secondary-color: #E6F2FF;

.header {
  background-color: $primary-color;
  
  .nav {
    color: $secondary-color;
  }
}
```

```css
/* CSS VARIABLES (trong dự án) */
/* File: src/app/globals.css */
:root {
  --xanh-duongdam: #003366;
  --xanh-duongnhat: #E6F2FF;
  --do: #CC0000;
  --xam: #f5f5f5;
}

.header {
  background-color: var(--xanh-duongdam);
}

.nav {
  color: var(--xanh-duongnhat);
}
```

**Utility classes sử dụng variables:**

```css
/* File: src/app/globals.css */
.bg-xanh-duongdam {
  background-color: var(--xanh-duongdam);
}

.text-xanh-duongdam {
  color: var(--xanh-duongdam);
}

.btn-primary {
  background-color: var(--xanh-duongdam);
  color: white;
  transition: all 0.3s ease;
}
```

#### Lợi ích tương tự Sass
- ✅ Quản lý màu sắc tập trung
- ✅ Dễ dàng thay đổi theme
- ✅ Tái sử dụng giá trị

#### Khi trình bày với thầy
> *"Em áp dụng CSS Variables để quản lý màu sắc theme toàn cục trong file `globals.css`, tương tự như cách Sass dùng variables. Điều này giúp dễ dàng thay đổi màu sắc của toàn bộ website chỉ bằng việc sửa 1 chỗ."*

---

### ❌ **6. JQUERY - KHÔNG DÙNG (React thay thế)**

#### Tại sao không dùng jQuery?

**jQuery (cách cũ):**
```javascript
// Thao tác DOM trực tiếp
$('#menu-toggle').click(function() {
  $('#menu').toggle();
  $(this).toggleClass('active');
});

// AJAX request
$.ajax({
  url: '/api/products',
  method: 'GET',
  success: function(data) {
    $('#product-list').html(data);
  }
});
```

**React (cách hiện đại trong dự án):**
```tsx
// File: src/components/Header.tsx
import { useState } from 'react';

export default function Header() {
  // State-driven UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        Toggle Menu
      </button>
      
      {/* Conditional rendering */}
      {isMenuOpen && (
        <nav>Menu content</nav>
      )}
    </div>
  );
}
```

**Tại sao React tốt hơn jQuery:**
1. **Declarative vs Imperative**: React mô tả UI như thế nào, jQuery mô tả làm gì
2. **Virtual DOM**: React update hiệu quả hơn
3. **Component-based**: Dễ tái sử dụng và maintain
4. **State management**: Dữ liệu và UI sync tự động

#### Khi trình bày với thầy
> *"Dự án không sử dụng jQuery vì React đã thay thế hầu hết chức năng của jQuery một cách hiện đại hơn. React có Virtual DOM và declarative programming, hiệu quả hơn cách thao tác DOM trực tiếp của jQuery. Tuy nhiên em vẫn hiểu nguyên lý DOM manipulation mà jQuery cung cấp."*

---

### 🎯 **TỔNG KẾT ÁP DỤNG KIẾN THỨC**

#### 📊 Biểu đồ áp dụng

```
React:                    ████████████████████ 100%
Responsive Design:        ███████████████████░  95%
Advanced JavaScript:      █████████████████████ 110% (nâng cao hơn!)
CSS Framework:            ████████████████░░░░  80% (Bootstrap → Tailwind)
CSS Preprocessor:         ██████████████░░░░░░  70% (Sass → CSS Vars)
jQuery:                   ░░░░░░░░░░░░░░░░░░░░   0% (React thay thế)
                        
```

#### ✨ Điểm mạnh khi trình bày

**1. Công nghệ HIỆN ĐẠI HƠN:**
- React 19 (mới nhất 2024)
- TypeScript (JavaScript + Type Safety)
- Tailwind CSS 4 (CSS framework hiện đại)
- Next.js 16 (Framework production-ready)

**2. Áp dụng ĐẦY ĐỦ khái niệm cốt lõi:**
- ✅ Component architecture
- ✅ Responsive design principles
- ✅ State management
- ✅ Modern JavaScript
- ✅ CSS styling và theming

**3. Có SẢN PHẨM THỰC TẾ để demo:**
- Website hoạt động hoàn chỉnh
- Có đầy đủ tính năng thực tế
- Code được tổ chức rõ ràng
- Có documentation (tài liệu này)

---

### 📚 Tài liệu tham khảo thêm
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 💬 Hỗ trợ
- Nếu có thắc mắc, hãy hỏi team leader
- Tạo issue trên GitHub repo của nhóm
- Họp nhóm để cùng thảo luận

---

**Chúc các bạn học tập và làm việc hiệu quả! 🚀**

> *Tài liệu được tạo bởi Team Member - Nhóm 7*  
> *Cập nhật lần cuối: 14/12/2025*
