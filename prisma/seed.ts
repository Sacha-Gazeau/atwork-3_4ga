// prisma/seed.ts
import { PrismaClient } from "../src/app/_generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.question.deleteMany();
  await prisma.styleOnPlant.deleteMany();
  await prisma.plant.deleteMany();
  await prisma.style.deleteMany();

  await prisma.plant.createMany({
    data: [
      { id: 1, name: "Siergrassen" },
      { id: 2, name: "Buxus bollen" },
      { id: 3, name: "Lavendel" },
      { id: 4, name: "Bamboe" },
      { id: 5, name: "Hortensia" },
      { id: 6, name: "Rozen" },
      { id: 7, name: "Vlinderstruik" },
      { id: 8, name: "Stokrozen" },
      { id: 9, name: "Japanse Esdoorn" },
      { id: 10, name: "Azalea" },
      { id: 11, name: "Varens" },
      { id: 12, name: "Olijfboom" },
      { id: 13, name: "Vijgenboom" },
      { id: 14, name: "Rozemarijn" },
      { id: 15, name: "Klimop" },
      { id: 16, name: "Klimhortensia" },
      { id: 17, name: "Kruiden" },
      { id: 18, name: "Zonnebloemen" },
      { id: 19, name: "Kogeldistel" },
    ],
  });

  await prisma.style.createMany({
    data: [
      {
        id: 1,
        title: "Moderne Tuin",
        description:
          "Strakke lijnen, minimalistisch design en een open karakter. De moderne tuin kenmerkt zich door het gebruik van beton, grote tegels en geometrische vormen. Een onderhoudsvriendelijke keuze voor een eigentijdse look.",
        imageUrl: "/moderne-tuin.png",
      },
      {
        id: 2,
        title: "Landelijke Tuin",
        description:
          "Een romantische en sfeervolle tuin met een natuurlijk karakter. Denk aan weelderige borders, kronkelende paadjes en gezellige zithoekjes. Een tuin die rust en nostalgie uitstraalt.",
        imageUrl: "/landelijke-tuin.png",
      },
      {
        id: 3,
        title: "Japanse Tuin",
        description:
          "Rust en balans staan centraal in de Japanse tuin. Met gebruik van steen, water en mos wordt een miniatuurlandschap gecreëerd dat uitnodigt tot meditatie en ontspanning.",
        imageUrl: "/japanse-tuin.png",
      },
      {
        id: 4,
        title: "Mediterrane Tuin",
        description:
          "Haal de vakantiesfeer naar huis met een Mediterrane tuin. Warme kleuren, terracotta potten en geurende kruiden zorgen voor een zonnig gevoel, zelfs op minder mooie dagen.",
        imageUrl: "/mediterrane-tuin.png",
      },
      {
        id: 5,
        title: "Stadstuin",
        description:
          "Creatief omgaan met beperkte ruimte. De stadstuin is een groene oase in de bebouwde kom, vaak met verticaal tuinieren en slimme oplossingen voor privacy en comfort.",
        imageUrl: "/stadstuin.png",
      },
      {
        id: 6,
        title: "Diervriendelijke Tuin",
        description:
          "Een paradijs voor vogels, bijen en vlinders. Deze tuin is ingericht om de biodiversiteit te stimuleren, met inheemse planten, nestkastjes en rommelhoekjes waar dieren zich thuis voelen.",
        imageUrl: "/diervriendelijke-tuin.png",
      },
    ],
  });

  await prisma.styleOnPlant.createMany({
    data: [
      { styleId: 1, plantId: 1 }, // Siergrassen
      { styleId: 1, plantId: 2 }, // Buxus bollen
      { styleId: 1, plantId: 3 }, // Lavendel
      { styleId: 1, plantId: 4 }, // Bamboe

      // Landelijke Tuin (id: 2)
      { styleId: 2, plantId: 5 }, // Hortensia
      { styleId: 2, plantId: 6 }, // Rozen
      { styleId: 2, plantId: 7 }, // Vlinderstruik
      { styleId: 2, plantId: 8 }, // Stokrozen

      // Japanse Tuin (id: 3)
      { styleId: 3, plantId: 9 }, // Japanse Esdoorn
      { styleId: 3, plantId: 10 }, // Azalea
      { styleId: 3, plantId: 4 }, // Bamboe
      { styleId: 3, plantId: 11 }, // Varens

      // Mediterrane Tuin (id: 4)
      { styleId: 4, plantId: 12 }, // Olijfboom
      { styleId: 4, plantId: 13 }, // Vijgenboom
      { styleId: 4, plantId: 14 }, // Rozemarijn
      { styleId: 4, plantId: 3 }, // Lavendel

      // Stadstuin (id: 5)
      { styleId: 5, plantId: 15 }, // Klimop
      { styleId: 5, plantId: 16 }, // Klimhortensia
      { styleId: 5, plantId: 1 }, // Siergrassen
      { styleId: 5, plantId: 17 }, // Kruiden

      // Diervriendelijke Tuin (id: 6)
      { styleId: 6, plantId: 7 }, // Vlinderstruik
      { styleId: 6, plantId: 18 }, // Zonnebloemen
      { styleId: 6, plantId: 19 }, // Kogeldistel
      { styleId: 6, plantId: 15 }, // Klimop
    ],
  });
  await prisma.question.createMany({
    data: [
      // 🧰 Algemene vragen
      {
        theme: "🧰 Algemene vragen",
        quest: "Wat is een DIY-tuin van Phil & co?",
        answer:
          "In samenspraak met de klant ontwerpen wij een tuin naar hun behoeften, stijl en budget. Daarna kan je zelf de tuin aanleggen met duidelijke stappenplannen en praktische tips.",
      },
      {
        theme: "🧰 Algemene vragen",
        quest: "Heb ik ervaring nodig om zelf een tuin aan te leggen?",
        answer:
          "Ja en nee. De meeste projecten zijn geschikt voor beginners. Met goede begeleiding kan iedereen starten.",
      },
      {
        theme: "🧰 Algemene vragen",
        quest: "Wat kost het om een DIY-tuin te maken?",
        answer:
          "De kosten hangen af van de grootte van de tuin, de materialen en de gekozen stijl. Veel projecten zijn budgetvriendelijk.",
      },

      // 🌱 Ontwerp & Planning
      {
        theme: "🌱 Ontwerp & Planning",
        quest: "Hoe begin ik met het ontwerpen van mijn tuin?",
        answer:
          "Start met een schets, bepaal de functies en bespreek dit met onze tuinarchitect die rekening houdt met budget, bodem en licht.",
      },
      {
        theme: "🌱 Ontwerp & Planning",
        quest: "Bieden jullie voorbeeldontwerpen of templates?",
        answer:
          "Ja, op de website vind je voorbeelden en 3D-plannen. Een combinatie van stijlen is mogelijk.",
      },
      {
        theme: "🌱 Ontwerp & Planning",
        quest: "Hoe weet ik welke planten geschikt zijn voor mijn tuin?",
        answer:
          "In samenspraak met de tuinarchitect wordt een beplantingsplan opgesteld op basis van zon, bodem en onderhoud.",
      },

      // 🛠️ Materialen & Gereedschap
      {
        theme: "🛠️ Materialen & Gereedschap",
        quest: "Welke basisgereedschappen heb ik nodig?",
        answer:
          "Spade, schop, hark, snoeischaar, waterpas, meetlint en kruiwagen. Voor grote werken kan je materiaal huren.",
      },
      {
        theme: "🛠️ Materialen & Gereedschap",
        quest: "Waar kan ik materialen kopen?",
        answer:
          "Phil & co levert naast ontwerp en begeleiding ook de nodige planten en materialen.",
      },
      {
        theme: "🛠️ Materialen & Gereedschap",
        quest: "Zijn de materialen duurzaam?",
        answer:
          "Wij kiezen voor kwaliteitsvolle en duurzame materialen binnen het budget van de klant.",
      },

      // 🌼 Aanleg & Uitvoering
      {
        theme: "🌼 Aanleg & Uitvoering",
        quest: "Hoe lang duurt het om een DIY-project af te werken?",
        answer:
          "Een eenvoudige tuin duurt enkele dagen, grotere projecten kunnen weken duren.",
      },
      {
        theme: "🌼 Aanleg & Uitvoering",
        quest: "Kan ik stap-voor-stap instructies volgen?",
        answer:
          "Ja, elk project bevat duidelijke stappen, foto’s en tips. Extra begeleiding is mogelijk.",
      },
      {
        theme: "🌼 Aanleg & Uitvoering",
        quest: "Wat als ik een fout maak tijdens de aanleg?",
        answer:
          "De meeste fouten zijn eenvoudig te herstellen met hulp van onze specialisten.",
      },

      // 💧 Onderhoud
      {
        theme: "💧 Onderhoud",
        quest: "Hoe onderhoud ik mijn DIY-tuin?",
        answer:
          "Water geven, snoeien, bemesten en onkruid verwijderen. Seizoenschecklists zijn beschikbaar.",
      },
      {
        theme: "💧 Onderhoud",
        quest: "Zijn DIY-tuinen onderhoudsarm?",
        answer:
          "Ja, wij ontwerpen tuinen met vaste planten en duurzame materialen om onderhoud te beperken.",
      },

      // 📦 Bestellingen & Service
      {
        theme: "📦 Bestellingen & Service",
        quest: "Hoe krijgen wij de materialen bij ons?",
        answer: "Materialen worden op afspraak geleverd op de gewenste dag.",
      },
      {
        theme: "📦 Bestellingen & Service",
        quest: "Hoe lang is de levertijd?",
        answer:
          "Meestal 2 tot 5 werkdagen, afhankelijk van voorraad en transport.",
      },
      {
        theme: "📦 Bestellingen & Service",
        quest: "Bieden jullie ondersteuning na aankoop?",
        answer: "Ja, via e-mail, chat of video-call voor verdere begeleiding.",
      },
    ],
  });

  console.log("✅ FAQ questions seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
