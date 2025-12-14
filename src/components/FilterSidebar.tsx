/* ===================================================================
   COMPONENT: FILTER SIDEBAR - SIDEBAR BỘ LỌC TÌM KIẾM
   - Bộ lọc đa tiêu chí: loại toa, giá, khung giờ, hãng tàu, thời gian
   - Checkbox filters cho đa lựa chọn
   - Range slider cho khoảng giá
   - Radio buttons cho thời gian di chuyển
   - Responsive: có nút đ

óng trên mobile
   =================================================================== */

'use client';

import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';  // Hook quản lý filter logic

// ===== INTERFACE: PROPS CHO COMPONENT =====
interface FilterSidebarProps {
  isOpen?: boolean;      // Trạng thái mở/đóng (cho mobile)
  onClose?: () => void;  // Callback khi đóng sidebar (mobile)
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  // ===== HOOK: LẤY DỮ LIỆU VÀ FUNCTIONS TỪ SEARCH CONTEXT =====
  const {
    filters,                // Object chứa tất cả filter values hiện tại
    updateFilter,           // Function cập nhật filter
    statistics,             // Thống kê kết quả (unused)
    carriageTypeOptions,    // Danh sách loại toa (Ghế mềm, Giường nằm...)
    carrierOptions,         // Danh sách hãng tàu
    timeSlotOptions,        // Danh sách khung giờ (Sáng, Chiều, Tối...)
    travelTimeOptions       // Danh sách thời gian di chuyển
  } = useSearchAndFilter();

  return (
    // Container sidebar với shadow
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">

      {/* ===== HEADER: TIÊU ĐỀ VÀ NÚT ĐÓNG ===== */}
      <div className="flex items-center justify-between mb-6">
        {/* Tiêu đề */}
        <h3 className="text-lg font-semibold text-xanh-duongdam">Bộ lọc</h3>

        {/* Nút đóng (chỉ hiện trên mobile) */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
          >
            {/* Icon X */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ===== FILTER 1: LOẠI TÒA (CARRIAGE TYPE) ===== */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Loại toa</h4>

        {/* Danh sách checkboxes */}
        <div className="space-y-2">
          {/* Map qua các loại toa */}
          {carriageTypeOptions.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              {/* Checkbox input
                  - checked: Kiểm tra type có trong mảng filters.carriageTypes không
                  - onChange: Thêm/xóa type khỏi mảng khi toggle */}
              <input
                type="checkbox"
                checked={filters.carriageTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Thêm vào mảng
                    updateFilter('carriageTypes', [...filters.carriageTypes, type]);
                  } else {
                    // Xóa khỏi mảng
                    updateFilter('carriageTypes', filters.carriageTypes.filter(t => t !== type));
                  }
                }}
                className="w-4 h-4 text-xanh-duongdam border-gray-300 rounded focus:ring-xanh-duongdam"
              />
              {/* Label text */}
              <span className="ml-2 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== FILTER 2: KHOẢNG GIÁ (PRICE RANGE) ===== */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Khoảng giá</h4>
        <div className="space-y-3">

          {/* Slider giá tối thiểu */}
          <div>
            <label className="text-sm text-gray-600">Giá tối thiểu</label>
            {/* Range input
                - min/max/step: Giới hạn giá trị
                - value: Giá trị hiện tại từ filters.priceRange[0]
                - onChange: Cập nhật priceRange[0], giữ nguyên [1] */}
            <input
              type="range"
              min="0"
              max="2000000"
              step="100000"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
              className="w-full"
            />
            {/* Hiển thị giá trị với format Việt Nam */}
            <span className="text-sm text-gray-600">{filters.priceRange[0].toLocaleString('vi-VN')}đ</span>
          </div>

          {/* Slider giá tối đa */}
          <div>
            <label className="text-sm text-gray-600">Giá tối đa</label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{filters.priceRange[1].toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>

      {/* ===== FILTER 3: KHUNG GIỜ ĐI (TIME SLOT) ===== */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Khung giờ đi</h4>
        <div className="space-y-2">
          {/* Map qua các khung giờ (Sáng, Chiều, Tối...) */}
          {timeSlotOptions.map((slot) => (
            <label key={slot.value} className="flex items-center cursor-pointer">
              {/* Checkbox - logic tương tự carriageTypes */}
              <input
                type="checkbox"
                checked={filters.timeSlots.includes(slot.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter('timeSlots', [...filters.timeSlots, slot.value]);
                  } else {
                    updateFilter('timeSlots', filters.timeSlots.filter(t => t !== slot.value));
                  }
                }}
                className="w-4 h-4 text-xanh-duongdam border-gray-300 rounded focus:ring-xanh-duongdam"
              />
              {/* Hiển thị label (vd: "Sáng (6h-12h)") */}
              <span className="ml-2 text-sm">{slot.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== FILTER 4: HÃNG TÀU (CARRIER) ===== */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Hãng tàu</h4>
        <div className="space-y-2">
          {/* Map qua các hãng tàu */}
          {carrierOptions.map((carrier) => (
            <label key={carrier} className="flex items-center cursor-pointer">
              {/* Checkbox - logic tương tự */}
              <input
                type="checkbox"
                checked={filters.carriers.includes(carrier)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter('carriers', [...filters.carriers, carrier]);
                  } else {
                    updateFilter('carriers', filters.carriers.filter(c => c !== carrier));
                  }
                }}
                className="w-4 h-4 text-xanh-duongdam border-gray-300 rounded focus:ring-xanh-duongdam"
              />
              <span className="ml-2 text-sm">{carrier}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== FILTER 5: THỜI GIAN DI CHUYỂN (TRAVEL TIME) =====
          - Sử dụng radio button vì chỉ chọn 1 trong nhiều option */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Thời gian di chuyển</h4>
        <div className="space-y-2">
          {/* Map qua các option thời gian */}
          {travelTimeOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              {/* Radio input
                  - name: Nhóm radio buttons cùng tên
                  - checked: So sánh với giá trị hiện tại
                  - onChange: Set giá trị mới (không cần toggle như checkbox) */}
              <input
                type="radio"
                name="travelTime"
                checked={filters.travelTime === option.value}
                onChange={() => updateFilter('travelTime', option.value)}
                className="w-4 h-4 text-xanh-duongdam border-gray-300 focus:ring-xanh-duongdam"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== NÚT "ÁP DỤNG BỘ LỌC" (MOBILE) =====
          - Chỉ hiện khi có onClose (mobile mode) */}
      {onClose && (
        <button
          onClick={onClose}
          className="w-full md:hidden btn-primary py-2 rounded-lg"
        >
          Áp dụng bộ lọc
        </button>
      )}
    </div>
  );
}