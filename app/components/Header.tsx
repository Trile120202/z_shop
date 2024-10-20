"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/san-pham/${encodeURIComponent(searchQuery.trim())}`);
      handleSearchCollapse();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(handleSearch, 1500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
            <li className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className={`flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
                  <button
                    type="button"
                    onClick={isSearchExpanded ? handleSearch : handleSearchExpand}
                    className="bg-yellow-300 text-blue-700 p-2 rounded-full hover:bg-yellow-400 transition duration-300 focus:outline-none flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`px-3 py-2 w-full text-black focus:outline-none transition-all duration-300 ${isSearchExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}
                  />
                </div>
              </form>
            </li>
            <li>
              <button
                onClick={openAuthModal}
                className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition duration-300 w-full lg:w-auto flex items-center justify-center"
              >
                Đăng nhập
              </button>
            </li>
            <li>
              <Link href="/gio-hang" className="flex items-center justify-center text-white hover:text-yellow-300 transition duration-300 block">
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