import { prisma } from "../src/lib/prisma";

async function seed() {
    await prisma.event.create({
        data: {
            title: "Unite Summit",
            id: "d0b366d3-9f47-44b8-96f1-59b005d85574",
            slug: "unite-summit",
            details: "Um evento para Devs apaixonados(as) por código!",
            maximumAttendees: 120,
        },
    });
}

seed().then(() => {
    console.log("Database seeded!");
    prisma.$disconnect();
});
