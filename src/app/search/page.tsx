'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const {
    filters,
    sortBy,
    setSortBy,
    filteredAndSortedRoutes,
    statistics,
    updateFilter,
    clearFilters,
    sortOptions,
    stations
  } = useSearchAndFilter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    const search = searchParams.get('search');

    if (from) updateFilter('fromStation', from);
    if (to) updateFilter('toStation', to);
    if (date) updateFilter('departureDate', date);
    if (search) updateFilter('searchTerm', search);
  }, [searchParams, updateFilter]);

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-xam">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-xanh-duongdam mb-2">
              Kết quả tìm kiếm
            </h1>
            {(filters.fromStation || filters.toStation) && (
              <p className="text-gray-600">
                {filters.fromStation || 'Tất cả'} → {filters.toStation || 'Tất cả'}
                {filters.departureDate && `, ngày ${new Date(filters.departureDate).toLocaleDateString('vi-VN')}`}
              </p>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center justify-between"
            >
              <span className="font-medium">Bộ lọc</span>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-do text-white px-2 py-1 rounded-full text-xs">
                  {getActiveFiltersCount()}
                </span>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filter Sidebar - Desktop: Always visible, Mobile: Collapsible */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:col-span-1`}>
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Results */}
            <div className="md:col-span-3">
              {/* Statistics Bar */}
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

              {/* Sort and Clear Filters */}
              <div className="bg-white rounded-lg p-4 mb-4 shadow flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Sắp xếp:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-do hover:underline text-sm font-medium"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                )}
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                  <p className="text-sm font-medium mb-2">Bộ lọc đang áp dụng:</p>
                  <div className="flex flex-wrap gap-2">
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

              {/* Results Grid */}
              {filteredAndSortedRoutes.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div className="bg-white rounded-lg p-8 text-center shadow">
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-xanh-duongdam"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}