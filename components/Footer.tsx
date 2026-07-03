import Link from 'next/link';
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 mt-12 border-t-4 border-red-600">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" aria-label="Home" className="inline-block">
              {/* Using brightness/invert to make sure the logo is visible on dark background */}
              <img 
                src="https://ik.imagekit.io/o66qwandt/logo.png.png" 
                alt="HumanTaking Logo" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted source for the latest updates in sports, gaming, and entertainment. Stay ahead with breaking news and exclusive web stories.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-1">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all" aria-label="Youtube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Sports Category */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-600 rounded-full inline-block"></span>
              Sports
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/category/cricket" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Cricket
                </Link>
              </li>
              <li>
                <Link href="/category/wwe" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  WWE Updates
                </Link>
              </li>
              <li>
                <Link href="/category/aew" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  AEW Wrestling
                </Link>
              </li>
              <li>
                <Link href="/category/football" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Football
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trending & Games */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-600 rounded-full inline-block"></span>
              Trending
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/category/free-fire" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Free Fire (Esports)
                </Link>
              </li>
              <li>
                <Link href="/web-stories" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Web Stories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-600 rounded-full inline-block"></span>
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HumanTaking Media. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-gray-700">|</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;