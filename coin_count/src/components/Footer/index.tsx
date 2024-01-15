// components/Footer.js
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-4 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm mb-2 md:mb-0">
            © 2024 Coin Count. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              className="text-white text-sm hover:text-primary-300"
              href="/article"
            >
              Articles
            </Link>
            <Link
              className="text-white text-sm hover:text-primary-300"
              href="/crypto/dashboard"
            >
              Cryptos
            </Link>
            <Link
              className="text-white text-sm hover:text-primary-300"
              href="/profile"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
