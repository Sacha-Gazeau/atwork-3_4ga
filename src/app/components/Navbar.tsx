"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <Image
        src="/Phil-Co-text-E8DCC2.png"
        alt="logo"
        width={150}
        height={50}
      />

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
