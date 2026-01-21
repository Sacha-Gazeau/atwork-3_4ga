"use client";

export default function Footer() {
  return (
    <>
      <div className="footer--contact">
        <div>
          <p>Phone : +32 9 258 10 11</p>
          <p>Mobile : +32 476 45 62 72</p>
        </div>
        <div>
          <p>E-mail : filip.tack@4ga.be</p>
          <p>BTW : BE 0688527873</p>
        </div>
      </div>

      <div className="footer--socials">
        <a href="#" aria-label="Facebook" className="social">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15c-1.2 0-1.5.7-1.5 1.4V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z"/>
          </svg>
        </a>
        <a href="#" aria-label="Instagram" className="social">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zM17.5 6.4a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/>
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn" className="social">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1a4.2 4.2 0 0 1 3.8-2.1c4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z"/>
          </svg>
        </a>
      </div>

      <p className="footer--address">
        Mariakerksesteenweg 201
        <br />
        B-9031 Drongen (Ghent)
      </p>
    </>
  );
}
