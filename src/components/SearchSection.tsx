'use client';

import { useState } from 'react';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';
import { useRouter } from 'next/navigation';

export default function SearchSection() {
  const router = useRouter();
  const {
    filters,
    updateFilter,
    handleSearch,
    errors,
    searchHistory,
    stations
  } = useSearchAndFilter();

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');

  const filteredFromStations = stations.filter(station =>
    station.toLowerCase().includes(fromSearchTerm.toLowerCase())
  );

  const filteredToStations = stations.filter(station =>
    station.toLowerCase().includes(toSearchTerm.toLowerCase())
  );

  const handleFromStationSelect = (station: string) => {
    updateFilter('fromStation', station);
    setFromSearchTerm(station);
    setShowFromSuggestions(false);
  };

  const handleToStationSelect = (station: string) => {
    updateFilter('toStation', station);
    setToSearchTerm(station);
    setShowToSuggestions(false);
  };

  const handleSearchClick = () => {
    handleSearch();
    if (errors.length === 0 && (filters.fromStation || filters.toStation || filters.searchTerm)) {
      const params = new URLSearchParams();
      if (filters.fromStation) params.append('from', filters.fromStation);
      if (filters.toStation) params.append('to', filters.toStation);
      if (filters.departureDate) params.append('date', filters.departureDate);
      if (filters.searchTerm) params.append('search', filters.searchTerm);
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleHistoryClick = (historyItem: string) => {
    const [from, to] = historyItem.split(' → ');
    if (from) {
      updateFilter('fromStation', from);
      setFromSearchTerm(from);
    }
    if (to) {
      updateFilter('toStation', to);
      setToSearchTerm(to);
    }
  };

  return (
    <section className="bg-xanh-duongnhat py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-xanh-duongdam text-center mb-8">
            Tìm kiếm chuyến tàu
          </h2>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Basic Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên ga, tên tàu hoặc từ khóa..."
                  value={filters.searchTerm}
                  onChange={(e) => updateFilter('searchTerm', e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                />
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

            {/* Station Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* From Station */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ga đi
                </label>
                <div className="relative">
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
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  {/* Suggestions Dropdown */}
                  {showFromSuggestions && fromSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredFromStations.map((station) => (
                        <button
                          key={station}
                          onClick={() => handleFromStationSelect(station)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
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

              {/* To Station */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ga đến
                </label>
                <div className="relative">
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
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  {/* Suggestions Dropdown */}
                  {showToSuggestions && toSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredToStations.map((station) => (
                        <button
                          key={station}
                          onClick={() => handleToStationSelect(station)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
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

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày đi
                </label>
                <input
                  type="date"
                  value={filters.departureDate}
                  onChange={(e) => updateFilter('departureDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xanh-duongdam focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">{error}</p>
                ))}
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Tìm kiếm gần đây:</p>
                <div className="flex flex-wrap gap-2">
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

            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="w-full btn-primary py-3 rounded-lg font-semibold text-lg"
            >
              Tìm kiếm chuyến tàu
            </button>

            {/* Quick Links */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Hoặc xem các chuyến tàu phổ biến:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <button className="px-3 py-1 text-sm text-xanh-duongdam hover:bg-xanh-duongnhat rounded-full transition-colors">
                  Hà Nội → TP.HCM
                </button>
                <button className="px-3 py-1 text-sm text-xanh-duongdam hover:bg-xanh-duongnhat rounded-full transition-colors">
                  Hà Nội → Đà Nẵng
                </button>
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