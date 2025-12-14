/* ===================================================================
   COMPONENT: SLIDER - BĂNG CHUYỀN KHUYẾN MÃI
   - Hiển thị các banner quảng cáo/khuyến mãi theo dạng slideshow
   - Tự động chuyển slide sau 5 giây
   - Có nút điều hướng (prev/next) và chấm indicator
   - Hiệu ứng fade-in/fade-out mượt mà
   =================================================================== */

'use client';

// Import các hooks cần thiết
import { useState, useEffect } from 'react';

// ===== INTERFACE: ĐỊNH NGHĨA CẤU TRÚC DỮ LIỆU SLIDE =====
interface Slide {
  id: number;                   // ID duy nhất của slide
  title: string;                // Tiêu đề chính (hiển thị to)
  subtitle: string;             // Phụ đề (mô tả ngắn)
  image: string;                // Đường dẫn hình nền
  type: 'khuyen-mai' | 'flash-sale' | 'trung-thu' | 'nam-moi';  // Loại khuyến mãi
}

// ===== DATA: DANH SÁCH CÁC SLIDE =====
// Mảng chứa thông tin các slide sẽ được hiển thị
const slides: Slide[] = [
  {
    id: 1,
    title: 'Giảm giá SÀN 30%',
    subtitle: 'Chương trình khuyến mãi đặc biệt nhân dịp lễ 30/4',
    image: '/banner-giam-gia-ve-tau.jpg',
    type: 'khuyen-mai'
  },
  {
    id: 2,
    title: 'FLASH SALE GIỜ VÀNG',
    subtitle: 'Giảm đến 50% cho các tuyến tàu TP.HCM - Hà Nội',
    image: '/flash-sale-dac-biet.jpg',
    type: 'flash-sale'
  },
  {
    id: 3,
    title: 'Tết Trung Thu - Về Quê Thăm Bố Mẹ',
    subtitle: 'Ưu đãi đặc biệt cho đoàn khách gia đình',
    image: '/trung-thu-bg.jpg',
    type: 'trung-thu'
  },
  {
    id: 4,
    title: 'Chúc Mừng Năm Mới 2025',
    subtitle: 'Mua vé tàu sớm nhận quà hấp dẫn',
    image: '/nam-moi-bg.jpg',
    type: 'nam-moi'
  }
];

export default function Slider() {
  // ===== STATE: INDEX SLIDE HIỆN TẠI =====
  // Quản lý slide nào đang được hiển thị (0-based index)
  const [currentSlide, setCurrentSlide] = useState(0);

  // ===== EFFECT: TỰ ĐỘNG CHUYỂN SLIDE =====
  // Thiết lập interval để tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      // Tính slide tiếp theo: (current + 1) % length để quay vòng
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);  // 5000ms = 5 giây

    // Cleanup: Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  // ===== FUNCTION: ĐI ĐẾN SLIDE CỤ THỂ =====
  // Được gọi khi click vào indicator dots
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // ===== FUNCTION: SLIDE TRƯỚC ĐÓ =====
  // Xử lý nút Previous: lùi về slide trước, quay vòng nếu đang ở đầu
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // ===== FUNCTION: SLIDE KẾ TIẾP =====
  // Xử lý nút Next: tiến lên slide sau, quay vòng nếu đang ở cuối
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    /* ===== LAYOUT CHÍNH - SLIDER CONTAINER =====
       - relative: Để các controls (nút, dots) position absolute
       - h-[400px] md:h-[500px]: Responsive height (400px mobile, 500px desktop)
       - overflow-hidden: Ẩn phần slide tràn ra ngoài */
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">

      {/* ===== CONTAINER CÁC SLIDE ===== */}
      <div className="relative h-full">
        {/* Map qua từng slide trong mảng */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            /* ===== HIỆU ỨNG FADE IN/OUT =====
               - absolute inset-0: Đặt tất cả slides chồng lên nhau
               - transition-opacity duration-1000: Hiệu ứng chuyển opacity trong 1 giây
               - opacity-100/0: Chỉ slide hiện tại có opacity 100%, các slide khác opacity 0 */
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Container hình nền và nội dung */}
            <div className="relative w-full h-full">
              {/* Hình nền của slide */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* ===== OVERLAY GRADIENT VÀ NỘI DUNG =====
                  - absolute inset-0: Phủ toàn bộ hình nền
                  - bg-gradient-to-r from-black/70: Gradient từ đen trong suốt 70% sang trong suốt
                  - flex items-center: Căn giữa nội dung theo chiều dọc */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="container mx-auto px-4">
                  {/* Wrapper giới hạn chiều rộng nội dung */}
                  <div className="max-w-2xl">

                    {/* ===== BADGE LOẠI KHUYẾN MÃI =====
                        - Màu badge thay đổi theo type
                        - Flash-sale có màu đỏ, các loại khác màu xanh */}
                    <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4 ${slide.type === 'flash-sale' ? 'bg-do' : 'bg-xanh-duongdam'
                      }`}>
                      {/* Hiển thị text tương ứng với type */}
                      {slide.type === 'khuyen-mai' && 'KHUYẾN MÃI'}
                      {slide.type === 'flash-sale' && 'FLASH SALE'}
                      {slide.type === 'trung-thu' && 'TRUNG THU'}
                      {slide.type === 'nam-moi' && 'NĂM MỚI'}
                    </span>

                    {/* Tiêu đề chính
                        - text-3xl md:text-5xl: Responsive font size (3xl trên mobile, 5xl trên desktop) */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h2>

                    {/* Phụ đề */}
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                      {slide.subtitle}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== NÚT ĐIỀU HƯỚNG TRÁI (PREVIOUS) =====
          - absolute left-4 top-1/2: Đặt giữa bên trái
          - -translate-y-1/2: Dịch lên 50% để căn giữa hoàn hảo
          - bg-white/20 backdrop-blur-sm: Nền trắng trong suốt 20% với blur
          - hover:bg-white/30: Tăng opacity khi hover */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        {/* Icon mũi tên trái */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ===== NÚT ĐIỀU HƯỚNG PHẢI (NEXT) =====
          - Tương tự nút Previous nhưng đặt bên phải */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        {/* Icon mũi tên phải */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ===== INDICATOR DOTS =====
          - absolute bottom-4 left-1/2 -translate-x-1/2: Đặt giữa phía dưới
          - flex space-x-2: Sắp xếp ngang với khoảng cách 8px */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {/* Map qua slides để tạo dots */}
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            /* ===== HIỆU ỨNG DOT =====
               - w-3 h-3: Kích thước cơ bản 12x12px
               - Dot hiện tại: bg-white (trắng đầy) và w-8 (rộng hơn)
               - Dot khác: bg-white/50 (trắng mờ 50%)
               - hover:bg-white/75: Tăng độ sáng khi hover */
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}