import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetReports() {
    try {
        await prisma.report.deleteMany();
        console.log("Report table reset");
    } catch (error) {
        console.error("Error resetting:", error);
    } finally {
        await prisma.$disconnect();
    }
}

resetReports();