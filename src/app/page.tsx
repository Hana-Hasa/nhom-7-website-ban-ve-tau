/* ===================================================================
   PAGE: TRANG CHỦ (HOME PAGE)
   - Trang landing chính của website
   - Bao gồm: Hero slider, Search section, 2 Product lists
   - Mock data cho sản phẩm xu hướng và bán chạy
   - Layout: Header → Main (Slider + Search + Products) → Footer
   =================================================================== */

'use client';

import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import Slider from '@/components/Slider';
import ProductList from '@/components/ProductList';
import Footer from '@/components/Footer';
import SnowfallEffect from '@/components/SnowfallEffect';

// ===== MOCK DATA: SẢN PHẨM XU HƯỚNG =====
// Danh sách các chuyến tàu được quan tâm nhiều
const trendingProducts = [
  {
    id: 1,
    name: "Tàu SE1 - Hà Nội → TP.HCM",
    route: "Ga Hà Nội - Ga Sài Gòn",
    originalPrice: 1850000,
    discountedPrice: 1295000,
    discountPercent: 30,
    image: "/tau-se1.jpg",
    rating: 4,
    totalComments: 156,
    satisfactionRate: 95
  },
  {
    id: 2,
    name: "Tàu SE3 - Hà Nội → Đà Nẵng",
    route: "Ga Hà Nội - Ga Đà Nẵng",
    originalPrice: 980000,
    discountedPrice: 784000,
    discountPercent: 20,
    image: "/tau-se3.jpg",
    rating: 5,
    totalComments: 89,
    satisfactionRate: 98
  },
  {
    id: 3,
    name: "Tàu SP1 - Hà Nội → Lào Cai",
    route: "Ga Hà Nội - Ga Lào Cai",
    originalPrice: 650000,
    image: "/hinh-anh-tau.jpg",
    rating: 4,
    totalComments: 234,
    satisfactionRate: 92
  },
  {
    id: 4,
    name: "Tàu SE5 - TP.HCM → Nha Trang",
    route: "Ga Sài Gòn - Ga Nha Trang",
    originalPrice: 520000,
    discountedPrice: 364000,
    discountPercent: 30,
    image: "/hinh-anh-tau-2.jpg",
    rating: 4,
    totalComments: 67,
    satisfactionRate: 89
  }
];

// ===== MOCK DATA: SẢN PHẨM BÁN CHẠY =====
// Danh sách các chuyến tàu được đặt nhiều nhất
const bestSellingProducts = [
  {
    id: 5,
    name: "Tàu SE7 - Hà Nội → Vinh",
    route: "Ga Hà Nội - Ga Vinh",
    originalPrice: 450000,
    discountedPrice: 360000,
    discountPercent: 20,
    image: "/hinh-anh-tau-3.jpg",
    rating: 5,
    totalComments: 412,
    satisfactionRate: 97
  },
  {
    id: 6,
    name: "Tàu SE9 - TP.HCM → Phan Thiết",
    route: "Ga Sài Gòn - Ga Phan Thiết",
    originalPrice: 280000,
    discountedPrice: 224000,
    discountPercent: 20,
    image: "/hinh-anh-tau-4.jpg",
    rating: 4,
    totalComments: 198,
    satisfactionRate: 91
  },
  {
    id: 7,
    name: "TâuSQN2 - Hà Nội → Quảng Ninh",
    route: "Ga Hà Nội - Ga Hạ Long",
    originalPrice: 380000,
    image: "/hinh-anh-tau-5.jpg",
    rating: 5,
    totalComments: 567,
    satisfactionRate: 96
  },
  {
    id: 8,
    name: "Tàu SPT1 - TP.HCM → Cần Thơ",
    route: "Ga Sài Gòn - Ga Cần Thơ",
    originalPrice: 180000,
    discountedPrice: 144000,
    discountPercent: 20,
    image: "/tau-noi-that.jpg",
    rating: 4,
    totalComments: 289,
    satisfactionRate: 88
  }
];

export default function Home() {
  return (
    // Layout tổng thể: flex column, chiều cao tối thiểu full screen
    <div className="min-h-screen flex flex-col">
      {/* Hiệu ứng tuyết rơi Noel */}
      <SnowfallEffect />

      {/* Header: Thanh điều hướng */}
      <Header />

      {/* Main content area - flex-grow để chiếm hết không gian còn lại */}
      <main className="flex-grow">

        {/* ===== HERO SLIDER - BĂNG CHUYỀN KHUYẾN MÃI ===== */}
        <Slider />

        {/* ===== SEARCH SECTION - FORM TÌM KIẾM CHUYẾN TÀU ===== */}
        <SearchSection />

        {/* ===== PRODUCT LIST: SẢN PHẨM XU HƯỚNG =====
            - Hiển thị 4 chuyến tàu đang được quan tâm */}
        <ProductList
          title="Sản phẩm/Dịch vụ xu hướng"
          products={trendingProducts}
        />

        {/* ===== PRODUCT LIST: SẢN PHẨM BÁN CHẠY =====
            - Hiển thị 4 chuyến tàu bán chạy nhất */}
        <ProductList
          title="Sản phẩm/Dịch vụ bán chạy"
          products={bestSellingProducts}
        />
      </main>

      {/* Footer: Chân trang */}
      <Footer />
    </div>
  );
}
