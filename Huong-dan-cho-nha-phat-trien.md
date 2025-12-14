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
- Vào địa chỉ: `http://localhost:3000/gioi-thieu`
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

## 🎓 LỜI KẾT

Tài liệu này cung cấp những kiến thức cơ bản nhất để bạn có thể:
- ✅ Hiểu cấu trúc dự án
- ✅ Chạy được website trên máy
- ✅ Chỉnh sửa màu sắc, hiệu ứng, layout đơn giản
- ✅ Tạo trang mới
- ✅ Tự tin trình bày với thầy

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

> *Tài liệu được tạo bởi Team Leader - Nhóm 7*  
> *Cập nhật lần cuối: 14/12/2025*
