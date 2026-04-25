"use client";

/**
 * Header — the top navigation bar for HumanTaking.
 * Supports mobile hamburger menu and dark mode toggle.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { AuthFetchingBackend, AuthLogOut } from '@/lib/readux/authFetching';
import type { AppDispatch, RootState } from '@/lib/readux/store';
import ThemeToggle from './ui/ThemeToggle';
import { Menu, X, Search } from 'lucide-react';

const NAV_TABS = [
  { label: 'Home',       href: '/' },
  { label: 'Cricket',   href: '/category/cricket' },
  { label: 'WWE',       href: '/category/wwe' },
  { label: 'AEW',       href: '/category/aew' },
  { label: 'Free Fire', href: '/category/free-fire' },
  { label: 'Football',  href: '/category/football' },
  { label: 'Web Stories', href: '/web-stories' },
];

const SearchBar = () => (
  <div className="flex-1 max-w-lg mx-4 hidden sm:block">
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-full px-4 py-2 border border-transparent focus-within:border-red-400 focus-within:bg-white dark:focus-within:bg-gray-900">
      <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" />
      <input
        type="search"
        placeholder="Search topics..."
        className="bg-transparent text-sm text-[var(--color-headline)] placeholder-gray-400 dark:placeholder-gray-500 outline-none w-full"
        aria-label="Search news"
      />
    </div>
  </div>
);

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(AuthFetchingBackend());
  }, [dispatch]);

  const handleLogout = () => dispatch(AuthLogOut());

  // Close mobile menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-divider)] shadow-sm transition-colors">
      <div className="flex items-center px-4 py-2 max-w-[1280px] mx-auto gap-2">
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden p-2 -ml-2 text-[var(--color-meta)] hover:text-[var(--color-headline)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="HumanTaking home">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
            H
          </span>
          <span className="text-lg font-black text-[var(--color-headline)] tracking-tight hidden sm:block">
            Human<span className="text-red-600">Taking</span>
          </span>
        </Link>

        <SearchBar />

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <ThemeToggle />
          
          {data ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600 flex items-center justify-center text-[var(--color-headline)] hover:ring-2 ring-red-500 transition-all"
                aria-label="User menu"
              >
                {data.profileImage ? (
                  <img src={data.profileImage} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold">{data.username?.[0]?.toUpperCase() || 'U'}</span>
                )}
              </button>
              
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div>
                  <div className="absolute top-12 right-0 w-[80vw] sm:w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-[var(--color-divider)] p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="flex flex-col gap-1 pb-4 border-b border-[var(--color-divider)]">
                      <span className="font-bold text-[var(--color-headline)] text-xl truncate">{data.fullname || data.username}</span>
                      <span className="text-sm font-medium text-red-500 truncate">@{data.username}</span>
                      {data.email && <span className="text-sm text-[var(--color-meta)] truncate">{data.email}</span>}
                    </div>
                    
                    {/* Placeholder space for the user to add "other things" later */}
                    <div className="py-2">
                        {/* More options can go here */}
                    </div>
                    
                    <button
                      onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                      }}
                      className="w-full text-center text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 py-3 rounded-xl transition-opacity mt-auto"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-full transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Nav Tabs */}
      <nav className="hidden md:block border-t border-[var(--color-divider)] overflow-x-auto scrollbar-hide">
        <ul className="flex items-center px-4 max-w-[1280px] mx-auto text-nowrap">
          {NAV_TABS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    inline-block px-4 py-2.5 text-sm font-semibold transition-colors relative
                    ${isActive
                      ? 'text-red-600 dark:text-red-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-red-600 dark:after:bg-red-500 after:rounded-t-full'
                      : 'text-[var(--color-meta)] hover:text-[var(--color-headline)] hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Drawer Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[var(--color-divider)] bg-[var(--color-bg)] shadow-lg absolute w-full left-0">
          <ul className="flex flex-col py-2">
            {NAV_TABS.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      block px-6 py-3 text-sm font-semibold transition-colors
                      ${isActive
                        ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-600 dark:border-red-500'
                        : 'text-[var(--color-headline)] hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent'
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;