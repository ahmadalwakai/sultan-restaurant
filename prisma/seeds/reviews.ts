import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const reviewsData = [
  { name: "Sarah M.", rating: 5, comment: "Absolutely amazing food! The mixed grill was perfect and the service was excellent. Will definitely be back!" },
  { name: "Ahmed K.", rating: 5, comment: "Finally found authentic Syrian food in London. The shawarma takes me back home. Highly recommend!" },
  { name: "James P.", rating: 4, comment: "Great flavours and generous portions. The lamb kebab was tender and delicious. Slightly busy on weekends." },
  { name: "Fatima A.", rating: 5, comment: "Best hummus I've had outside of Lebanon! The atmosphere is lovely and staff are very friendly." },
  { name: "Michael T.", rating: 5, comment: "Tried the biryani and it was outstanding. Perfectly spiced and the portion size is excellent value." },
  { name: "Priya S.", rating: 4, comment: "Lovely restaurant with authentic Middle Eastern decor. Food was delicious, especially the falafel platter." },
  { name: "Omar H.", rating: 5, comment: "The quozi (Iraqi lamb) is a must-try! Reminds me of my grandmother's cooking. 10/10 would recommend." },
  { name: "Emma W.", rating: 5, comment: "Celebrated my birthday here and the staff went above and beyond. The desserts are heavenly!" },
  { name: "Yusuf B.", rating: 4, comment: "Consistent quality every time I order. The chicken shawarma wrap is my go-to lunch." },
  { name: "Lisa C.", rating: 5, comment: "Hidden gem! The grilled meats are some of the best I've had. Family-friendly and great value." },
];

export async function seedReviews(prisma: PrismaClient) {
  seedLogger.info("Seeding reviews...");

  // Delete existing seeded reviews
  await prisma.review.deleteMany({ where: { userId: null } });

  const reviews = await Promise.all(
    reviewsData.map((r) =>
      prisma.review.create({
        data: {
          name: r.name,
          rating: r.rating,
          comment: r.comment,
          status: "APPROVED",
          isVisible: true,
        },
      })
    )
  );

  seedLogger.table("Review", reviews.length);
  return reviews;
}
