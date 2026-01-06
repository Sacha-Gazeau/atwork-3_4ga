"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
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
            <Link href="/" className="navbar__link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/aanpak" className="navbar__link" onClick={closeMenu}>
              Aanpak/Proces
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              href="/tuinstijlen"
              className="navbar__link"
              onClick={closeMenu}
            >
              Tuinstijlen
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/contact" className="navbar__link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/faq" className="navbar__link" onClick={closeMenu}>
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
