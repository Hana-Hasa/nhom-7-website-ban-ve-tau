'use client';

import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  type: 'khuyen-mai' | 'flash-sale' | 'trung-thu' | 'nam-moi';
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Giảm giá SÀN 30%',
    subtitle: 'Chương trình khuyến mãi đặc biệt nhân dịp lễ 30/4',
    image: '/api/placeholder/1200/400',
    type: 'khuyen-mai'
  },
  {
    id: 2,
    title: 'FLASH SALE GIỜ VÀNG',
    subtitle: 'Giảm đến 50% cho các tuyến tàu TP.HCM - Hà Nội',
    image: '/api/placeholder/1200/400',
    type: 'flash-sale'
  },
  {
    id: 3,
    title: 'Tết Trung Thu - Về Quê Thăm Bố Mẹ',
    subtitle: 'Ưu đãi đặc biệt cho đoàn khách gia đình',
    image: '/api/placeholder/1200/400',
    type: 'trung-thu'
  },
  {
    id: 4,
    title: 'Chúc Mừng Năm Mới 2025',
    subtitle: 'Mua vé tàu sớm nhận quà hấp dẫn',
    image: '/api/placeholder/1200/400',
    type: 'nam-moi'
  }
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4 ${
                      slide.type === 'flash-sale' ? 'bg-do' : 'bg-xanh-duongdam'
                    }`}>
                      {slide.type === 'khuyen-mai' && 'KHUYẾN MÃI'}
                      {slide.type === 'flash-sale' && 'FLASH SALE'}
                      {slide.type === 'trung-thu' && 'TRUNG THU'}
                      {slide.type === 'nam-moi' && 'NĂM MỚI'}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                      {slide.subtitle}
                    </p>
                    <button className="btn-primary px-8 py-3 rounded-lg text-lg font-semibold">
                      Đặt vé ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}