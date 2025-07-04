import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { store } from "../../State/Store";
import { useSearch } from "../../context/SearchContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { searchQuery, setSearchQuery, setTriggerSearch, searchInput, setSearchInput } = useSearch();

  const handleSearch = () => {
    setTriggerSearch((prev) => !prev); // toggle to notify Home
    setSearchQuery(searchInput);
  };

  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-gray-800 max-w-7xl ml-18 rounded-4xl mt-4"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Desktop Sidebar Toggle */}
            <div className="hidden md:flex">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <Squares2X2Icon className="h-6 w-6 outline-none border-none cursor-pointer" />
              </button>
            </div>

            {/* Logo and Nav */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div
                  className="flex space-x-4 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <p className="text-2xl cursor pointer font-bold text-violet-400 mr-6">
                    SafeTradeX
                  </p>
                  {location.pathname === "/" && (
                    <div className="flex gap-2 items-center">
                      <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search coins..."
                      />
                      <Button
                        onClick={handleSearch}
                        variant="outline"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <MagnifyingGlassIcon />
                        <span>Search</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-[2rem] w-[2rem] flex items-center justify-center rounded-full bg-violet-900">
              <Avatar>
                <AvatarFallback>
                  {auth.user?.fullName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </Disclosure>

      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="p-0 ml-9 flex mt-4 gap-3"></div>
    </>
  );
}
