"use client"


import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { ChevronDown, Search, User } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

const menuItems = [
  {
    name: 'Academics',
    options: ['Academics Management', 'Session Management', 'Class Management', 'Reports']
  },
  {
    name: 'Alumni',
    options: ['Faculty', 'Tasks', 'Attendance', 'Salary']
  },
  {
    name: 'Resources',
    options: ['Documentation', 'Tutorials', 'Webinars', 'Case Studies']
  },
  {
    name: 'Company',
    options: ['About Us', 'Careers', 'Press', 'Contact']
  }
]

export default function MainMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (menuName: string) => {
    // Toggle the dropdown visibility
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    // Close the dropdown if clicking outside of the dropdown menu
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    // Attach the event listener to detect outside clicks
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-300 via-yellow-200 to-green-800 shadow-md">
    {/* Left Side - Menu Items */}
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        className="hover:bg-white/60 transition-all duration-300 ease-in-out"
      >
        Dashboard
      </Button>
      {menuItems.map((item) => (
        <div key={item.name} className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            className="flex items-center hover:bg-white/60 transition-all duration-300 ease-in-out"
            onClick={() => handleMenuClick(item.name)}
          >
            {item.name}{" "}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-300 ease-in-out ${
                openDropdown === item.name ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
          {openDropdown === item.name && (
            <div
              className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-emerald-100 opacity-90 ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform"
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {item.options.map((option) => (
                  <a
                    key={option}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-all duration-300 ease-in-out"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Clicked on ${option} in ${item.name} menu`);
                    }}
                  >
                    {option}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Right Side - Search and Profile */}
    <div className="flex items-center space-x-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
        <Input
          className="pl-8 text-gray-900 placeholder-gray-400 bg-white rounded-full shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-300 ease-in-out"
          placeholder="Search..."
        />
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/20 transition-all duration-300 ease-in-out"
          >
            <User className="h-5 w-5 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-in-out"
        >
          <DropdownMenuItem className="hover:bg-purple-100">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-purple-100">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-purple-100">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
);
}