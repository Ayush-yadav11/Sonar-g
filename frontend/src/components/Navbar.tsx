import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { RefreshControls } from './RefreshControls';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface NavbarProps {
  isLive?: boolean;
  onToggleLive?: () => void;
}

export const Navbar = ({ isLive, onToggleLive }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-app-accent-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-app-text-primary">Sonar g</h1>
                <p className="text-app-accent-gold text-sm">Gold analysis & predictions</p>
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {isLive !== undefined && onToggleLive && (
              <RefreshControls isLive={isLive} onToggleLive={onToggleLive} />
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-border mt-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/prediction" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                ML Predictions
              </Link>
              <Link 
                to="/historical" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Historical Data
              </Link>
              <Link 
                to="/scenarios" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Scenario Analysis
              </Link>
              <Link 
                to="/about" 
                className="px-2 py-1 rounded-md hover:bg-accent text-app-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center space-x-3 pt-2">
                <ThemeToggle />
                {isLive !== undefined && onToggleLive && (
                  <RefreshControls isLive={isLive} onToggleLive={onToggleLive} />
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
