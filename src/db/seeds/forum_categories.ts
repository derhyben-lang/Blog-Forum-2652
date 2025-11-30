import { db } from '@/db';
import { forumCategories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'General Discussion',
            description: 'Talk about anything and everything',
            slug: 'general-discussion',
            postCount: 0,
        },
        {
            name: 'Technology',
            description: 'Latest tech news, tools, and frameworks',
            slug: 'technology',
            postCount: 0,
        },
        {
            name: 'Design',
            description: 'UI/UX design, visual design, and design systems',
            slug: 'design',
            postCount: 0,
        },
        {
            name: 'Development',
            description: 'Coding questions, best practices, and tutorials',
            slug: 'development',
            postCount: 0,
        },
        {
            name: 'Off-topic',
            description: 'Everything that doesn\'t fit elsewhere',
            slug: 'off-topic',
            postCount: 0,
        },
    ];

    await db.insert(forumCategories).values(sampleCategories);
    
    console.log('✅ Forum categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});