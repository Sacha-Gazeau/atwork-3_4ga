"use client";

import { useEffect } from "react";

export default function Aanpak() {
  const steps = [
    {
      title: "Analyse",
      text: "We analyseren uw wensen, noden en de mogelijkheden van uw tuin.",
    },
    {
      title: "Ontwerp",
      text: "We maken een duidelijk tuinontwerp dat past bij uw stijl en budget.",
    },
    {
      title: "Voorbereiding",
      text: "De ondergrond wordt voorbereid en de juiste materialen worden gekozen.",
    },
    {
      title: "Uitvoering",
      text: "De werken worden stap voor stap uitgevoerd met oog voor detail.",
    },
    {
      title: "Oplevering",
      text: "We leveren een afgewerkte tuin op die volledig klaar is om van te genieten.",
    },
  ];

  useEffect(() => {
    const stepsEl = document.querySelectorAll(".aanpak-step");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    stepsEl.forEach((step) => observer.observe(step));
  }, []);

  return (
    <section className="aanpak">
      <h2 className="aanpak-title">Onze aanpak</h2>

      {steps.map((step, index) => (
        <div
          key={index}
          className={`aanpak-step ${
            index % 2 === 0 ? "normal" : "alternate"
          } ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          <div className="aanpak-text">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
          <div className="aanpak-number">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      ))}
    </section>
  );
}
