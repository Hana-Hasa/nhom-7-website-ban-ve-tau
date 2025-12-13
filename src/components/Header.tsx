'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="bg-xanh-duongdam shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo và tên thương hiệu */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-xanh-duongdam font-bold text-xl">VT</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Vé Tàu Việt</h1>
              <p className="text-xs opacity-90">Mua vé tàu lửa trực tuyến</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-xanh-duongnhat transition-colors">
              Trang chủ
            </Link>
            <Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors">
              Tin tức
            </Link>
            <Link href="/gio-hang" className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-xanh-duongnhat transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-do text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link href="/tai-khoan" className="flex items-center gap-2 text-white hover:text-xanh-duongnhat transition-colors font-medium">
              <div className="w-8 h-8 rounded-full bg-white text-[#003366] flex items-center justify-center font-bold">D</div>
              <span>Dat Nguyen</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-xanh-duongdam py-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2">
                Trang chủ
              </Link>
              <Link href="/tin-tuc" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2">
                Tin tức
              </Link>
              <Link href="/gio-hang" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Giỏ hàng {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
              <Link href="/tai-khoan" className="text-white hover:text-xanh-duongnhat transition-colors px-2 py-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-[#003366] flex items-center justify-center font-bold text-sm">D</div>
                Tài khoản
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}