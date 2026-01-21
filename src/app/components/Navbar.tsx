"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__header">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/Phil-Co-text-E8DCC2.png"
              alt="logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              // Close Icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        <div className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}>
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link
                href="/"
                className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""
                  }`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                href="/aanpak"
                className={`navbar__link ${isActive("/aanpak") ? "navbar__link--active" : ""
                  }`}
                onClick={closeMenu}
              >
                Aanpak
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                href="/tuinstijlen"
                className={`navbar__link ${isActive("/tuinstijlen") ? "navbar__link--active" : ""
                  }`}
                onClick={closeMenu}
              >
                Tuinstijlen
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                href="/aanvraag"
                className={`navbar__link ${isActive("/contact") ? "navbar__link--active" : ""
                  }`}
                onClick={closeMenu}
              >
                Aanvraag
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                href="/faq"
                className={`navbar__link ${isActive("/faq") ? "navbar__link--active" : ""
                  }`}
                onClick={closeMenu}
              >
                FAQ
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                href="https://phil-co.odoo.com/shop"
                className="navbar__link navbar__link--external"
                onClick={closeMenu}
                target="_blank"
              >
                Shop
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
