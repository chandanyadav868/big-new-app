"use client";

/**
 * Header — the top navigation bar for HumanTaking.
 * Mobile: hamburger (left) + logo + 2 icon buttons (right).
 *         Hamburger dropdown includes nav links, theme toggle, sign-in / profile.
 * Desktop: logo + nav tabs + theme toggle + sign-in / profile avatar.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { AuthFetchingBackend, AuthLogOut } from '@/lib/readux/authFetching';
import type { AppDispatch, RootState } from '@/lib/readux/store';
import { useTheme } from './ui/ThemeProvider';
import { Menu, X, Moon, Sun, LogIn, User, LogOut } from 'lucide-react';

const NAV_TABS = [
  { label: 'Home', href: '/' },
  { label: 'Cricket', href: '/category/cricket' },
  { label: 'WWE', href: '/category/wwe' },
  { label: 'AEW', href: '/category/aew' },
  { label: 'Free Fire', href: '/category/free-fire' },
  { label: 'Football', href: '/category/football' },
  { label: 'Web Stories', href: '/web-stories' },
];

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => { dispatch(AuthFetchingBackend()); }, [dispatch]);

  const handleLogout = () => {
    dispatch(AuthLogOut());
    setUserMenuOpen(false);
  };

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-divider)] shadow-sm transition-colors">
      <div className="flex items-center px-4 py-2 max-w-[1280px] mx-auto gap-2">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="HumanTaking home">
          <img
            src="https://ik.imagekit.io/o66qwandt/logo.png.png"
            alt="HumanTaking Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* ── Right side ── */}
        <div className="ml-auto flex items-center gap-2 shrink-0">

          {/* Desktop-only: theme toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Desktop-only: Sign In or Profile */}
          {data ? (
            <div className="hidden md:block relative">
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
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-[var(--color-divider)] p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="flex flex-col gap-1 pb-4 border-b border-[var(--color-divider)]">
                      <span className="font-bold text-[var(--color-headline)] text-xl truncate">{data.fullname || data.username}</span>
                      <span className="text-sm font-medium text-red-500 truncate">@{data.username}</span>
                      {data.email && <span className="text-sm text-[var(--color-meta)] truncate">{data.email}</span>}
                    </div>
                    <div className="py-2">
                      {/* More options can go here */}
                    </div>
                    <button
                      onClick={handleLogout}
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
              className="hidden md:inline-flex text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-full transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}

          {/* ── Mobile-only: 2 right-side icon buttons ── */}

          {/* Mobile theme toggle icon */}
          <button
            onClick={toggleTheme}
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile: always show Menu icon as the second right-side button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* ── Desktop Nav Tabs ── */}
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

      {/* ── Mobile Dropdown ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <nav className="md:hidden absolute w-full left-0 z-40 bg-[var(--color-bg)] border-t border-[var(--color-divider)] shadow-xl">

            {/* Nav links */}
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

            {/* Divider */}
            <div className="mx-4 border-t border-[var(--color-divider)]" />

            {/* Bottom section: theme + auth */}
            <div className="flex flex-col gap-3 px-4 py-4">

              {/* Dark / Light mode toggle row */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-[var(--color-headline)]"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <>
                    <Moon size={18} className="text-indigo-500" />
                    <span className="text-sm font-semibold">Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun size={18} className="text-yellow-400" />
                    <span className="text-sm font-semibold">Switch to Light Mode</span>
                  </>
                )}
              </button>

              {/* Auth section */}
              {data ? (
                <div className="flex flex-col gap-3">
                  {/* Profile info */}
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-[var(--color-divider)]">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-red-500 flex items-center justify-center shrink-0">
                      {data.profileImage ? (
                        <img src={data.profileImage} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-[var(--color-headline)]">
                          {data.username?.[0]?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-[var(--color-headline)] truncate">{data.fullname || data.username}</span>
                      <span className="text-xs text-red-500 truncate">@{data.username}</span>
                      {data.email && <span className="text-xs text-[var(--color-meta)] truncate">{data.email}</span>}
                    </div>
                  </div>

                  {/* Log out */}
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              ) : (
                /* Sign In button */
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;