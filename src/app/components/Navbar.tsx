"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <h1 className="navbar__logo">LOGO</h1>

      <nav className="navbar__nav">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link href="/" className="navbar__link">
              Home
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/start" className="navbar__link">
              Start
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/#aanpak" className="navbar__link">
              Aanpak
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/qa" className="navbar__link">
              QA
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/inspiratie" className="navbar__link">
              Inspiratie
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="/contact" className="navbar__link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
