import Image from "next/image";

const gardenStyles = [
  {
    id: "modern",
    title: "Moderne Tuin",
    description:
      "Strakke lijnen, minimalistisch design en een open karakter. De moderne tuin kenmerkt zich door het gebruik van beton, grote tegels en geometrische vormen. Een onderhoudsvriendelijke keuze voor een eigentijdse look.",
    image: "/garden-styles/moderne-tuin.png",
    plants: ["Siergrassen", "Buxus bollen", "Lavendel", "Bamboe"],
  },
  {
    id: "landelijk",
    title: "Landelijke Tuin",
    description:
      "Een romantische en sfeervolle tuin met een natuurlijk karakter. Denk aan weelderige borders, kronkelende paadjes en gezellige zithoekjes. Een tuin die rust en nostalgie uitstraalt.",
    image: "/garden-styles/landelijke-tuin.png",
    plants: ["Hortensia", "Rozen", "Vlinderstruik", "Stokrozen"],
  },
  {
    id: "japans",
    title: "Japanse Tuin",
    description:
      "Rust en balans staan centraal in de Japanse tuin. Met gebruik van steen, water en mos wordt een miniatuurlandschap gecreëerd dat uitnodigt tot meditatie en ontspanning.",
    image: "/garden-styles/japanse-tuin.png",
    plants: ["Japanse Esdoorn", "Azalea", "Bamboe", "Varens"],
  },
  {
    id: "mediterraan",
    title: "Mediterrane Tuin",
    description:
      "Haal de vakantiesfeer naar huis met een Mediterrane tuin. Warme kleuren, terracotta potten en geurende kruiden zorgen voor een zonnig gevoel, zelfs op minder mooie dagen.",
    image: "/garden-styles/mediterrane-tuin.png",
    plants: ["Olijfboom", "Vijgenboom", "Rozemarijn", "Lavendel"],
  },
  {
    id: "stadstuin",
    title: "Stadstuin",
    description:
      "Creatief omgaan met beperkte ruimte. De stadstuin is een groene oase in de bebouwde kom, vaak met verticaal tuinieren en slimme oplossingen voor privacy en comfort.",
    image: "/garden-styles/stadstuin.png",
    plants: ["Klimop", "Klimhortensia", "Siergrassen", "Kruiden"],
  },
  {
    id: "diervriendelijk",
    title: "Diervriendelijke Tuin",
    description:
      "Een paradijs voor vogels, bijen en vlinders. Deze tuin is ingericht om de biodiversiteit te stimuleren, met inheemse planten, nestkastjes en rommelhoekjes waar dieren zich thuis voelen.",
    image: "/garden-styles/diervriendelijke-tuin.png",
    plants: ["Vlinderstruik", "Zonnebloemen", "Kogeldistel", "Klimop"],
  },
];

export default function Inspiration() {
  return (
    <div className="inspiration-container">
      <div style={{ textAlign: "center" }}>
        <h2 className="page-title">Ontdek Uw Ideale Tuinstijl</h2>
      </div>
      
      <div className="styles-grid">
        {gardenStyles.map((style) => (
          <div key={style.id} className="style-card">
            <div className="style-card__image-container">
              <Image
                src={style.image}
                alt={style.title}
                fill
                className="style-card__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="style-card__content">
              <h2 className="style-card__title">{style.title}</h2>
              <p className="style-card__description">{style.description}</p>
              
              <div className="style-card__plants">
                <h3 className="style-card__plants-title">Typerende beplanting</h3>
                <div className="style-card__plants-list">
                  {style.plants.map((plant, index) => (
                    <span key={index} className="style-card__plant-tag">
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
