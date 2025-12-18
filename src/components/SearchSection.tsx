/* ===================================================================
   COMPONENT: SEARCH SECTION - FORM TÌM KIẾM CHUYẾN TÀU
   - Form tìm kiếm ga đi, ga đến, ngày đi
   - Autocomplete cho việc chọn ga tàu
   - Lưu và hiển thị lịch sử tìm kiếm
   - Validation và hiển thị lỗi
   - Navigation đến trang kết quả tìm kiếm
   =================================================================== */

'use client';

// Import các thư viện và hooks cần thiết
import { useState } from 'react';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';  // Hook quản lý logic tìm kiếm
import { useRouter } from 'next/navigation';  // Hook điều hướng của Next.js

export default function SearchSection() {
  // ===== ROUTER: ĐIỀU HƯỚNG TRANG =====
  const router = useRouter();

  // ===== CUSTOM HOOK: SEARCH AND FILTER =====
  // Lấy các giá trị và functions từ custom hook
  const {
    filters,          // Object chứa các filter hiện tại
    updateFilter,     // Function cập nhật filter
    handleSearch,     // Function xử lý tìm kiếm (validation)
    errors,           // Mảng lỗi validation
    searchHistory,    // Lịch sử tìm kiếm
    stations          // Danh sách tất cả các ga tàu
  } = useSearchAndFilter();

  // ===== STATE MANAGEMENT - AUTOCOMPLETE =====
  // State quản lý hiển thị dropdown suggestions
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);  // Dropdown ga đi
  const [showToSuggestions, setShowToSuggestions] = useState(false);      // Dropdown ga đến

  // State lưu giá trị tìm kiếm trong input (cho autocomplete)
  const [fromSearchTerm, setFromSearchTerm] = useState('');  // Từ khóa tìm ga đi
  const [toSearchTerm, setToSearchTerm] = useState('');      // Từ khóa tìm ga đến

  // ===== FILTER: LỌC DANH SÁCH GA THEO TỪ KHÓA =====
  // Lọc danh sách ga đi dựa trên từ khóa người dùng nhập
  const filteredFromStations = stations.filter(station =>
    station.toLowerCase().includes(fromSearchTerm.toLowerCase())
  );

  // Lọc danh sách ga đến dựa trên từ khóa người dùng nhập
  const filteredToStations = stations.filter(station =>
    station.toLowerCase().includes(toSearchTerm.toLowerCase())
  );

  // ===== FUNCTION: XỬ LÝ CHỌN GA ĐI =====
  // Được gọi khi user click chọn một ga từ dropdown suggestions
  const handleFromStationSelect = (station: string) => {
    updateFilter('fromStation', station);  // Cập nhật filter
    setFromSearchTerm(station);            // Cập nhật input value
    setShowFromSuggestions(false);         // Đóng dropdown
  };

  // ===== FUNCTION: XỬ LÝ CHỌN GA ĐẾN =====
  // Tương tự handleFromStationSelect nhưng cho ga đến
  const handleToStationSelect = (station: string) => {
    updateFilter('toStation', station);
    setToSearchTerm(station);
    setShowToSuggestions(false);
  };

  // ===== FUNCTION: XỬ LÝ NÚT TÌM KIẾM =====
  // Validate và điều hướng đến trang kết quả
  const handleSearchClick = () => {
    handleSearch();  // Chạy validation từ hook

    // Nếu không có lỗi và có ít nhất 1 filter được chọn
    if (errors.length === 0 && (filters.fromStation || filters.toStation || filters.searchTerm)) {
      // ===== TẠO URL PARAMS =====
      const params = new URLSearchParams();
      if (filters.fromStation) params.append('from', filters.fromStation);
      if (filters.toStation) params.append('to', filters.toStation);
      if (filters.departureDate) params.append('date', filters.departureDate);
      if (filters.searchTerm) params.append('search', filters.searchTerm);

      // Điều hướng đến trang search với query params
      router.push(`/search?${params.toString()}`);
    }
  };

  // ===== FUNCTION: XỬ LÝ CLICK LỊCH SỬ TÌM KIẾM =====
  // Parse lịch sử và điền vào form
  const handleHistoryClick = (historyItem: string) => {
    // Tách chuỗi "Ga A → Ga B" thành 2 phần
    const [from, to] = historyItem.split(' → ');

    // Điền ga đi nếu có
    if (from) {
      updateFilter('fromStation', from);
      setFromSearchTerm(from);
    }

    // Điền ga đến nếu có
    if (to) {
      updateFilter('toStation', to);
      setToSearchTerm(to);
    }
  };

  return (
    /* ===== LAYOUT CHÍNH - SECTION CONTAINER =====
       - bg-xanh-duongnhat: Màu nền xanh nhạt
       - py-12: Padding dọc 48px */
    <section className="bg-xanh-duongnhat py-12">
      {/* Container giới hạn chiều rộng */}
      <div className="container mx-auto px-4">
        {/* Wrapper giới hạn max-width cho form */}
        <div className="max-w-4xl mx-auto">
          {/* Tiêu đề section */}
          <h2 className="text-3xl font-bold text-xanh-duongdam text-center mb-8">
            Tìm kiếm chuyến tàu
          </h2>

          {/* ===== FORM TÌM KIẾM =====
              - bg-white: Nền trắng
              - rounded-lg shadow-lg: Bo góc và đổ bóng lớn
              - p-6: Padding 24px */}
          <div className="bg-white rounded-lg shadow-lg p-6">

            {/* ===== BLOCK: TÌM KIẾM CƠ BẢN (FREE TEXT) ===== */}
            <div className="mb-6">
              <div className="relative">
                {/* Input tìm kiếm tự do
                    - focus:ring-2: Hiệu ứng ring khi focus
                    - pr-10: Padding phải để chừa chỗ cho icon */}
                <input
                  type="text"
                  placeholder="Nhập tên ga, tên tàu hoặc từ khóa..."
                  value={filters.searchTerm}
                  onChange={(e) => updateFilter('searchTerm', e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                />

                {/* Icon kính lúp (search icon)
                    - absolute right-3 top-3.5: Đặt bên phải input */}
                <svg
                  className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* ===== BLOCK: CHỌN GA VÀ NGÀY ĐI =====
                - grid-cols-1 md:grid-cols-3: 1 cột mobile, 3 cột desktop
                - gap-4: Khoảng cách 16px giữa các ô */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

              {/* ===== COL 1: GA ĐI (FROM STATION) ===== */}
              <div className="relative">
                {/* Label */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ga đi
                </label>

                <div className="relative">
                  {/* Input với autocomplete
                      - value: Hiển thị từ khóa tìm kiếm hoặc ga đã chọn
                      - onChange: Cập nhật từ khóa và hiện suggestions
                      - onFocus: Hiện dropdown khi focus */}
                  <input
                    type="text"
                    placeholder="Chọn ga đi"
                    value={fromSearchTerm || filters.fromStation}
                    onChange={(e) => {
                      setFromSearchTerm(e.target.value);
                      setShowFromSuggestions(true);
                    }}
                    onFocus={() => setShowFromSuggestions(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                  />

                  {/* Icon vị trí (location pin) */}
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  {/* ===== DROPDOWN: SUGGESTIONS GA ĐI =====
                      - Chỉ hiện khi showFromSuggestions = true và có từ khóa
                      - absolute z-10: Đặt trên các element khác
                      - max-h-60 overflow-auto: Giới hạn chiều cao và scroll */}
                  {showFromSuggestions && fromSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {/* Map qua danh sách ga đã lọc */}
                      {filteredFromStations.map((station) => (
                        <button
                          key={station}
                          onClick={() => handleFromStationSelect(station)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-900"
                        >
                          {/* Icon plus/add */}
                          <svg className="inline-block w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ===== COL 2: GA ĐẾN (TO STATION) =====
                  - Cấu trúc tương tự GA ĐI */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ga đến
                </label>

                <div className="relative">
                  {/* Input autocomplete cho ga đến */}
                  <input
                    type="text"
                    placeholder="Chọn ga đến"
                    value={toSearchTerm || filters.toStation}
                    onChange={(e) => {
                      setToSearchTerm(e.target.value);
                      setShowToSuggestions(true);
                    }}
                    onFocus={() => setShowToSuggestions(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                  />

                  {/* Icon vị trí */}
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  {/* Dropdown suggestions ga đến */}
                  {showToSuggestions && toSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredToStations.map((station) => (
                        <button
                          key={station}
                          onClick={() => handleToStationSelect(station)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-900"
                        >
                          <svg className="inline-block w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ===== COL 3: NGÀY ĐI (DEPARTURE DATE) ===== */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày đi
                </label>

                {/* Input date
                    - min: Giới hạn chỉ chọn từ hôm nay trở đi
                    - toISOString().split('T')[0]: Format thành YYYY-MM-DD */}
                <input
                  type="date"
                  value={filters.departureDate}
                  onChange={(e) => updateFilter('departureDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                />
              </div>
            </div>

            {/* ===== BLOCK: HIỂN THỊ LỖI VALIDATION =====
                - Chỉ hiện khi có lỗi (errors.length > 0)
                - bg-red-50: Nền đỏ nhạt
                - border-red-200: Viền đỏ */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                {/* Map qua từng lỗi và hiển thị */}
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">{error}</p>
                ))}
              </div>
            )}

            {/* ===== BLOCK: LỊCH SỬ TÌM KIẾM =====
                - Chỉ hiện khi có lịch sử (searchHistory.length > 0) */}
            {searchHistory.length > 0 && (
              <div className="mb-4">
                {/* Label */}
                <p className="text-sm text-gray-600 mb-2">Tìm kiếm gần đây:</p>

                {/* Container các nút lịch sử
                    - flex-wrap: Xuống dòng khi hết chỗ
                    - gap-2: Khoảng cách 8px */}
                <div className="flex flex-wrap gap-2">
                  {/* Map qua lịch sử và tạo button tags */}
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===== BLOCK: NÚT TÌM KIẾM =====
                - w-full: Full width
                - btn-primary: Class tùy chỉnh (defined in globals.css) */}
            <button
              onClick={handleSearchClick}
              className="w-full btn-primary py-3 rounded-lg font-semibold text-lg"
            >
              Tìm kiếm chuyến tàu
            </button>

            {/* ===== BLOCK: QUICK LINKS - TUYẾN PHỔ BIẾN =====
                - Hiển thị các tuyến tàu phổ biến để user click nhanh */}
            <div className="mt-4 text-center">
              {/* Text mô tả */}
              <p className="text-sm text-gray-600">
                Hoặc xem các chuyến tàu phổ biến:
              </p>

              {/* Container các nút quick links
                  - justify-center: Căn giữa các button */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {/* Button Hà Nội → TP.HCM */}
                <button className="px-3 py-1 text-sm text-xanh-duongdam hover:bg-xanh-duongnhat rounded-full transition-colors">
                  Hà Nội → TP.HCM
                </button>

                {/* Button Hà Nội → Đà Nẵng */}
                <button className="px-3 py-1 text-sm text-xanh-duongdam hover:bg-xanh-duongnhat rounded-full transition-colors">
                  Hà Nội → Đà Nẵng
                </button>

                {/* Button TP.HCM → Nha Trang */}
                <button className="px-3 py-1 text-sm text-xanh-duongdam hover:bg-xanh-duongnhat rounded-full transition-colors">
                  TP.HCM → Nha Trang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}