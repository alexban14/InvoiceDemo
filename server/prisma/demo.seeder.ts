import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10);

    // Create Admin User
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: passwordHash,
            name: 'Admin User',
        },
    });

    console.log(`Admin user created: ${adminUser.email}`);

    // Create 20 invoices
    const invoices = Array.from({ length: 20 }).map((_, i) => ({
        vendor_name: `Vendor ${i + 1}`,
        amount: (Math.random() * 1000).toFixed(2),
        due_date: new Date(Date.now() + Math.random() * 1e10),
        description: `Invoice description ${i + 1}`,
        paid: Math.random() > 0.5,
        user_id: adminUser.id,
    }));

    await prisma.invoice.createMany({ data: invoices });

    console.log(`20 invoices created for Admin user.`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
