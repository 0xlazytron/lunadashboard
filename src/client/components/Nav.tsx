import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaInstagram,
  FaDiscord,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { UserRoundCheck } from "lucide-react";
import { ReferralService } from "../../lib/referral";
import { HBox, VBox } from "../../components/directional/flex"; // Adjust the import path as necessary

interface NavItem {
  name: string;
  type: "router" | "scroll";
  to: string;
}

const navItems: NavItem[] = [
  { name: "HOME", type: "router", to: "/" },
  { name: "COLLECTION", type: "scroll", to: "collection" },
  { name: "SERVICES", type: "router", to: "/services" },
  { name: "ABOUT US", type: "router", to: "/about" },
  { name: "ROAD MAP", type: "scroll", to: "roadmap" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/lunalotto.io/profilecard/?igsh=Z240NHlydnc1aTRv",
    icon: (
      <FaInstagram className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
    ),
  },
  {
    href: "https://discord.gg/ZDX7wR29",
    icon: (
      <FaDiscord className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
    ),
  },
  {
    href: "https://x.com/lotto_luna?s=21&t=LLImIrUCTHvvTKb0c2vcUg",
    icon: (
      <FaTwitter className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
    ),
  },
  {
    href: "https://t.me/LLottoCasino",
    icon: (
      <FaTelegramPlane className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer" />
    ),
  },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      connection.getBalance(wallet.publicKey, "confirmed").then((_balance) => {
        setBalance(_balance / LAMPORTS_PER_SOL);
      });
    }
  }, [wallet, connection]);

  useEffect(() => {
    if (wallet.publicKey) {
      const walletAddress = wallet.publicKey.toBase58();
      ReferralService.checkExistence(walletAddress).then((exists) => {
        if (!exists && wallet.connected) {
          navigate("/referral/");
        }
      });
    }
  }, [wallet, navigate]);

  useEffect(() => {
    // Check if the URL contains a hash and if the element with that id exists
    const id = window.localStorage.getItem("section");
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        console.log("id", id);
        section.scrollIntoView({ behavior: "smooth" });
      }
      window.localStorage.setItem("section", "");
    }
  }, [location.pathname]);

  const handleScrollToSection = (id: string) => {
    window.localStorage.setItem("section", id);
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        console.log("id", id);
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const renderNavItems = () =>
    navItems.map((item) =>
      item.type === "router" ? (
        <Link
          key={item.name}
          to={item.to}
          className="text-white hover:text-white px-3 py-2 rounded-md text-[20px] cursor-pointer"
          onClick={isOpen ? toggleMenu : undefined}
        >
          {item.name}
        </Link>
      ) : (
        <button
          key={item.name}
          onClick={() => handleScrollToSection(item.to)}
          className="text-white hover:text-white px-3 py-2 rounded-md text-[20px] font-light cursor-pointer"
        >
          {item.name}
        </button>
      )
    );

  const renderSocialLinks = (className = "") =>
    socialLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        target="_blank"
        className={`p-1 h-fit w-fit rounded-lg shadow-lg border border-gray-600 bg-white/5 ${className}`}
      >
        {link.icon}
      </a>
    ));

  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50 text-[16px] py-4 text-white transition-all duration-300 bg-transparent bg-[#052035] md:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <HBox alignItems="center" justifyContent="space-between">
          <div className="cursor-pointer">
            <img
              src={"/assets/logo.svg"}
              className="lg:w-30 w-[100px]"
              alt="Ultrachand Crypto"
            />
          </div>
          <div className="hidden lg:block jack text-[16px]">
            <HBox gap="10px">{renderNavItems()}</HBox>
          </div>
          <HBox
            alignItems={"center"}
            className="hidden md:flex items-center space-x-4"
          >
            <div className="hidden lg:block bg-[#86C248] hover:bg-red-600 transition-all hover:scale-105 duration-300 text-white font-bold px-4 rounded-full">
              <WalletMultiButton
                style={{
                  backgroundColor: "transparent",
                  padding: 0,
                  height: "fit-content",
                }}
              >
                {wallet.connected && <span>{balance.toFixed(2)} SOL</span>}
                {wallet.connected && <span className="w-3"></span>}
                <span>{wallet.connected ? "" : "Connect Wallet"}</span>
              </WalletMultiButton>
            </div>
            {wallet.connected && (
              <Link
                to={"/dashboard"}
                className="hidden lg:block text-white hover:text-white px-3 py-2 rounded-md text-[20px] cursor-pointer"
              >
                <UserRoundCheck />
              </Link>
            )}
            {renderSocialLinks("hidden lg:block")}
          </HBox>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </HBox>
      </div>
      {isOpen && (
        <div className="lg:hidden py-5 bg-[#052035] rounded-lg">
          <VBox
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={4}
            className="px-2 pt-2 pb-3 jack sm:px-3"
          >
            {renderNavItems()}
            {wallet.connected && (
              <Link
                to={"/dashboard"}
                className=" text-white hover:text-white px-3 py-2 rounded-md text-[20px] cursor-pointer"
              >
                <UserRoundCheck />
              </Link>
            )}
            <div className="block lg:hidden w-fit bg-[#86C248] hover:bg-red-600 transition-all hover:scale-105 duration-300 text-white font-bold px-4 rounded-full">
              <WalletMultiButton
                style={{
                  backgroundColor: "transparent",
                  padding: 0,
                  height: "fit-content",
                }}
              >
                {wallet.connected && <span>{balance.toFixed(2)} SOL</span>}
                {wallet.connected && <span className="w-3"></span>}
                <span>{wallet.connected ? "" : "Connect Wallet"}</span>
              </WalletMultiButton>
            </div>
            <HBox gap="4px" className="mt-4">
              {renderSocialLinks("block lg:hidden")}
            </HBox>
          </VBox>
        </div>
      )}
    </nav>
  );
}
