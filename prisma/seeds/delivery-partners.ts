import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const deliveryPartnersData = [
  {
    key: "deliveroo",
    value: JSON.stringify({
      name: "Deliveroo",
      url: "https://deliveroo.co.uk/menu/london/sultan-restaurant",
      logo: "/images/partners/deliveroo.png",
      promoCode: "SULTAN10",
    }),
    group: "delivery",
  },
  {
    key: "ubereats",
    value: JSON.stringify({
      name: "Uber Eats",
      url: "https://www.ubereats.com/store/sultan-restaurant",
      logo: "/images/partners/uber-eats.png",
      promoCode: "",
    }),
    group: "delivery",
  },
  {
    key: "justeat",
    value: JSON.stringify({
      name: "Just Eat",
      url: "https://www.just-eat.co.uk/restaurants-sultan",
      logo: "/images/partners/just-eat.png",
      promoCode: "JUSTsultan",
    }),
    group: "delivery",
  },
];

export async function seedDeliveryPartners(prisma: PrismaClient) {
  seedLogger.info("Seeding delivery partners...");

  const partners = await Promise.all(
    deliveryPartnersData.map((p) =>
      prisma.siteSetting.upsert({
        where: { key: p.key },
        update: { value: p.value },
        create: p,
      })
    )
  );

  seedLogger.table("DeliveryPartners", partners.length);
  return partners;
}
