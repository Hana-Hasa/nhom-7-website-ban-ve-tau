/* ===================================================================
   PAGE: TRANG TÌM KIẾM (SEARCH PAGE)
   - Trang hiển thị kết quả tìm kiếm chuyến tàu
   - Bộ lọc đa tiêu chí (sidebar + mobile toggle)
   - Sắp xếp và thống kê kết quả
   - Grid responsive cho danh sách chuyến tàu
   - Empty state khi không có kết quả
   =================================================================== */

'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';  // Để wrap async component
import { useSearchParams } from 'next/navigation';  // Đọc URL params
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';  // Hook quản lý filter logic

// ===== COMPONENT: SEARCH PAGE CONTENT =====
// Component chính chứa logic và UI của trang tìm kiếm
function SearchPageContent() {
  // ===== HOOKS: LẤY URL PARAMS VÀ FILTER DATA =====
  const searchParams = useSearchParams();  // Đọc params từ URL (?from=...&to=...)

  // Destructure tất cả data và functions từ search/filter hook
  const {
    filters,                    // Object chứa tất cả filter values
    sortBy,                     // Kiểu sắp xếp hiện tại
    setSortBy,                  // Set kiểu sắp xếp
    filteredAndSortedRoutes,    // Danh sách chuyến tàu đã filter + sort
    statistics,                 // Thống kê (min/max giá, số lượng...)
    updateFilter,               // Function cập nhật filter
    clearFilters,               // Function xóa tất cả filters
    sortOptions,                // Danh sách options sắp xếp
    stations                    // Danh sách ga tàu (unused)
  } = useSearchAndFilter();

  // ===== STATE: MOBILE FILTER TOGGLE =====
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ===== EFFECT: SYNC URL PARAMS VỚI FILTERS =====
  // Khi vào trang từ URL có params, tự động set filters tương ứng
  useEffect(() => {
    const from = searchParams.get('from');    // Ga đi
    const to = searchParams.get('to');        // Ga đến
    const date = searchParams.get('date');    // Ngày đi
    const search = searchParams.get('search');  // Từ khóa tìm kiếm

    // Cập nhật filters nếu có params
    if (from) updateFilter('fromStation', from);
    if (to) updateFilter('toStation', to);
    if (date) updateFilter('departureDate', date);
    if (search) updateFilter('searchTerm', search);
  }, [searchParams, updateFilter]);

  // ===== FUNCTION: ĐẾM SỐ FILTERS ĐANG ACTIVE =====
  // Dùng để hiển thị badge số lượng filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.fromStation) count++;
    if (filters.toStation) count++;
    if (filters.departureDate) count++;
    if (filters.carriageTypes.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000000) count++;
    if (filters.timeSlots.length > 0) count++;
    if (filters.carriers.length > 0) count++;
    if (filters.travelTime) count++;
    return count;
  };

  return (
    // Layout chính
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content với nền xám nhạt */}
      <main className="flex-grow bg-xam">
        <div className="container mx-auto px-4 py-8">

          {/* ===== PAGE HEADER - TIÊU ĐỀ VÀ THÔNG TIN TÌM KIẾM ===== */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-xanh-duongdam mb-2">
              Kết quả tìm kiếm
            </h1>
            {/* Hiển thị tuyến đường và ngày nếu có */}
            {(filters.fromStation || filters.toStation) && (
              <p className="text-gray-600">
                {filters.fromStation || 'Tất cả'} → {filters.toStation || 'Tất cả'}
                {filters.departureDate && `, ngày ${new Date(filters.departureDate).toLocaleDateString('vi-VN')}`}
              </p>
            )}
          </div>

          {/* ===== MOBILE FILTER TOGGLE BUTTON =====
              - Chỉ hiện trên mobile (md:hidden)
              - Toggle mở/đóng sidebar filter */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center justify-between"
            >
              <span className="font-medium">Bộ lọc</span>

              {/* Badge số lượng filters active */}
              {getActiveFiltersCount() > 0 && (
                <span className="bg-do text-white px-2 py-1 rounded-full text-xs">
                  {getActiveFiltersCount()}
                </span>
              )}

              {/* Icon mũi tên - xoay 180° khi mở */}
              <svg
                className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* ===== GRID LAYOUT: SIDEBAR + RESULTS =====
              - 1 cột mobile, 4 cột desktop (sidebar 1, results 3) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* ===== FILTER SIDEBAR =====
                - Desktop: Luôn hiện (md:block)
                - Mobile: Toggle ẩn/hiện (hidden khi isFilterOpen=false) */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:col-span-1`}>
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>

            {/* ===== RESULTS AREA ===== */}
            <div className="md:col-span-3">

              {/* ===== STATISTICS BAR - THỐNG KÊ KẾT QUẢ =====
                  - Hiển thị tổng số chuyến, giá min/max, giờ sớm/muộn nhất */}
              {statistics && (
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span>
                        <strong>{statistics.totalRoutes}</strong> chuyến tàu
                      </span>
                      <span>
                        Giá: <strong>{statistics.minPrice.toLocaleString('vi-VN')}đ</strong> - <strong>{statistics.maxPrice.toLocaleString('vi-VN')}đ</strong>
                      </span>
                      <span>
                        Giờ đi: <strong>{statistics.earliestTime}</strong> - <strong>{statistics.latestTime}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== SORT AND CLEAR CONTROLS =====
                  - Dropdown sắp xếp và nút xóa filters */}
              <div className="bg-white rounded-lg p-4 mb-4 shadow flex flex-wrap items-center justify-between gap-4">
                {/* Dropdown sắp xếp */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Sắp xếp:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                  >
                    {/* Map qua sort options */}
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nút xóa tất cả filters - chỉ hiện khi có filters active */}
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-do hover:underline text-sm font-medium"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                )}
              </div>

              {/* ===== ACTIVE FILTERS BADGES =====
                  - Hiển thị các filters đang active dưới dạng badges
                  - Mỗi badge có nút X để xóa riêng lẻ */}
              {getActiveFiltersCount() > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                  <p className="text-sm font-medium mb-2">Bộ lọc đang áp dụng:</p>
                  <div className="flex flex-wrap gap-2">
                    {/* Badge ga đi */}
                    {filters.fromStation && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-xanh-duongnhat text-xanh-duongdam rounded-full text-sm">
                        Ga đi: {filters.fromStation}
                        <button
                          onClick={() => updateFilter('fromStation', '')}
                          className="hover:text-xanh-duongdam/80"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {/* Badge ga đến */}
                    {filters.toStation && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-xanh-duongnhat text-xanh-duongdam rounded-full text-sm">
                        Ga đến: {filters.toStation}
                        <button
                          onClick={() => updateFilter('toStation', '')}
                          className="hover:text-xanh-duongdam/80"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {/* Badge ngày đi */}
                    {filters.departureDate && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-xanh-duongnhat text-xanh-duongdam rounded-full text-sm">
                        Ngày: {new Date(filters.departureDate).toLocaleDateString('vi-VN')}
                        <button
                          onClick={() => updateFilter('departureDate', '')}
                          className="hover:text-xanh-duongdam/80"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ===== RESULTS GRID / EMPTY STATE =====
                  - Nếu có kết quả: Hiển thị grid ProductCard
                  - Nếu không có: Hiển thị empty state với icon và message */}
              {filteredAndSortedRoutes.length > 0 ? (
                // Grid kết quả: 1 cột mobile, 2 cột desktop, 3 cột xl
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Map qua từng route và render ProductCard */}
                  {filteredAndSortedRoutes.map((route) => (
                    <ProductCard key={route.id} product={{
                      id: route.id,
                      name: route.name,
                      route: `${route.fromStation} - ${route.toStation}`,
                      originalPrice: route.originalPrice || route.price,
                      discountedPrice: route.discountedPrice ? route.price : undefined,
                      discountPercent: route.discountPercent,
                      image: route.image,
                      rating: route.rating,
                      totalComments: route.totalComments,
                      satisfactionRate: route.satisfactionRate
                    }} />
                  ))}
                </div>
              ) : (
                // Empty state - không có kết quả
                <div className="bg-white rounded-lg p-8 text-center shadow">
                  {/* Icon buồn */}
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Không tìm thấy chuyến tàu nào phù hợp
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
                  </p>
                  {/* Nút xóa bộ lọc */}
                  <button
                    onClick={clearFilters}
                    className="btn-primary px-6 py-2 rounded-lg"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ===== EXPORT DEFAULT: WRAPPER VỚI SUSPENSE =====
// Wrap SearchPageContent trong Suspense để handle async operations (useSearchParams)
export default function SearchPage() {
  return (
    <Suspense fallback={
      // Loading state khi đang chờ async data
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Spinner loading */}
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-xanh-duongdam"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}