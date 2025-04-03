'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white border-b border-zinc-800 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">WhisperLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-between md:space-x-8">
            <div className="flex space-x-6">
              
              
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="px-3 py-1 rounded-full bg-zinc-800 text-sm">
                    {user.username || user.email}
                  </div>
                  <Button 
                    onClick={() => signOut()} 
                    className="outline text-sm bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white px-4 py-1 h-9"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button 
                    className="text-sm outline bg-white text-black hover:bg-zinc-200 border-none px-4 py-1 h-9"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-zinc-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 pt-2 pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="px-2 py-2 text-base font-medium text-zinc-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/features" 
              className="px-2 py-2 text-base font-medium text-zinc-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/about" 
              className="px-2 py-2 text-base font-medium text-zinc-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {session ? (
              <div className="flex flex-col space-y-3 pt-2 border-t border-zinc-800">
                <div className="px-2 py-2 text-sm">
                  Signed in as <span className="font-semibold">{user.username || user.email}</span>
                </div>
                <Button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }} 
                  className="bg-transparent border outline border-zinc-700 hover:bg-zinc-800 text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-zinc-800">
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    className="w-full outline bg-white text-black hover:bg-zinc-200 border-none"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;