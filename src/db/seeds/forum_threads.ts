import { db } from '@/db';
import { forumThreads } from '@/db/schema';

async function main() {
    const sampleThreads = [
        {
            categoryId: 2,
            title: "What's your favorite framework?",
            slug: 'whats-your-favorite-framework',
            authorName: 'Alex Johnson',
            createdAt: new Date('2024-11-20').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 4,
            title: 'Need help with React hooks',
            slug: 'need-help-with-react-hooks',
            authorName: 'Maria Garcia',
            createdAt: new Date('2024-11-25').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 1,
            title: 'Share your latest project',
            slug: 'share-your-latest-project',
            authorName: 'James Wilson',
            createdAt: new Date('2024-11-28').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 3,
            title: 'Best practices for responsive design',
            slug: 'best-practices-for-responsive-design',
            authorName: 'Priya Patel',
            createdAt: new Date('2024-12-01').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 4,
            title: 'Getting started with TypeScript',
            slug: 'getting-started-with-typescript',
            authorName: 'Tom Anderson',
            createdAt: new Date('2024-12-03').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 2,
            title: 'Favorite VS Code extensions?',
            slug: 'favorite-vs-code-extensions',
            authorName: 'Sophie Chen',
            createdAt: new Date('2024-12-05').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 3,
            title: 'Color palette recommendations',
            slug: 'color-palette-recommendations',
            authorName: 'Marcus Brown',
            createdAt: new Date('2024-12-08').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 4,
            title: 'How do you organize your components?',
            slug: 'how-do-you-organize-your-components',
            authorName: 'Lisa Kim',
            createdAt: new Date('2024-12-10').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 5,
            title: 'Weekend projects thread',
            slug: 'weekend-projects-thread',
            authorName: 'Ryan Murphy',
            createdAt: new Date('2024-12-12').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 2,
            title: 'Next.js vs Remix debate',
            slug: 'nextjs-vs-remix-debate',
            authorName: 'Nina Rodriguez',
            createdAt: new Date('2024-12-15').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 3,
            title: 'Accessibility tips and tricks',
            slug: 'accessibility-tips-and-tricks',
            authorName: 'Alex Johnson',
            createdAt: new Date('2024-12-18').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 4,
            title: 'Debugging strategies that work',
            slug: 'debugging-strategies-that-work',
            authorName: 'Maria Garcia',
            createdAt: new Date('2024-12-20').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 1,
            title: 'Introduce yourself!',
            slug: 'introduce-yourself',
            authorName: 'James Wilson',
            createdAt: new Date('2024-12-22').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 1,
            title: 'What are you learning this month?',
            slug: 'what-are-you-learning-this-month',
            authorName: 'Priya Patel',
            createdAt: new Date('2024-12-28').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
        {
            categoryId: 5,
            title: 'Coffee or tea?',
            slug: 'coffee-or-tea',
            authorName: 'Tom Anderson',
            createdAt: new Date('2025-01-02').toISOString(),
            replyCount: 0,
            lastReplyAt: null,
        },
    ];

    await db.insert(forumThreads).values(sampleThreads);
    
    console.log('✅ Forum threads seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});