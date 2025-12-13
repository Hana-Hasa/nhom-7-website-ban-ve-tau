'use client';

import { useCommentPopup } from '@/hooks/useCommentPopup';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    showPopup,
    position,
    popupRef,
    handleMouseEnter,
    handleMouseLeave,
    stats
  } = useCommentPopup({
    totalComments: product.totalComments,
    averageRating: product.rating,
    satisfactionRate: product.satisfactionRate
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image with hover effect */}
      <div className="relative overflow-hidden h-48">
        <Link href="/dat-ve/chon-ghe">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover cursor-pointer"
          />
        </Link>
        {product.discountPercent && (
          <span className="absolute top-2 right-2 bg-do text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-xanh-duongdam mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {product.route}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountedPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through text-sm">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-do font-bold text-lg">
                  {product.discountedPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ) : (
              <span className="text-xanh-duongdam font-bold text-lg">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>

        {/* Rating and Comments with hover popup */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating}.0)
            </span>
          </div>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-sm text-xanh-duongdam hover:underline flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{product.totalComments} bình luận</span>
            </button>

            {/* Popup thống kê */}
            {showPopup && (
              <div
                ref={popupRef}
                className="comment-popup show"
                style={{
                  left: position.x > window.innerWidth - 220 ? 'auto' : position.x,
                  right: position.x > window.innerWidth - 220 ? 0 : 'auto',
                  top: position.y
                }}
              >
                <h4 className="font-semibold text-xanh-duongdam mb-2">Thống kê đánh giá</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng bình luận:</span>
                    <span className="font-medium">{stats.totalComments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đánh giá trung bình:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(Math.round(stats.averageRating))}
                      <span className="font-medium">{stats.averageRating}.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ hài lòng:</span>
                    <span className="font-medium text-green-600">{stats.satisfactionRate}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href="/dat-ve/chon-ghe" className="block w-full mt-4">
          <button className="w-full btn-primary py-2 rounded-lg font-medium">
            Xem chi tiết
          </button>
        </Link>
      </div>
    </div>
  );
}