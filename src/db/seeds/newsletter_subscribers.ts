import { db } from '@/db';
import { newsletterSubscribers } from '@/db/schema';

async function main() {
    const sampleSubscribers = [
        {
            email: 'john.smith@gmail.com',
            subscribedAt: new Date('2024-10-15').toISOString(),
            isActive: true,
        },
        {
            email: 'sarah.m@outlook.com',
            subscribedAt: new Date('2024-11-02').toISOString(),
            isActive: true,
        },
        {
            email: 'dev.alex@protonmail.com',
            subscribedAt: new Date('2024-11-20').toISOString(),
            isActive: true,
        },
        {
            email: 'mike.johnson@yahoo.com',
            subscribedAt: new Date('2024-10-28').toISOString(),
            isActive: false,
        },
        {
            email: 'emily.davis@gmail.com',
            subscribedAt: new Date('2024-12-05').toISOString(),
            isActive: true,
        },
        {
            email: 'chris.wilson@outlook.com',
            subscribedAt: new Date('2024-11-15').toISOString(),
            isActive: true,
        },
        {
            email: 'jennifer.brown@protonmail.com',
            subscribedAt: new Date('2024-10-22').toISOString(),
            isActive: false,
        },
        {
            email: 'david.martinez@gmail.com',
            subscribedAt: new Date('2024-12-10').toISOString(),
            isActive: true,
        },
        {
            email: 'lisa.anderson@yahoo.com',
            subscribedAt: new Date('2024-11-08').toISOString(),
            isActive: true,
        },
        {
            email: 'robert.taylor@outlook.com',
            subscribedAt: new Date('2024-12-01').toISOString(),
            isActive: true,
        },
    ];

    await db.insert(newsletterSubscribers).values(sampleSubscribers);
    
    console.log('✅ Newsletter subscribers seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});