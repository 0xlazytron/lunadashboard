import { Facebook, Youtube, MessageCircle, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="rounded-xl bg-white/10 p-8 backdrop-blur-lg">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <img src={"/assets/logo.svg"} alt="Logo" className="mb-4 h-10" />
            <p className="text-sm text-gray-300">
              The largest NFT Marketplace. Unique and authentic digital
              creations. Made possible by blockchain technology.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              My Account
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Profile</li>
              <li>Collections</li>
              <li>Favourites</li>
              <li>Settings</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Marketplace
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Explore</li>
              <li>All NFT</li>
              <li>Collectible</li>
              <li>All World</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About Us</li>
              <li>Careers</li>
              <li>Support</li>
              <li>Rankings</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 md:flex-row">
          <div className="flex space-x-4">
            <Facebook className="h-5 w-5 text-gray-300" />
            <Youtube className="h-5 w-5 text-gray-300" />
            <MessageCircle className="h-5 w-5 text-gray-300" />
            <Twitter className="h-5 w-5 text-gray-300" />
          </div>
          <div className="text-sm text-gray-300">
            2024© Copyright Lunalotto. All Rights Reserved
          </div>
          <div className="flex space-x-4 text-sm text-gray-300">
            <span>Terms Of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
