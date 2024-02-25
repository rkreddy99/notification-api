import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

async function main() {
    const newPassword = await hash('password', 10);
    const alice = await prisma.user.upsert({
        where: { email: "alice@prisma.io"},
        update: {},
        create: {
            email: 'alice@prisma.io',
            username: 'alice',
            password: newPassword,
            devices: {
                create: [{
                    platform: 'ios',
                    token: 'aliceiostoken'
                },
                {
                    platform: 'android',
                    token: 'aliceandroidtoken'
                }
            ]
            }
        }
    });

    const bob = await prisma.user.upsert({
        where: {
            email: 'bob@gmail.com'
        },
        update: {},
        create: {
            email: 'bob@gmail.com',
            password: newPassword,
            username: 'bob',
            devices: {
                create: [{
                    platform: 'ios',
                    token: 'bobiostoken'
                },
                {
                    platform: 'android',
                    token: 'bobandroidtoken'
                }
                ]}
            }
        })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })