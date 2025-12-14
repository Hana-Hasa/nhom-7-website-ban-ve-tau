/* ===================================================================
   COMPONENT: PRODUCT LIST - DANH SÁCH SẢN PHẨM VÉ TÀU
   - Hiển thị grid các ProductCard
   - Responsive: 1-4 cột tùy theo màn hình
   - Tiêu đề với gạch chân màu đỏ trang trí
   - Dùng để hiển thị sections như "Vé Hot", "Khuyến Mãi", v.v.
   =================================================================== */

'use client';

import ProductCard from './ProductCard';

// ===== INTERFACE: ĐỊNH NGHĨA PRODUCT =====
// Cấu trúc dữ liệu cho mỗi sản phẩm vé tàu
interface Product {
  id: number;
  name: string;
  route: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercent?: number;
  image: string;
  rating: number;
  totalComments: number;
  satisfactionRate: number;
}

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface ProductListProps {
  title: string;        // Tiêu đề của section (vd: "Vé Hot Nhất Tuần")
  products: Product[];  // Mảng các sản phẩm cần hiển thị
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    /* ===== SECTION CONTAINER =====
       - py-12: Padding dọc 48px
       - bg-xam: Màu nền xám nhạt */
    <section className="py-12 bg-xam">
      {/* Container giới hạn chiều rộng */}
      <div className="container mx-auto px-4">

        {/* ===== BLOCK: TIÊU ĐỀ SECTION =====
            - text-center: Căn giữa */}
        <div className="text-center mb-8">
          {/* Tiêu đề */}
          <h2 className="text-3xl font-bold text-xanh-duongdam mb-3">
            {title}
          </h2>
          {/* Gạch chân trang trí
              - w-24 h-1: Chiều rộng 96px, cao 4px
              - mx-auto: Căn giữa horizontal */}
          <div className="w-24 h-1 bg-do mx-auto"></div>
        </div>

        {/* ===== GRID: DANH SÁCH CÁC PRODUCT CARD =====
            - grid-cols-1: 1 cột trên mobile
            - md:grid-cols-2: 2 cột trên tablet
            - lg:grid-cols-3: 3 cột trên laptop
            - xl:grid-cols-4: 4 cột trên desktop lớn
            - gap-6: Khoảng cách 24px giữa các cards */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Map qua mảng products và render ProductCard cho mỗi item */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}