import { Link } from "react-router-dom";
import { VBox } from "../../components/directional/flex";
import { FaTelegram, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  const navItems = [
    { name: "Profile", type: "router", to: "/dashboard/profile" },
    { name: "Settings", type: "router", to: "/dashboard/settings" },
    { name: "Referrals", type: "router", to: "/dashboard/referrals" },
  ];

  const socials = [
    {
      name: "Twitter",
      icon: FaTwitter,
      link: "https://x.com/lotto_luna?s=21&t=LLImIrUCTHvvTKb0c2vcUg",
    },
    {
      name: "Discord",
      icon: FaDiscord,
      link: "https://discord.gg/hG3Vz8wq",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      link: "https://t.me/LLottoCasino",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      link: "https://www.instagram.com/lunalotto.io/profilecard/?igsh=Z240NHlydnc1aTRv",
    },
  ];
  return (
    <footer className="rounded-xl bg-white/10 p-8 backdrop-blur-lg">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
          <div className="flex flex-col justify-center md:items-start">
            <img src={"/assets/logo.svg"} alt="Logo" className="mb-4 h-10" />
            <p className="text-sm text-gray-300 max-w-md">
              Connect the world of online gambling with blockchain technology.
              Players can share in the success of the platform by owning
              LunaFounder NFTs
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              My Account
            </h3>
            <VBox className="space-y-2 text-sm text-gray-300">
              {navItems.map((item, _) => (
                <Link key={item.name} to={item.to}>
                  {item.name}
                </Link>
              ))}
            </VBox>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 md:flex-row">
          <div className="flex gap-2">
            {socials.map((social, _) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.link}
                  className="w-8"
                  target="_blank"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <div className="text-sm text-gray-300">
            2024© Copyright Lunalotto. All Rights Reserved
          </div>
          <div className="flex space-x-4 text-sm text-gray-300">
            <Link to={"/terms"}>Terms Of Service</Link>
            <Link to={"/privacy"}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
