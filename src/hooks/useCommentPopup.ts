/**
 * HOOK: useCommentPopup
 * Hook quản lý popup hiển thị thống kê bình luận:
 * - Hiển thị/ẩn popup khi hover vào comment stats
 * - Tính toán vị trí popup tương đối với element
 * - Xử lý click outside để đóng popup
 */

import { useState, useRef, useEffect } from 'react';

/** Interface CommentStats - Thống kê bình luận */
interface CommentStats {
  totalComments: number; // Tổng số bình luận
  averageRating: number; // Đánh giá trung bình
  satisfactionRate: number; // Tỷ lệ hài lòng
}

/**
 * useCommentPopup Hook
 * @param stats - Thống kê bình luận cần hiển thị
 * @returns Object chứa state, position, handlers cho popup
 */
export const useCommentPopup = (stats: CommentStats) => {
  const [showPopup, setShowPopup] = useState(false); // State hiển thị popup
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Vị trí popup trên màn hình
  const popupRef = useRef<HTMLDivElement>(null); // Ref để detect click outside

  /**
   * Handler khi mouse enter vào comment icon
   * - Tính vị trí popup dựa trên element rect
   * - Hiển thị popup
   */
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.right + 10, // Popup hiển thị bên phải element + 10px
      y: rect.top
    });
    setShowPopup(true);
  };

  /**
   * Handler khi mouse leave
   * Ẩn popup
   */
  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  /**
   * useEffect: Xử lý click outside để đóng popup
   * Cleanup listener khi component unmount
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Return các giá trị cần thiết cho component sử dụng hook
  return {
    showPopup,
    position,
    popupRef,
    handleMouseEnter,
    handleMouseLeave,
    stats
  };
};