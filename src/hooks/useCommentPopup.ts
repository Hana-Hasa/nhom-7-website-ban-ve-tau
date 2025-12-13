import { useState, useRef, useEffect } from 'react';

interface CommentStats {
  totalComments: number;
  averageRating: number;
  satisfactionRate: number;
}

export const useCommentPopup = (stats: CommentStats) => {
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.right + 10,
      y: rect.top
    });
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    showPopup,
    position,
    popupRef,
    handleMouseEnter,
    handleMouseLeave,
    stats
  };
};