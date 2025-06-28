import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { RefreshControls } from './RefreshControls';
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLive: boolean;
  onToggleLive: () => void;
}

export const Navbar = ({ isLive, onToggleLive }: NavbarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="backdrop-blur-sm bg-background/80 border border-border rounded-lg shadow-lg">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  MidasTrend
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background/20 px-4 py-2 text-sm font-medium transition-all duration-200",
                    "hover:bg-background/30 hover:scale-105 hover:shadow-md",
                    pathname === '/dashboard' ? 'bg-app-accent-gold/20 text-app-accent-gold' : ''
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/historical"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background/20 px-4 py-2 text-sm font-medium transition-all duration-200",
                    "hover:bg-background/30 hover:scale-105 hover:shadow-md",
                    pathname === '/historical' ? 'bg-app-accent-gold/20 text-app-accent-gold' : ''
                  )}
                >
                  Analysis
                </Link>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <RefreshControls isLive={isLive} onToggleLive={onToggleLive} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
