import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useMovieData } from "../contexts/MovieDataProvider";
import logo from "../../public/svg/MOVIEFLIX.svg"

function Header({event}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1000);
  const { handleSearchBtn } = useMovieData()
  const { pathname } = useLocation();
  const isReadOnly = pathname !== '/';


  // Window resize listener to update screen size state
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1000);
      if (window.innerWidth >= 1000) {
        setIsSearchVisible(true); // Show search input when screen size is >= 1000px
      } else {
        setIsSearchVisible(false); // Hide search input by default on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial check to set the visibility state on first render
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    // Only toggle search visibility when screen is small
    if (isScreenSmall) {
      setIsSearchVisible((prev) => !prev);
    }
  };

  

  return (
    <>
      <nav className="flex justify-between items-center max-w-[90vw] h-20 bg-[#13131D] mt-0 mb-0 m-auto rounded-lg px-2 sm:p-10">
        <Link
          to="/"
          className={`sm:w-[250px] ${
            isSearchVisible && isScreenSmall ? "hidden" : "block"
          }`}
        >
          <img
            src={logo}
            className={`sm:w-[250px] ${
              isSearchVisible && isScreenSmall ? "hidden" : "block"
            }`}
            width="150px"
            alt=""
          />
        </Link>
        <input
          type="text"
          onChange={handleSearchBtn}
          readOnly={isReadOnly}
          placeholder="Search"
          className={`w-[155px] sm:w-[270px] sm:h-[50px] rounded-xl pl-2 h-[30px] bg-[#20203b] placeholder-[#e3e3f7] border-none outline-none text-white font-semibold block ${
            isScreenSmall ? (isSearchVisible ? "block" : "hidden") : "block"
          }`}
        />
        <button
          onClick={handleToggle}
          className={` p-2 bg-[#20203b] rounded-xl border-none sm:p-4 sm:rounded-2xl ${
            isScreenSmall ? "block" : "hidden"
          }`}
        >
          <FaSearch className="text-white text-lg sm:text-xl" />
        </button>
      </nav>
    </>
  );
}

export default Header;
