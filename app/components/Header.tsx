"use client"
import Link from 'next/link';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Z-Shop</h1>
        <button 
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 items-center">
            <li><Link href="/" className="text-white hover:text-yellow-300 transition duration-300 block">Trang chủ</Link></li>
            <li><Link href="/gioi-thieu" className="text-white hover:text-yellow-300 transition duration-300 block">Giới thiệu</Link></li>
            <li><Link href="/lien-he" className="text-white hover:text-yellow-300 transition duration-300 block">Liên hệ</Link></li>
            <li>
              <button
                onClick={openAuthModal}
                className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition duration-300 w-full lg:w-auto"
              >
                Đăng nhập
              </button>
            </li>
            <li>
              <Link href="/cart" className="flex items-center text-white hover:text-yellow-300 transition duration-300 block">
                <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
}