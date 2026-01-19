// prisma/seed.ts
import { PrismaClient } from "../src/app/_generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.requestfile.deleteMany();
  await prisma.request.deleteMany();
  await prisma.user.deleteMany();
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
      {
        quest: "Wat is DIY tuinen precies?",
        answer:
          "DIY tuinen helpt gezinnen met een beperkter budget om toch hun droomtuin te realiseren. We maken een persoonlijk tuinontwerp en leveren een volledig DIY-pakket met planten, potgrond en afwerkingsmateriaal, zodat je zelf je tuin kan aanleggen wanneer het jou het best past.",
      },
      {
        quest: "Moet ik zelf nog materiaal voorzien?",
        answer:
          "Ja, basisgereedschap voor tuinwerken voorzie je zelf. Denk bijvoorbeeld aan een schop, schoffel, kruiwagen, gieter en tuinhandschoenen. Indien er specifiek materiaal nodig is, vermelden we dat duidelijk in de instructies.",
      },
      {
        quest: "Hoe lang is een prijsvoorstel geldig?",
        answer:
          "Het prijsvoorstel voor het ontwerp van je tuin is 30 dagen geldig vanaf de datum waarop je het ontvangt. Na deze periode kan de prijs opnieuw berekend worden, bijvoorbeeld door gewijzigde materiaal- of plantprijzen.",
      },
      {
        quest: "Wat als ik geen plan van mijn tuin heb?",
        answer:
          "Geen probleem. Als je geen duidelijk tuinplan hebt, kan DIY tuinen de tuin komen opmeten tegen een meerprijs. De kost hiervoor is afhankelijk van de gemeente waarin je woont. Tijdens de aanvraag kan je aangeven dat je een opmeting wenst.",
      },
      {
        quest: "Kan ik het ontwerp nog laten aanpassen?",
        answer:
          "Ja. Nadat je het eerste ontwerp ontvangen hebt, heb je 7 dagen de tijd om wijzigingen of opmerkingen door te sturen via e-mail. We verwerken die feedback in een finaal ontwerp.",
      },
      {
        quest: "Wanneer moet ik betalen?",
        answer:
          "Je betaalt eerst een voorschot voor het tuinontwerp, zoals beschreven in de e-mail met het prijsvoorstel. Na de goedkeuring van het finale ontwerp en de gedetailleerde prijs volgt een tweede voorschot voor de aanleg en het DIY-pakket. De exacte betalingsmomenten en bedragen communiceren we altijd duidelijk op voorhand.",
      },
      {
        quest: "Kan ik zelf planten of materialen toevoegen?",
        answer:
          "Ja, dat kan. Tijdens je aanvraag kan je in het vak ‘Opmerkingen’ aangeven welke planten of materialen je graag zou behouden of zelf wil voorzien. We houden daar zoveel mogelijk rekening mee bij het ontwerp en de prijsberekening.",
      },
      {
        quest: "Hoe neem ik contact op als ik nog vragen heb?",
        answer:
          "Je kan ons altijd bereiken via het contactformulier op de website, per e-mail of telefonisch. Alle gegevens vind je terug op de contactpagina. We helpen je graag verder met al je vragen over jouw toekomstige droomtuin.",
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
