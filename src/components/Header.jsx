import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  // inside Header component (top area)
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput.trim()}`);
      setSearchInput("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-900/90 z-40">
      <div className="container mx-auto px-4 lg:px-10 flex items-center h-full">
        <Link to="/">
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 ml-8">
          {navigation.map((nav) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-white capitalize ${
                  isActive ? "text-white" : "text-neutral-300"
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}

          <form onSubmit={handleSubmit} className="hidden lg:flex items-center">
            <input
              className="bg-[#222630] px-4 py-2 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              type="search"
              placeholder="Search movies or shows..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>

          <button
            onClick={handleSubmit}
            className="text-2xl text-white lg:hidden"
            aria-label="search"
          >
            <IoSearchOutline />
          </button>
        </nav>

        <div
          className="ml-auto flex items-center gap-4 relative"
          ref={dropdownRef}
        >
          {/* Avatar */}
          <div className="flex items-center gap-2">
            <span className="text-white font-medium mr-2">
              <span className="sm:hidden">
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </span>
              <span className="hidden sm:inline-block">
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </span>
            </span>

            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 ring-white transition"
            >
              <img
                src={userIcon}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded p-2 w-32">
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1 hover:bg-teal-600 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
