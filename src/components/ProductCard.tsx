/* ===================================================================
   COMPONENT: PRODUCT CARD - THẺ HIỂN THỊ SẢN PHẨM VÉ TÀU
   - Hiển thị thông tin tuyến đường, giá vé, đánh giá và bình luận
   - Có popup thống kê khi hover vào bình luận
   - Hiệu ứng hover trên hình ảnh và toàn bộ card
   =================================================================== */

'use client';

// Import các thư viện và hooks cần thiết
import { useCommentPopup } from '@/hooks/useCommentPopup';  // Hook quản lý popup thống kê
import Link from 'next/link';  // Component navigation của Next.js

// ===== INTERFACE: ĐỊNH NGHĨA KIỂU DỮ LIỆU SẢN PHẨM =====
// Interface cho đối tượng Product với đầy đủ thông tin vé tàu
interface Product {
  id: number;                     // ID duy nhất của sản phẩm
  name: string;                   // Tên tuyến tàu (vd: "Tàu SE1")
  route: string;                  // Tuyến đường (vd: "TP.HCM - Hà Nội")
  originalPrice: number;          // Giá gốc
  discountedPrice?: number;       // Giá sau giảm (optional)
  discountPercent?: number;       // Phần trăm giảm giá (optional)
  image: string;                  // Đường dẫn hình ảnh
  rating: number;                 // Điểm đánh giá (1-5 sao)
  totalComments: number;          // Tổng số bình luận
  satisfactionRate: number;       // Tỷ lệ hài lòng (%)
}

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface ProductCardProps {
  product: Product;  // Nhận vào 1 đối tượng product
}

export default function ProductCard({ product }: ProductCardProps) {
  // ===== HOOK: QUẢN LÝ POPUP THỐNG KÊ =====
  // Sử dụng custom hook để xử lý hiển thị popup khi hover
  const {
    showPopup,           // State: popup có đang hiện không
    position,            // Vị trí (x, y) của popup
    popupRef,            // Ref để gắn vào DOM element của popup
    handleMouseEnter,    // Handler khi chuột vào vùng bình luận
    handleMouseLeave,    // Handler khi chuột rời khỏi vùng bình luận
    stats                // Dữ liệu thống kê (totalComments, averageRating, satisfactionRate)
  } = useCommentPopup({
    totalComments: product.totalComments,
    averageRating: product.rating,
    satisfactionRate: product.satisfactionRate
  });

  // ===== FUNCTION: RENDER SAO ĐÁNH GIÁ =====
  // Tạo 5 icon sao, tô màu vàng cho số sao tương ứng với rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        // Conditional class: sao thứ i < rating thì màu vàng, còn lại màu xám
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  return (
    /* ===== LAYOUT CHÍNH - CARD CONTAINER =====
       - bg-white: Nền trắng
       - rounded-lg: Bo góc lớn
       - shadow-md: Đổ bóng vừa
       - hover:shadow-xl: Khi hover tăng bóng lên
       - transition-shadow: Hiệu ứng chuyển bóng mượt mà (300ms) */
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

      {/* ===== BLOCK: HÌNH ẢNH SẢN PHẨM =====
          - relative: Để đặt badge giảm giá ở góc
          - overflow-hidden: Clip hình ảnh trong khung
          - h-48: Chiều cao cố định 192px */}
      <div className="relative overflow-hidden h-48">
        {/* Link đến trang chọn ghế */}
        <Link href="/dat-ve/chon-ghe">
          {/* Hình ảnh với hiệu ứng scale khi hover (định nghĩa trong CSS global)
              - product-image class: có transform scale on hover
              - cursor-pointer: Con trỏ chuột dạng pointer */}
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover cursor-pointer"
          />
        </Link>

        {/* ===== BADGE GIẢM GIÁ =====
            - Chỉ hiển thị khi có discountPercent (conditional rendering)
            - absolute top-2 right-2: Đặt ở góc trên phải */}
        {product.discountPercent && (
          <span className="absolute top-2 right-2 bg-do text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* ===== BLOCK: THÔNG TIN SẢN PHẨM =====
          - p-4: Padding 16px mọi phía */}
      <div className="p-4">
        {/* Tên tuyến tàu */}
        <h3 className="text-lg font-semibold text-xanh-duongdam mb-1">
          {product.name}
        </h3>

        {/* Tuyến đường */}
        <p className="text-sm text-gray-600 mb-3">
          {product.route}
        </p>

        {/* ===== BLOCK: GIÁ VÉ =====
            - flex layout để căn giữa các phần tử */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {/* Logic hiển thị giá:
                - Nếu có discountedPrice: hiển thị cả giá gốc (gạch ngang) và giá giảm (màu đỏ)
                - Nếu không: chỉ hiển thị giá gốc (màu xanh) */}
            {product.discountedPrice ? (
              <div className="flex items-center space-x-2">
                {/* Giá gốc bị gạch ngang */}
                <span className="text-gray-400 line-through text-sm">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
                {/* Giá sau giảm màu đỏ, to, đậm */}
                <span className="text-do font-bold text-lg">
                  {product.discountedPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ) : (
              /* Giá gốc khi không có giảm giá */
              <span className="text-xanh-duongdam font-bold text-lg">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>

        {/* ===== BLOCK: ĐÁNH GIÁ VÀ BÌNH LUẬN =====
            - Hiển thị sao đánh giá và số bình luận
            - Có popup thống kê khi hover */}
        <div className="flex items-center justify-between">

          {/* Phần sao đánh giá */}
          <div className="flex items-center space-x-1">
            {/* Render 5 sao với màu tương ứng */}
            {renderStars(product.rating)}
            {/* Hiển thị số điểm */}
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating}.0)
            </span>
          </div>

          {/* ===== BLOCK: BÌNH LUẬN VỚI POPUP =====
              - relative: Để popup absolute position theo element này
              - onMouseEnter/Leave: Trigger hiển thị/ẩn popup */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Nút bình luận với icon và text */}
            <button className="text-sm text-xanh-duongdam hover:underline flex items-center space-x-1">
              {/* Icon bình luận (chat bubble) */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{product.totalComments} bình luận</span>
            </button>

            {/* ===== POPUP THỐNG KÊ =====
                - Chỉ hiển thị khi showPopup = true
                - Position động dựa vào vị trí chuột
                - Tự động đổi sang right nếu gần rìa phải màn hình */}
            {showPopup && (
              <div
                ref={popupRef}
                className="comment-popup show"
                style={{
                  // Logic position: nếu x > ngưỡng thì dùng right, không thì left
                  left: position.x > window.innerWidth - 220 ? 'auto' : position.x,
                  right: position.x > window.innerWidth - 220 ? 0 : 'auto',
                  top: position.y
                }}
              >
                {/* Tiêu đề popup */}
                <h4 className="font-semibold text-xanh-duongdam mb-2">Thống kê đánh giá</h4>

                {/* Nội dung thống kê */}
                <div className="space-y-2 text-sm">
                  {/* Tổng bình luận */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng bình luận:</span>
                    <span className="font-medium">{stats.totalComments}</span>
                  </div>

                  {/* Đánh giá trung bình */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đánh giá trung bình:</span>
                    <div className="flex items-center space-x-1">
                      {/* Render sao làm tròn */}
                      {renderStars(Math.round(stats.averageRating))}
                      <span className="font-medium">{stats.averageRating}.0</span>
                    </div>
                  </div>

                  {/* Tỷ lệ hài lòng */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ hài lòng:</span>
                    <span className="font-medium text-green-600">{stats.satisfactionRate}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== BLOCK: NÚT HÀNH ĐỘNG =====
            - Link đến trang chọn ghế với button full width */}
        <Link href="/dat-ve/chon-ghe" className="block w-full mt-4">
          <button className="w-full btn-primary py-2 rounded-lg font-medium">
            Xem chi tiết
          </button>
        </Link>
      </div>
    </div>
  );
}