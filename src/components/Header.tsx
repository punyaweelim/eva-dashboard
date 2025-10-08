import { Bell, Settings, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export function Header({ onMenuClick, isMobile }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm md:text-lg font-bold">EVA</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base md:text-lg font-semibold text-foreground">EVA Dashboard</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Integrated Monitoring System</p>
          </div>
        </div>
        {!isMobile && (
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="ml-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 md:h-3 md:w-3 bg-primary rounded-full"></span>
        </Button>
        <Button variant="ghost" size="sm" className="hidden sm:flex">
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Avatar className="h-7 w-7 md:h-8 md:w-8">
          <AvatarFallback className="bg-primary text-white">
            <User className="h-3 w-3 md:h-4 md:w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}