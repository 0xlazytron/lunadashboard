import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// @ts-ignore
import { Link as ScrollLink, scroller } from "react-scroll";

import { FaInstagram, FaDiscord } from "react-icons/fa";
import { FaTwitter, FaTelegramPlane, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [scrollTarget, setScrollTarget] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to section if we set a target (after navigation)
  useEffect(() => {
    if (scrollTarget) {
      scroller.scrollTo(scrollTarget, {
        smooth: true,
        duration: 500,
      });
      setScrollTarget(""); // Clear scroll target after scrolling
    }
  }, [location.pathname, scrollTarget]);

  const handleScrollToSection = (section: string) => {
    if (location.pathname === "/") {
      // If already on the home page, just scroll to the section
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    } else {
      // Set scroll target and navigate to home page, then scroll after navigation
      setScrollTarget(section);
      navigate("/");
    }
  };

  const navItems = [
    { name: "HOME", type: "router", to: "/" },
    { name: "COLLECTION", type: "scroll", to: "collection" },
    { name: "SERVICES", type: "router", to: "/services" },
    { name: "ABOUT US", type: "scroll", to: "about" },
    { name: "ROAD MAP", type: "scroll", to: "roadmap" },
  ];

  return (
    <footer className="relative bg5 text-white pt-8">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[-1] bgballs"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          <div className="col-span-1 text-lg mx- lg:mx-0 md:col-span-3">
            <img
              src={"/assets/logo.svg"}
              alt="Lunachano Crypto Logo"
              className="mb-4 lg:w-30 w-[100px]"
            />
            <p className="mb-4">
              LunaLotto and LunaCasino are innovative platforms that merge the
              worlds of online gambling and blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/lunalotto.io/profilecard/?igsh=Z240NHlydnc1aTRv"
                target="_blank"
                className="p-1 rounded-lg shadow-lg border border-gray-600 bg-white/5"
              >
                {" "}
                <FaInstagram className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </a>
              <a
                href="https://discord.gg/ZDX7wR29"
                target="_blank"
                className="p-1 rounded-lg shadow-lg border border-gray-600 bg-white/5"
              >
                {" "}
                <FaDiscord className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </a>
              <a
                href="https://x.com/lotto_luna?s=21&t=LLImIrUCTHvvTKb0c2vcUg"
                target="_blank"
                className="p-1 rounded-lg shadow-lg border border-gray-600 bg-white/5"
              >
                {" "}
                <FaTwitter className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </a>
              <a
                href="https://t.me/LLottoCasino"
                target="_blank"
                className="p-1 rounded-lg shadow-lg border border-gray-600 bg-white/5"
              >
                <FaTelegramPlane className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg shadow-lg border border-gray-600 bg-white/5"
              >
                <FaYoutube
                  className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  size={30}
                />
              </a>
            </div>
          </div>

          <div
            id="li"
            className="flex md:col-span-4 items-center justify-center flex-col font-semibold md:flex-row gap-2"
          >
            {navItems.map((item) => {
              const commonProps = {
                className:
                  "text-white  hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer",
                onClick:
                  item.type === "scroll"
                    ? () => handleScrollToSection(item.to)
                    : handleScrollToTop,
              };

              return item.type === "router" ? (
                <Link key={item.name} to={item.to} {...commonProps}>
                  {item.name}
                </Link>
              ) : (
                <div key={item.name} {...commonProps}>
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 py-8 px-8 w-full flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0 text-center">
          2024© Copyright Lunalotto. All Rights Reserved
        </p>
        <div className="flex space-x-4 text-sm">
          <Link
            to="/terms"
            onClick={handleScrollToTop}
            className="hover:underline text-center z-10"
          >
            Terms Of Service
          </Link>
          <Link
            to="/privacy"
            onClick={handleScrollToTop}
            className="hover:underline text-center z-10"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
