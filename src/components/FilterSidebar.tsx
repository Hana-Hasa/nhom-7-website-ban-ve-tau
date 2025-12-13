'use client';

import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const {
    filters,
    updateFilter,
    statistics,
    carriageTypeOptions,
    carrierOptions,
    timeSlotOptions,
    travelTimeOptions
  } = useSearchAndFilter();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-xanh-duongdam">Bộ lọc</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Carriage Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Loại toa</h4>
        <div className="space-y-2">
          {carriageTypeOptions.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.carriageTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter('carriageTypes', [...filters.carriageTypes, type]);
                  } else {
                    updateFilter('carriageTypes', filters.carriageTypes.filter(t => t !== type));
                  }
                }}
                className="w-4 h-4 text-xanh-duongdam border-gray-300 rounded focus:ring-xanh-duongdam"
              />
              <span className="ml-2 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Khoảng giá</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Giá tối thiểu</label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="100000"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{filters.priceRange[0].toLocaleString('vi-VN')}đ</span>
          </div>
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

      {/* Time Slot Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Khung giờ đi</h4>
        <div className="space-y-2">
          {timeSlotOptions.map((slot) => (
            <label key={slot.value} className="flex items-center cursor-pointer">
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
              <span className="ml-2 text-sm">{slot.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Carrier Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Hãng tàu</h4>
        <div className="space-y-2">
          {carrierOptions.map((carrier) => (
            <label key={carrier} className="flex items-center cursor-pointer">
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

      {/* Travel Time Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Thời gian di chuyển</h4>
        <div className="space-y-2">
          {travelTimeOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
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

      {/* Mobile Close Button */}
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