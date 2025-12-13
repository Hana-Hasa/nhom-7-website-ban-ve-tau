'use client';

import { useState, useEffect, useMemo } from 'react';

export interface SearchFilters {
  fromStation: string;
  toStation: string;
  departureDate: string;
  carriageTypes: string[];
  priceRange: [number, number];
  timeSlots: string[];
  carriers: string[];
  travelTime: string;
  searchTerm: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface TrainRoute {
  id: number;
  name: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercent?: number;
  carrier: string;
  carriageTypes: string[];
  travelTime: string;
  rating: number;
  totalComments: number;
  satisfactionRate: number;
  image: string;
}

const mockTrainRoutes: TrainRoute[] = [
  {
    id: 1,
    name: "Tàu SE1 - Hà Nội → TP.HCM",
    fromStation: "Hà Nội",
    toStation: "TP.HCM",
    departureTime: "06:00",
    arrivalTime: "06:15",
    price: 1295000,
    originalPrice: 1850000,
    discountPercent: 30,
    carrier: "Vật tư - Giao thông",
    carriageTypes: ["Giường nằm điều hòa", "Ngồi điều hòa"],
    travelTime: "30 giờ 15 phút",
    rating: 4,
    totalComments: 156,
    satisfactionRate: 95,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Tàu SE3 - Hà Nội → Đà Nẵng",
    fromStation: "Hà Nội",
    toStation: "Đà Nẵng",
    departureTime: "19:30",
    arrivalTime: "09:45",
    price: 784000,
    originalPrice: 980000,
    discountPercent: 20,
    carrier: "Sắt Thép Việt Nam",
    carriageTypes: ["Giường nằm điều hòa", "Ngồi cứng"],
    travelTime: "14 giờ 15 phút",
    rating: 5,
    totalComments: 89,
    satisfactionRate: 98,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Tàu SP1 - Hà Nội → Lào Cai",
    fromStation: "Hà Nội",
    toStation: "Lào Cai",
    departureTime: "21:45",
    arrivalTime: "05:30",
    price: 650000,
    carrier: "Vật tư - Giao thông",
    carriageTypes: ["Ngồi mềm điều hòa", "Giường nằm"],
    travelTime: "7 giờ 45 phút",
    rating: 4,
    totalComments: 234,
    satisfactionRate: 92,
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Tàu SE5 - TP.HCM → Nha Trang",
    fromStation: "TP.HCM",
    toStation: "Nha Trang",
    departureTime: "08:30",
    arrivalTime: "16:20",
    price: 364000,
    originalPrice: 520000,
    discountPercent: 30,
    carrier: "Vật tư - Giao thông",
    carriageTypes: ["Ngồi điều hòa", "Ngồi cứng"],
    travelTime: "7 giờ 50 phút",
    rating: 4,
    totalComments: 67,
    satisfactionRate: 89,
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Tàu SE7 - Hà Nội → Vinh",
    fromStation: "Hà Nội",
    toStation: "Vinh",
    departureTime: "23:00",
    arrivalTime: "04:30",
    price: 360000,
    originalPrice: 450000,
    discountPercent: 20,
    carrier: "Sắt Thép Việt Nam",
    carriageTypes: ["Giường nằm", "Ngồi mềm"],
    travelTime: "5 giờ 30 phút",
    rating: 5,
    totalComments: 412,
    satisfactionRate: 97,
    image: "/api/placeholder/300/200"
  }
];

export const useSearchAndFilter = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    fromStation: '',
    toStation: '',
    departureDate: '',
    carriageTypes: [],
    priceRange: [0, 2000000],
    timeSlots: [],
    carriers: [],
    travelTime: '',
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState<string>('departure-time-asc');
  const [errors, setErrors] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const stations = [
    "Hà Nội", "TP.HCM", "Đà Nẵng", "Nha Trang", "Vinh",
    "Lào Cai", "Huế", "Quảng Ninh", "Hải Phòng", "Cần Thơ"
  ];

  const sortOptions: SortOption[] = [
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
    { value: 'departure-time-asc', label: 'Giờ đi: Sớm nhất' },
    { value: 'departure-time-desc', label: 'Giờ đi: Muộn nhất' },
    { value: 'rating-desc', label: 'Đánh giá: Cao nhất' }
  ];

  const carriageTypeOptions = [
    "Giường nằm điều hòa",
    "Giường nằm",
    "Ngồi mềm điều hòa",
    "Ngồi điều hòa",
    "Ngồi mềm",
    "Ngồi cứng"
  ];

  const carrierOptions = [
    "Vật tư - Giao thông",
    "Sắt Thép Việt Nam"
  ];

  const timeSlotOptions = [
    { value: "morning", label: "Sáng (6:00 - 12:00)" },
    { value: "afternoon", label: "Chiều (12:00 - 18:00)" },
    { value: "evening", label: "Tối (18:00 - 24:00)" },
    { value: "night", label: "Đêm (0:00 - 6:00)" }
  ];

  const travelTimeOptions = [
    { value: "under-6", label: "Dưới 6 giờ" },
    { value: "6-12", label: "6 - 12 giờ" },
    { value: "over-12", label: "Trên 12 giờ" }
  ];

  const filteredAndSortedRoutes = useMemo(() => {
    let filtered = mockTrainRoutes.filter(route => {
      // Text search
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchSearch =
          route.name.toLowerCase().includes(searchLower) ||
          route.fromStation.toLowerCase().includes(searchLower) ||
          route.toStation.toLowerCase().includes(searchLower);
        if (!matchSearch) return false;
      }

      // Station filters
      if (filters.fromStation && route.fromStation !== filters.fromStation) return false;
      if (filters.toStation && route.toStation !== filters.toStation) return false;

      // Carriage type filter
      if (filters.carriageTypes.length > 0) {
        const hasMatchingCarriage = filters.carriageTypes.some(type =>
          route.carriageTypes.includes(type)
        );
        if (!hasMatchingCarriage) return false;
      }

      // Price range filter
      if (route.price < filters.priceRange[0] || route.price > filters.priceRange[1]) return false;

      // Carrier filter
      if (filters.carriers.length > 0 && !filters.carriers.includes(route.carrier)) return false;

      // Time slot filter
      if (filters.timeSlots.length > 0) {
        const departureHour = parseInt(route.departureTime.split(':')[0]);
        const inTimeSlot = filters.timeSlots.some(slot => {
          if (slot === 'morning') return departureHour >= 6 && departureHour < 12;
          if (slot === 'afternoon') return departureHour >= 12 && departureHour < 18;
          if (slot === 'evening') return departureHour >= 18 && departureHour < 24;
          if (slot === 'night') return departureHour >= 0 && departureHour < 6;
          return false;
        });
        if (!inTimeSlot) return false;
      }

      // Travel time filter
      if (filters.travelTime) {
        const hours = parseInt(route.travelTime.split(' ')[0]);
        if (filters.travelTime === 'under-6' && hours >= 6) return false;
        if (filters.travelTime === '6-12' && (hours < 6 || hours > 12)) return false;
        if (filters.travelTime === 'over-12' && hours <= 12) return false;
      }

      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'departure-time-asc':
          return a.departureTime.localeCompare(b.departureTime);
        case 'departure-time-desc':
          return b.departureTime.localeCompare(a.departureTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const validateSearch = () => {
    const newErrors: string[] = [];

    if (filters.fromStation && !filters.toStation) {
      newErrors.push('Vui lòng chọn ga đến');
    }

    if (filters.toStation && !filters.fromStation) {
      newErrors.push('Vui lòng chọn ga đi');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSearch = () => {
    if (validateSearch()) {
      const searchQuery = `${filters.fromStation} → ${filters.toStation}`;
      if (filters.fromStation && filters.toStation) {
        setSearchHistory(prev => {
          const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)];
          return newHistory.slice(0, 5); // Keep only last 5 searches
        });
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      fromStation: '',
      toStation: '',
      departureDate: '',
      carriageTypes: [],
      priceRange: [0, 2000000],
      timeSlots: [],
      carriers: [],
      travelTime: '',
      searchTerm: ''
    });
    setErrors([]);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatistics = useMemo(() => {
    const routes = filteredAndSortedRoutes;
    if (routes.length === 0) return null;

    const prices = routes.map(r => r.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const earliestTime = routes.reduce((earliest, route) =>
      route.departureTime < earliest ? route.departureTime : earliest,
      routes[0].departureTime
    );
    const latestTime = routes.reduce((latest, route) =>
      route.departureTime > latest ? route.departureTime : latest,
      routes[0].departureTime
    );

    return {
      totalRoutes: routes.length,
      minPrice,
      maxPrice,
      earliestTime,
      latestTime
    };
  }, [filteredAndSortedRoutes]);

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    errors,
    searchHistory,
    filteredAndSortedRoutes,
    statistics: getStatistics,
    handleSearch,
    clearFilters,
    updateFilter,
    validateSearch,
    stations,
    sortOptions,
    carriageTypeOptions,
    carrierOptions,
    timeSlotOptions,
    travelTimeOptions
  };
};