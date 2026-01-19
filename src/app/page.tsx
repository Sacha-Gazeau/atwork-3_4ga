import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__background">
          <Image
            src="/Rectangle 2.png"
            alt="Droomtuin"
            fill
            className="hero__image"
            priority
          />
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">
            Uw Droomtuin, Betaalbaar en Zelf Aangelegd
          </h1>
          <p className="hero__subtitle">
            Voor gezinnen met een beperkt budget die hun tuin willen
            transformeren
          </p>
          <Link href="/inspiratie" className="hero__button">
            Kies uw tuinstijl
          </Link>
        </div>
      </section>

      <section className="about">
        <h2 className="about__title">Wat Doet DIYTuinen?</h2>
        <p className="about__text">
          DIY Tuinen helpt gezinnen met een beperkt budget om toch hun droomtuin
          te realiseren.Wij geloven dat iedereen recht heeft op een prachtige
          tuin, ongeacht het budget.
        </p>
        <p className="about__text">
          Met onze innovatieve do-it-yourself pakketten kunt u zelf, stap voor
          stap, uw tuin aanleggen op het moment dat u het beste uitkomt. Van
          ontwerp tot uitvoering, wij begeleiden u door het hele proces met
          duidelijke instructies en hoogwaardige materialen.
        </p>
      </section>
    </div>
  );
}
