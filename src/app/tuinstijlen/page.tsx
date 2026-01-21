import Image from "next/image";
import prisma from "@/lib/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuinstijlen",
};

export default async function Inspiration() {
  const gardenStyles = await prisma.style.findMany({
    include: {
      plants: {
        include: {
          plant: true,
        },
      },
    },
  });

  return (
    <div className="inspiration-container">
      <div style={{ textAlign: "center" }}>
        <h2 className="page-title">Ontdek Uw Ideale Tuinstijl</h2>
      </div>

      <div className="styles-grid">
        {gardenStyles.map((style) => (
          <div key={style.id} className="style-card">
            <div className="style-card__image-container">
              {style.imageUrl && (
                <Image
                  src={`https://files.edgestore.dev/ys07omlvcl0pg45c/styles/_public${style.imageUrl}`}
                  alt={style.title}
                  fill
                  className="style-card__image"
                />
              )}
            </div>

            <div className="style-card__content">
              <h2 className="style-card__title">{style.title}</h2>
              <p className="style-card__description">{style.description}</p>

              <div className="style-card__plants">
                <h3 className="style-card__plants-title">
                  Typerende beplanting
                </h3>
                <div className="style-card__plants-list">
                  {style.plants.map((styleOnPlant) => (
                    <span
                      key={styleOnPlant.plantId}
                      className="style-card__plant-tag"
                    >
                      {styleOnPlant.plant.name}
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
