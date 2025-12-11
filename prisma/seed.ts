// prisma/seed.ts
import { PrismaClient } from "../src/app/_generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.requestfile.deleteMany();
  await prisma.image.deleteMany();
  await prisma.request.deleteMany();
  await prisma.user.deleteMany();
  await prisma.style.deleteMany();
  await prisma.question.deleteMany();

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
