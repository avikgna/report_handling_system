import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seeding() {

  /*User table*/
await prisma.user.createMany({
  data: [
    { id: 1, email: "admin@servihub.com", role: "admin", name: "Admin User" },
    { id: 2, email: "user1@servihub.com", role: "user", name: "User One"  },
  ],
});

/*Report table*/
await prisma.report.create({
  data: {
    type: "review",
    target_id: 101,
    reason: "Spam content",
    submitted_by: 2
  }
});

}

seeding() 
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });